<template>
	<view id="four-quadrants">
		<view class="header">
			<text>四象限</text>
			&nbsp;
			<text style="color:rgb(25,27,28);font-size: 17px;">
			{{today.getFullYear()}}年{{today.getMonth()+1}}月{{today.getDate()}}日&nbsp;{{weekDaySign(today.getDay())}}
			</text>
			&nbsp;
			<k-time-counter style="display: inline-block;color: rgb(44,47,49);font-size: 16px;"/>
		</view>
		<view class="content">
			<view class="item" v-for="(item,index) in state.priority" :key="index" :ref="quadrant+(index+1)" :id="getQuadrant(index)"
			:style="state.dataOption[getQuadrant(index)]?'border:1.5px solid blue;':''">
				<text :class="getQuadrant(index)">{{item.text}}</text>
				<view :scroll-y="true" style="width:100%;">
					<view class="item-content" v-for="(task,index1) in state.data[getQuadrant(index)]" :key="index1" 
					:style="task.style.length>0?'':'position:relative'">
						<view class="task" @click="toUpdate(index1,getQuadrant(index))" @longpress="toDragTaskContent($event,task)" 
						@touchmove="draggingTaskContent($event,task)"
							 @touchend="taskContentDragged($event,task,index1)" @touchcancel="cancelDragging(task)" :style="task.style">		
							<checkbox-group @change="finishOrNot(task)">
								<checkbox :checked="task.state==TaskState.finished" style="transform:scale(0.5)" />
							</checkbox-group>
							<view class="info">
							<!--#ifdef H5-->
							<text class="task-text" v-html="task.title">
							<!--#endif-->
							<!--#ifndef H5-->
							<text class="task-text" >
									{{task.title}}
							<!--#endif-->
								</text>
								<text class="text" style="color: rgb(0,75,235);">开始：{{getTimeStr(task.beginTime)}}</text>
								<text class="text"  style="color:red;">结束：{{getTimeStr(task.endTime)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="taskEditor" type="bottom" background-color="#fff" @change="beforeEditorClose">
			<view class="task-edit">
				<view class="head">
					<text :class="'quadrant-'+state.task.priority" @click="priorityPopup.open()">
						{{state.priority[state.task.priority-1].text}}
					</text>
					<image src="../static/日历.png" @click="timePopup.open()" class="image"></image>
					<image src="../static/plane.png" v-if="!state.canCreateTask&&!state.isTaskUpdate" :size="18"
						class="image" />
					<image src="../static/plane-filled.png" v-if="state.isTaskUpdate||state.canCreateTask" :size="18"
						class="image" @click="editTask" />
				</view>
				<uni-easyinput v-model="state.task.title" placeholder="标题" focus
					style="margin-bottom: 2px;margin-top: 3px;" @input="titleInput"></uni-easyinput>
				<uni-easyinput v-model="state.task.description" placeholder="描述" type="textarea"
					:rows="3"></uni-easyinput>
			</view>
		</uni-popup>
		<uni-popup ref="priorityPopup" background-color="#fff" border-radius="10px 10px 10px 10px">
			<uni-list :border="true" style="width: 60vw;">
				<uni-list-item v-for="(item,index) in state.priority" :key="index">
					<template v-slot:body>
						<view :class="'quadrant-'+(index+1)" @click="takePriority(item)"
							style="width: 100%;text-align: center">
							{{item.text}}
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-popup>
		<uni-popup ref="timePopup" background-color="#fff" type="bottom">
			<view style="display: flex;width:96%;margin-bottom: 1%;">
				<uni-icons type="closeempty" @click="timePopup.close()" :size="20"></uni-icons>
			</view>
			<k-calendar :showWay="CalendarDisplayWay.month" :unchangable="true" @onChange="selectDay"></k-calendar>
			<uni-list class="time" :border="true">
				<uni-list-item show-arrow>
					<template v-slot:body>
						<view class="time-item">
							<image src="../static/闹钟.png" class="image"></image>
							<view class="select-datetime">
								开始：
								<picker mode="date" @change="pick('begin-date',$event)" :value="startTime.date">
									{{startTime.date}}
								</picker>
								&nbsp;
								<picker mode="time" @change="pick('begin-time',$event)" :value="startTime.time">
									{{startTime.time}}
								</picker>
							</view>
							<view class="select-datetime">
								结束：
								<picker mode="date" @change="pick('end-date',$event)" :value="endTime.date">
									{{endTime.date}}
								</picker>
								&nbsp;
								<picker mode="time" @change="pick('end-time',$event)" :value="endTime.time">
									{{endTime.time}}
								</picker>
							</view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item show-arrow>
					<template v-slot:body>
						<view class="time-item">
							<view class="info">
								<uni-icons type="notification" :size="18" color="rgb(0,75,235)"></uni-icons>
								<text>提醒</text>
							</view>
							<picker :range="state.notifyOpt" mode="multiSelector" @change="addReminderInfoModel"
								@columnchange="changeNotifyMode">
								<text class="gray-text">设置提醒</text>
							</picker>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item v-show="state.task.reminderInfoModels.length>0">
					<template v-slot:body>
						<scroll-view :scroll-x="true">
							<view class="reminders">
								<view class="reminder" v-for="(reminder,index) in state.task.reminderInfoModels"
									:key="index">
									<uni-icons :size="10" type="closeempty" class="close"
										@click="removeReminderInfoModel(index)"></uni-icons>
									<text class="reminder-text">{{ReminderInfo.getModeValueText(reminder)}}</text>
								</view>
							</view>
						</scroll-view>
					</template>
				</uni-list-item>
				<uni-list-item show-arrow>
					<template v-slot:body>
						<view class="time-item">
							<view class="info">
								<image class="image" src="../static/time.png"></image>
								<text>设置重复规则</text>
							</view>
							<text
								@click="defRulePopup.open();state.frequency.selected=[state.task.period-1,state.task.periodUnit-1];"
								class="gray-text">
								{{getRuleText(state.task)}}</text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-popup>
		<uni-popup type="center" background-color="#fff" border-radius="10px 10px 10px 10px" ref="defRulePopup">
			<k-radio-group :data="state.frequency.data" :containDef="true" @onChange="takeBaseRule">
			</k-radio-group>
		</uni-popup>
		<uni-popup type="bottom" background-color="#fff" border-radius="10px 10px 10px 10px" ref="customPopup"
			:safe-area="false">
			<scroll-view class="custom" :scroll-y="true">
				<view style="display: flex;width:96%;margin-bottom: 1%;">
					<uni-icons type="closeempty" @click="customPopup.close()" :size="20"></uni-icons>
				</view>
				<view class="head">
					<image class="image" src="../static/闪电.png"></image>
					<picker mode="multiSelector" :value="state.frequency.selected" @change="takeDef" :range="
				[state.frequency.multiData[0],state.frequency.multiData[1]]">
						{{getRuleText(state.task)}}
					</picker>
				</view>
				<uni-data-checkbox style="margin-bottom: 5px;" v-if="state.task.periodUnit==2" multiple
					@change="takeCustom" v-model="state.rule.selected" :localdata="state.weekdays" mode="tag">
				</uni-data-checkbox>
				<view style="width: 100%;display: flex;justify-content: center;">
					<k-radio-group :data="state.rule.data" v-model="state.rule.selection" @onChange="resetSomeData"
						style="margin-top: 2%;margin-bottom: 2%;">
					</k-radio-group>
				</view>
				<view v-if="state.rule.selection == 1" class="picker">
					<picker mode="date" :value="state.task.deadline" @change="takeDeadline">
						<text class="gray-text"> 截止到&nbsp;
							{{state.task.deadline==null?'':getDateStr(state.task.deadline)}}</text>
					</picker>
				</view>
				<view v-if="state.rule.selection == 2" class="picker">
					<text>重复</text>
					<picker-view @change="takeCount" :value="[state.task.count]" style="width: 20px;height: 100%;">
						<picker-view-column>
							<view v-for="(number,index) in state.frequency.multiData[2]" :key="index"
								class="picker-inner">
								{{number}}
							</view>
						</picker-view-column>
					</picker-view>
					<text>次</text>
				</view>
			</scroll-view>
		</uni-popup>
		<uni-fab :pattern="pattern" :content="menuContent" horizontal="right" vertical="bottom" :pop-menu="false"
			@fabClick="openToEdit" />
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		reactive,
		nextTick
	} from 'vue';
	import {
		ValueText,
		priority,
		CalendarDisplayWay,
		getDateStr,
		timeWithoutSeconds,
		remindModeValues,
		getRuleText,
		frequency,
		customDef,
		weekdays,
		ReminderInfo,
		copy,
		loading,
		getDateTimeStr,
		dateEquals,
		TaskState,
		dateGE,
		weekDaySign,
		buildElById,
		TaskReminderKey
	} from '../module/Common';
	import {
		CreateTask,
		GetTaskReminders,
		FinishOrNot
	} from "../api/Task"
	import {
		ChangePriority,
		GetTasks,
		UpdateTask
	} from '../api/FourQuadrants';
	import {
		user
	} from '../api/User';

	const pattern = ref({
		color: '#7A7E83',
		backgroundColor: '#fff',
		buttonColor: '#007AFF',
		iconColor: '#fff'
	});

	const taskEditor = ref(null);
	const timePopup = ref(null);
	const priorityPopup = ref(null);
	const defRulePopup = ref(null);
	const customPopup = ref(null);
	const quadrant1 = ref(null);
	const quadrant2 = ref(null)
	const quadrant3 = ref(null)
	const quadrant4 = ref(null)

	const quadrant = ref("quadrant");
	const startTime = ref({
		date: "",
		time: ""
	});
	const endTime = ref({
		date: "",
		time: ""
	});
	const today = ref(new Date());

	const state = reactive({
		priority: [],
		task: {
			title: "",
			description: "",
			priority: 4,
			beginTime: "",
			endTime: "",
			userId: user == '' ? uni.getStorageSync("user").uid : user.uid,
			reminderInfoModels: [],
			period: null,
			periodUnit: null,
			custom: null,
			count: null,
			deadline: null,
			repeatable: false
		},
		selectedDay: new Date(),
		notifyOpt: [
			[],
			["分", "时", "天", "周", "月"]
		],
		frequency: {
			data: frequency,
			selection: 0,
			multiData: [
				[],
				["天", "周", "月", "年"],
				[]
			],
			selected: []
		},
		rule: {
			data: customDef,
			selection: 0,
			selected: []
		},
		weekdays: weekdays,
		canCreateTask: false,
		selectedTask: null,
		isTaskUpdate: false,
		data: {},
		dataOption:{}
	});

	onMounted(() => {
		for (let i = 0; i < 4; i++)
			state.priority.push(new ValueText(i+1, ""));
		state.priority[0].text = "Ⅰ " + priority[0].text;
		state.priority[1].text = "Ⅱ " + priority[1].text;
		state.priority[2].text = "Ⅲ " + priority[2].text;
		state.priority[3].text = "Ⅳ " + priority[3].text;

		for (let i = 1; i <= 99; i++)
			state.frequency.multiData[0].push(i);
		for (let i = 1; i <= 1000; i++)
			state.frequency.multiData[2].push(i);

		state.notifyOpt[0] = remindModeValues(1);
		resetBeginEndTime();

		getData();
		//#ifndef H5
		nextTick(()=>{
			buildElById(quadrant1.value[0]);
			buildElById(quadrant2.value[0]);
			buildElById(quadrant3.value[0]);
			buildElById(quadrant4.value[0]);
		});
		//#endif
	});

	function getData() {
		GetTasks(state.task.userId, today.value, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.data = res.data;
			for(let pro in state.data){
				for(let task of state.data[pro])
				{
					task.beginTime = new Date(task.beginTime);
					task.endTime = new Date(task.endTime);
					if(task.deadline!=null)
					  task.deadline = new Date(task.deadline);
					task.style="";  
				}
				state.dataOption[pro] = false;
			}
			uni.removeStorageSync(TaskReminderKey);
		});
	}

	function reloadModelData() {
		state.task = {
			title: "",
			description: "",
			priority: 4,
			beginTime: "",
			endTime: "",
			userId: user == '' ? uni.getStorageSync("user").uid : user.uid,
			reminderInfoModels: [],
			period: null,
			periodUnit: null,
			custom: null,
			count: null,
			deadline: null,
			repeatable: false
		};
		state.frequency.selected = [];
		state.frequency.selection = 0;
		state.rule.selected = [];
		state.rule.selection = 0;
		state.selectedTask = null;
		state.isTaskUpdate = false;
		state.canCreateTask = false;
	}

	function beforeEditorClose(e) {
		if (e.show) return;
		reloadModelData();
	}

	function addReminderInfoModel(e) {
		const values = e.detail.value;
		const reminder = ReminderInfo.getInstance(values[1] + 1, values[0] + 1, new Date(startTime.value.date + " " +
			startTime.value.time));
		if (reminder.mode == 1)
			reminder.value = values[0];
		const data = state.task.reminderInfoModels;
		if (data.length == 0)
			data.push(reminder);
		else {
			var i;
			for (i = 0; i < data.length; i++) {
				if (reminder.timing.getTime() < data[i].timing.getTime() && data.findIndex(r => r.timing.getTime() ==
						reminder
						.timing.getTime()) < 0) {
					data.splice(i, 0, reminder);
					break;
				}
			}
			if (i == data.length && data.findIndex(r => r.timing.getTime() == reminder
					.timing.getTime()) < 0)
				data.push(reminder);
		}
	}

	function removeReminderInfoModel(index) {
		state.task.reminderInfoModels.splice(index, 1);
	}

	function titleInput(current) {
		if(state.isTaskUpdate)return;
		state.canCreateTask = current.length > 0;
	}

	function resetBeginEndTime() {
		startTime.value.date = getDateStr(state.selectedDay);
		startTime.value.time = timeWithoutSeconds(state.selectedDay);
		const date = new Date(state.selectedDay);
		date.setHours(date.getHours() + 1);
		endTime.value.date = getDateStr(date);
		endTime.value.time = timeWithoutSeconds(date);

		state.task.beginTime = new Date(startTime.value.date + " " + startTime.value.time);
		state.task.endTime = new Date(endTime.value.date + " " + endTime.value.time);
	}

	function pick(sign, event) {
		const value = event.detail.value;
		switch (sign) {
			case "begin-date":
				startTime.value.date = value.replace(/-/g, "/");
				break
			case "begin-time":
				startTime.value.time = value;
				break;
			case "end-date":
				endTime.value.date = value.replace(/-/g, "/");
				break
			case "end-time":
				endTime.value.time = value;
				break;
		}
		const begin = new Date(startTime.value.date + " " + startTime.value.time);
		const end = new Date(endTime.value.date + " " + endTime.value.time);
		if (end.getTime() <= begin.getTime()) {
			begin.setHours(begin.getHours() + 1);
			endTime.value.date = getDateStr(begin);
			endTime.value.time = timeWithoutSeconds(begin);
		}
	}

	function changeNotifyMode(e) {
		const detail = e.detail;
		if (detail.column == 1) {
			state.notifyOpt[0] = remindModeValues(detail.value + 1);
		}
	}

	function toUpdate(index,quadrantName) {
		state.isTaskUpdate = true;
		const task = state.data[quadrantName][index];
		task.index = index;
		GetTaskReminders(task.instanceId, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.selectedTask = task;
			for (let reminder of res.data)
				reminder.timing = new Date(reminder.timing);
			state.selectedTask.reminderInfoModels = res.data;
			copy(state.selectedTask, state.task);
			startTime.value.date = getDateStr(state.task.beginTime);
			startTime.value.time = timeWithoutSeconds(state.task.beginTime);
			endTime.value.date = getDateStr(state.task.endTime);
			endTime.value.time = timeWithoutSeconds(state.task.endTime);
			taskEditor.value.open();
		});
	}


	function openToEdit() {
		taskEditor.value.open();
	}

	function takePriority(item) {
		state.task.priority = item.value;
		priorityPopup.value.close();
	}

	function takeBaseRule(e) {
		const value = e.value;

		if (value < state.frequency.data.length) {
			if (value == 0) {
				state.task.period = null;
				state.task.repeatable = false;
				defRulePopup.value.close();
				return;
			}
			state.task.repeatable = true;
			state.task.period = 1;
			state.task.periodUnit = value;
		} else {
			state.task.repeatable = true;
			customPopup.value.open();
			state.frequency.selection = 0;
			state.task.period = null;
			state.task.periodUnit = null;
		}
		defRulePopup.value.close();
	}

	function takeCount(e) {
		const values = e.detail.value;
		state.task.count = values[0] + 1;
	}

	function takeDeadline(e) {
		const value = e.detail.value;
		state.task.deadline = new Date(value);
	}

	function takeDef(e) {
		const values = e.detail.value;
		state.task.period = values[0] + 1;
		state.task.periodUnit = values[1] + 1;
	}

	function resetSomeData() {
		if (state.rule.selection == 0) {
			state.task.count = null;
			state.task.deadline = null;
		} else if (state.rule.selection == 1) {
			state.task.count = null;
		} else if (state.rule.selection == 2) {
			state.task.deadline = null;
		}
	}
	
	function resetDataOption(){
		for(let pro in state.dataOption)
		   state.dataOption[pro] = false;
	}

	function editTask() {
		state.task.beginTime = new Date(`${startTime.value.date} ${startTime.value.time}`);
		state.task.endTime = new Date(`${endTime.value.date} ${endTime.value.time}`);
		if (!state.isTaskUpdate) {
			CreateTask(state.task, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
					return;
				}
				loading("创建中...", () => {
					state.task.taskId = res.data;
					state.task.instanceId = res.data;
					const task = {};
					task.style="";
					copy(state.task, task);
					state.data[`${quadrant.value}-${state.task.priority}`].push(task);
					taskEditor.value.close();
				}, 750);
			});
		} else {
			if(state.task.title.length==0)
			   state.task.title = state.selectedTask.title;
			UpdateTask(state.task, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
					return;
				}
				loading("", () => {
					const quadrantFrom = `${quadrant.value}-${state.selectedTask.priority}`;
					const quadrantTo =  `${quadrant.value}-${state.task.priority}`;
					copy(state.task, state.selectedTask);
					if(quadrantFrom!=quadrantTo){
						state.data[quadrantFrom].splice(state.selectedTask.index,1);
						const data = state.data[quadrantTo];
						if(data.length==0)
						   data.push(state.selectedTask);
						else{
							var i;
							for(i=0;i<data.length;i++){
								if(data[i].createTime<=state.selectedTask.createTime)
								{
									data.splice(i,0,state.selectedTask);
									break;
								}
							}
							if(i==data.length)
							   data.push(state.selectedTask);
							uni.removeStorageSync(TaskReminderKey);   
						} 
					}
					taskEditor.value.close();
				}, 550);

			});
		}
	}

	function selectDay(date) {
		state.selectedDay = date;
		resetBeginEndTime();
		state.task.beginTime = new Date(`${startTime.value.date} ${startTime.value.time}`);
		state.task.endTime = new Date(`${endTime.value.date} ${endTime.value.time}`);
	}
	
	function getTimeStr(date){
		if(dateEquals(date,today.value))
		  return timeWithoutSeconds(date);
		else
		  return getDateTimeStr(date,date.getFullYear());
	}
	
	function finishOrNot(task){
		var state = 0;
		if(task.state==TaskState.unfinished)
		 state = TaskState.finished;
		else if(task.state==TaskState.finished)
		  state = TaskState.unfinished;
		 FinishOrNot(task.instanceId,state,response=>{
			const res = response.data;
			 if(!res.succeeded){
				 uni.showToast({
				 	title:res.message,
					icon:"none"
				 });
				 return;
			 }
			 task.state = state;
		 });
	}
	
	function toDragTaskContent(event,task){
		event.stopPropagation();
	    const point = event.touches[0];
		const position = {
			x:point.pageX,
			y:point.pageY
		};
		if(taskContentIn(position,getElementBound(quadrant1.value[0].$el)))
			state.dataOption[`${quadrant.value}-1`] = true;		
		else if(taskContentIn(position,getElementBound(quadrant2.value[0].$el)))
			state.dataOption[`${quadrant.value}-2`] = true;
		else if(taskContentIn(position,getElementBound(quadrant3.value[0].$el)))
			state.dataOption[`${quadrant.value}-3`] = true;
		else if(taskContentIn(position,getElementBound(quadrant4.value[0].$el)))
			state.dataOption[`${quadrant.value}-4`] = true;
		task.style="position:relative;z-index:1000;top:5px;left:-5px;background-color:cyan;";
	}
	
	function draggingTaskContent(event,task){
		 event.stopPropagation();
		
	     const point = event.touches[0];
		 const position = {
			 x:point.pageX,
			 y:point.pageY
		 };
		 
		 if(task.style.length>0)
		    {
				//#ifdef H5
				task.style =`position:absolute;background-color:cyan;z-index:1000;top:${position.y}px;left:${position.x}px;
				transform:translate(-50%,-50%)`;
				//#endif
				//#ifndef H5
				task.style =`position:absolute;background-color:cyan;z-index:1000;top:${position.y}px;left:${position.x}px;
				-webkit-transform:translate(-50%,-50%)`;
				//#endif	
				if(taskContentIn(position,getElementBound(quadrant1.value[0].$el)))
					{
						resetDataOption();
						state.dataOption[`${quadrant.value}-1`] = true;
				    }		
				else if(taskContentIn(position,getElementBound(quadrant2.value[0].$el)))
					{
						resetDataOption();
						state.dataOption[`${quadrant.value}-2`] = true;
					}
				else if(taskContentIn(position,getElementBound(quadrant3.value[0].$el)))
					{
						resetDataOption();
						state.dataOption[`${quadrant.value}-3`] = true;
					}
				else if(taskContentIn(position,getElementBound(quadrant4.value[0].$el)))
					{
						resetDataOption();
						state.dataOption[`${quadrant.value}-4`] = true;
					}
			}
	}
	
	function taskContentDragged(event,task,itemIndex){
		task.style="";
		state.selectedTask = null;
		const point = event.changedTouches[0];
		const position = {
			x:point.pageX,
			y:point.pageY
		};
		resetDataOption();
		var priority = undefined;
		if(taskContentIn(position,getElementBound(quadrant1.value[0].$el))&&task.priority!=state.priority[0].value)
			priority = state.priority[0].value;
		else if(taskContentIn(position,getElementBound(quadrant2.value[0].$el))&&task.priority!=state.priority[1].value)
			priority = state.priority[1].value;
		else if(taskContentIn(position,getElementBound(quadrant3.value[0].$el))&&task.priority!=state.priority[2].value)
			priority = state.priority[2].value;
		else if(taskContentIn(position,getElementBound(quadrant4.value[0].$el))&&task.priority!=state.priority[3].value)
			priority = state.priority[3].value;
		
		if(priority==undefined)return;
	    ChangePriority({
			taskId:task.taskId,
			instanceId:task.instanceId,
			priority:priority,
			repeatable:task.repeatable
		},response=>{
			const res = response.data;
			if(!res.succeeded){
				uni.showToast({
					title:res.message,
					icon:"none"
				});
				return;
			}
			const quadrantValue = `${quadrant.value}-${task.priority}`;
			
			const toQuadrant = `${quadrant.value}-${priority}`;
			state.data[quadrantValue].splice(itemIndex,1);
			task.priority = priority;
			const data = state.data[toQuadrant];
			if(data.length==0)
			   data.push(task);
			else{
				var i;
				for(i=0;i<data.length;i++){
					if(data[i].createTime<=task.createTime)
					{
						data.splice(i,0,task);
						break;
					}
				}
				if(i==data.length)
				   data.push(task);
			} 
		});		
	}
	
	function cancelDragging(task){
		task.style="";
	}
	
	function taskContentIn(position,bound){
		return position.x>=bound.left&&position.x<=bound.left+bound.width&&
		          position.y>=bound.top&&position.y<=bound.top+bound.height;
	}
	
	function getElementBound(element){
		return  {
				left:element.offsetLeft,
				top:element.offsetTop,
				width:element.offsetWidth,
				height:element.offsetHeight
			};
	}
	
	function getQuadrant(index){
		return `${quadrant.value}-${index+1}`;
	}

</script>

<style>
	#four-quadrants {
		position: relative;
		display: flex;
		width: 100%;
		background-color: aliceblue;
		height: 96vh;
		flex-flow:column nowrap;
		align-items: center;
	}

	#four-quadrants .content {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		width: 96%;
		height: 90%;
	}

	#four-quadrants .header 
	{
		width: 96%;
		/*#ifdef H5*/
		padding-top: 20px;;
		/*#endif*/
		/*#ifndef H5*/
		padding-top: 10%;
		/*#endif*/
		font-size: 18px;
	}

	#four-quadrants .content .item {
		width: 42vw;
		background-color: #fff;
		height: 45%;
		margin-left: 10px;
		font-size: 14px;
		padding: 1%;
		overflow: hidden auto;
		border-radius: 5px;
	}
	
	#four-quadrants .item-content{
		height: 45px;
		width:38vw;
	}
		
	#four-quadrants .task{
		display: flex;
		align-items: center;
		width:44vw;
		border-radius: 6px;
	}
	
	#four-quadrants .task .task-text{
		font-size: 12px;
		text-wrap: nowrap;
		text-overflow: ellipsis;
	}
    
	#four-quadrants .task .info{
		display: flex;
		flex-flow: column nowrap; 
		color:black;
	}
	
	#four-quadrants .task .info .text{
		font-size: 10px;
	}
	
	#quadrant-1,#quadrant-2,#quadrant-3,#quadrant-4{
		
	}
	
	.quadrant-1 {
		color: red;
	}

	.quadrant-2 {
		color: rgb(255, 195, 0);
	}

	.quadrant-3 {
		color: blue;
	}

	.quadrant-4 {
		color: springgreen;
	}

	#four-quadrants .task-edit {
		position: relative;
		height: 35vh;
	}

	#four-quadrants .gray-text {
		font-size: 14px;
		color: gray;
	}

	#four-quadrants .task-edit .head {
		padding: 2%;
		display: flex;
		align-items: center;
	}

	#four-quadrants .head .image {
		width: 20px;
		height: 20px;
		margin-left: 5px;
	}

	#four-quadrants .time {
		height: 40vh;
	}

	#four-quadrants .time .image {
		width: 18px;
		height: 18px;
	}

	#four-quadrants .time .select-datetime,
	#four-quadrants .time .info {
		display: flex;
		font-size: 14px;
		color: gray;
	}
	/*#ifndef H5*/
	#four-quadrants .time .select-datetime
	{
		font-size: 12px;
		height: 20px;
		line-height: 20px;
	}
    /*#endif*/
	#four-quadrants .time .info {
		align-items: center;
	}

	#four-quadrants .time .time-item {
		display: flex;
		justify-content: space-between;
		width: 100%;
		display: flex;
		font-size: 14px;
	}

	#four-quadrants .custom {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 78vh;
		padding: 1%;
		width: 100vw;
	}

	#four-quadrants .custom .head {
		display: flex;
		align-items: center;
		margin-top: 1%;
		margin-bottom: 1%;
		width: 100%;
	}

	#four-quadrants .custom .picker {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1%;
		height: 30px;
	}

	#four-quadrants .custom .picker .picker-inner {
		width: 20px;
		line-height: 32px;
		text-align: center;
	}

	#four-quadrants .reminders {
		display: flex;
	}

	#four-quadrants .reminder {
		position: relative;
		width: 70px;
		height: 30px;
		border-radius: 8px;
		margin-left: 2%;
		background-color: aliceblue;


	}

	#four-quadrants .reminder .close {
		position: absolute;
		right: 0px;
		top: 0px;
		z-index: 6;
	}

	#four-quadrants .reminder .reminder-text {
		display: block;
		color: rgb(0, 75, 235);
		height: 30px;
		line-height: 30px;
		width: 100%;
		text-align: center;
		font-size: 14px;
	}
</style>