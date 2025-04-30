<template>
	<view id="four-quadrants" :style="{backgroundColor:subject.backColor}">
		<view class="header">
			<text>四象限</text>
			&nbsp;
			<text style="color:rgb(25,27,28);font-size: 17px;">
				{{today.getFullYear()}}年{{today.getMonth()+1}}月{{today.getDate()}}日&nbsp;{{weekDaySign(today.getDay())}}
			</text>
			&nbsp;
			<k-time-counter style="display: inline-block;color: rgb(44,47,49);font-size: 16px;" />
			<image src="../static/fresh.png" @click="reloadTo('/pages/fourQuadrants')" style="height: 20px;width: 20px;margin-left:5%;"/>
		</view>
		<view class="content">
			<view class="item" v-for="(item,index) in state.priority" :key="index" :ref="quadrant+(index+1)"
				:id="getQuadrant(index)" :style="state.dataOption[getQuadrant(index)]?getBorderStyle(index):''">
				<text :class="getQuadrant(index)">{{item.text}}</text>
				<view :scroll-y="true" style="width:100%;">
					<view class="item-content" v-for="(task,index1) in state.data[getQuadrant(index)]" :key="index1"
						:style="task.style.length>0?'':'position:relative'">
						<view class="task" @click="toUpdate(index1,getQuadrant(index))"
							@longpress="toDragTaskContent($event,task)" @touchmove="draggingTaskContent($event,task)"
							@touchend="taskContentDragged($event,task,index1)" @touchcancel="cancelDragging(task)"
							:style="task.style">
							<view class="mask" v-if="task.state==TaskState.abondoned"></view>
							<checkbox-group @change="finishOrNot(task)">
								<checkbox :checked="task.state==TaskState.finished" style="transform:scale(0.5)" />
							</checkbox-group>
							<view class="info">
								<!--#ifdef H5-->
								<text class="task-text" v-html="task.title">
									<!--#endif-->
									<!--#ifndef H5-->
									<text class="task-text">
										{{task.title}}
										<!--#endif-->
									</text>
									<text class="text"
										style="color: rgb(0,75,235);">开始：{{getTimeStr(task.beginTime)}}</text>
									<text class="text" style="color:red;">结束：{{getTimeStr(task.endTime)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<task-editor ref="quadrantTaskEditor" :task="state.selectedTask" @close="beforeEditorClose"
			:isTaskUpdate="state.selectedTask!=null" v-if="state.show" @created="taskCreated" @updated="taskUpdated"
			@removed="taskRemoved" :subject="subject"></task-editor>
		<uni-fab :pattern="pattern" :horizontal="fabPosition.value()" vertical="bottom" :pop-menu="false"
			@fabClick="openToEdit" @longpress="fabPosition.left=!fabPosition.left" />
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
		TaskState,
		weekDaySign,
		buildElById,
		TaskReminderKey,
		delayToRun,
		priority,
		ValueText,
		dateEquals,
		timeWithoutSeconds,
		reloadTo
	} from '../module/Common';
	import {
		GetTaskReminders,
		FinishOrNot
	} from "../api/Task"
	import {
		ChangePriority,
		GetTasks
	} from '../api/FourQuadrants';
	import {
		onShow,
		onTabItemTap
	} from "@dcloudio/uni-app"
import { SubjectStyle, getSubject } from '../module/Subject';
	const pattern = ref({
		color: '#7A7E83',
		backgroundColor: '#fff',
		buttonColor: '#007AFF',
		iconColor: '#fff'
	});
	const subject = ref(new SubjectStyle());

	const quadrantTaskEditor = ref(null);
	const quadrant1 = ref(null);
	const quadrant2 = ref(null)
	const quadrant3 = ref(null)
	const quadrant4 = ref(null)

	const today = ref(new Date());
	const fabPosition = ref({
		left: false,
		value: function() {
			return this.left ? "left" : "right";
		}
	})

	const state = reactive({
		selectedDay: new Date(),
		selectedTask: null,
		isTaskUpdate: false,
		data: {},
		dataOption: {},
		show: false,
		userId: "",
		priority: []
	});
	const quadrant = ref("quadrant");

	onMounted(() => {
		for (let i = 0; i < 4; i++)
			state.priority.push(new ValueText(i + 1, ""));
		state.priority[0].text = "Ⅰ " + priority[0].text;
		state.priority[1].text = "Ⅱ " + priority[1].text;
		state.priority[2].text = "Ⅲ " + priority[2].text;
		state.priority[3].text = "Ⅳ " + priority[3].text;
		//#ifndef H5
		nextTick(() => {
			buildElById(quadrant1.value[0]);
			buildElById(quadrant2.value[0]);
			buildElById(quadrant3.value[0]);
			buildElById(quadrant4.value[0]);
		});
		//#endif
	});

	onShow(() => {
		const user = uni.getStorageSync("user");
		state.userId = user.uid;
		getData();
		subject.value = getSubject();
		pattern.value.buttonColor = subject.value.fabColor;
	});

	onTabItemTap(() => {
		state.show = false;
	});

	function getData() {
		GetTasks(state.userId, today.value, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.data = res.data;
			for (let pro in state.data) {
				for (let task of state.data[pro]) {
					task.beginTime = new Date(task.beginTime);
					task.endTime = new Date(task.endTime);
					if (task.deadline != null)
						task.deadline = new Date(task.deadline);
					task.style = "";
				}
				state.dataOption[pro] = false;
			}
			uni.removeStorageSync(TaskReminderKey);
		});
	}

	function beforeEditorClose() {
		delayToRun(() => {
			state.show = false;
			state.selectedTask = null;
		}, 450);
	}

	function toUpdate(index, quadrantName) {
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
			state.show = true;
			nextTick(() => {
				quadrantTaskEditor.value.open();
			});
		});
	}

	function openToEdit() {
		state.show = true;
		nextTick(() => {
			quadrantTaskEditor.value.open();
		});

	}

	function resetDataOption() {
		for (let pro in state.dataOption)
			state.dataOption[pro] = false;
	}

	function taskCreated(e) {
		const task = e.item;
		if (!dateEquals(task.beginTime, today.value)) return;
		const quadrantTo = `${quadrant.value}-${task.priority}`;
		state.data[quadrantTo].push(task);
	}

	function taskUpdated(e) {
		const index = e.index;
		const task = e.item;
      const quadrantFrom = `${quadrant.value}-${state.selectedTask.priority}`;
		if (!dateEquals(task.beginTime, today.value)) 
              state.data[quadrantFrom].splice(index,1);
	     else {
			const quadrantTo = `${quadrant.value}-${task.priority}`;
			if (quadrantFrom != quadrantTo) {
				state.data[quadrantFrom].splice(index, 1);
				const data = state.data[quadrantTo];
				if (data.length == 0)
					data.push(task);
				else {
					var i;
					for (i = 0; i < data.length; i++) {
						if (data[i].createTime <= task.createTime) {
							data.splice(i, 0, task);
							break;
						}
					}
					if (i == data.length)
						data.push(task);
					uni.removeStorageSync(TaskReminderKey);
				}
			}
		}
	}

	function taskRemoved(e) {
		const index = e.index;
		const priority = e.priority;

		state.data[`${quadrant.value}-${priority}`].splice(index, 1);
	}

	function finishOrNot(task) {
		var state = 0;
		if (task.state == TaskState.unfinished)
			state = TaskState.finished;
		else if (task.state == TaskState.finished)
			state = TaskState.unfinished;
		FinishOrNot(task.instanceId, state, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			task.state = state;
		});
	}

	function toDragTaskContent(event, task) {
		event.stopPropagation();
		const point = event.touches[0];
		const position = {
			x: point.pageX,
			y: point.pageY
		};
		if (taskContentIn(position, getElementBound(quadrant1.value[0].$el)))
			state.dataOption[`${quadrant.value}-1`] = true;
		else if (taskContentIn(position, getElementBound(quadrant2.value[0].$el)))
			state.dataOption[`${quadrant.value}-2`] = true;
		else if (taskContentIn(position, getElementBound(quadrant3.value[0].$el)))
			state.dataOption[`${quadrant.value}-3`] = true;
		else if (taskContentIn(position, getElementBound(quadrant4.value[0].$el)))
			state.dataOption[`${quadrant.value}-4`] = true;
		task.style = "position:relative;z-index:1000;top:5px;left:-5px;background-color:cyan;";
	}

	function draggingTaskContent(event, task) {
		event.stopPropagation();

		const point = event.touches[0];
		const position = {
			x: point.pageX,
			y: point.pageY
		};

		if (task.style.length > 0) {
			//#ifdef H5
			task.style = `position:absolute;background-color:cyan;z-index:1000;top:${position.y}px;left:${position.x}px;
				transform:translate(-50%,-50%)`;
			//#endif
			//#ifndef H5
			task.style = `position:absolute;background-color:cyan;z-index:1000;top:${position.y}px;left:${position.x}px;
				-webkit-transform:translate(-50%,-50%)`;
			//#endif	
			if (taskContentIn(position, getElementBound(quadrant1.value[0].$el))) {
				resetDataOption();
				state.dataOption[`${quadrant.value}-1`] = true;
			} else if (taskContentIn(position, getElementBound(quadrant2.value[0].$el))) {
				resetDataOption();
				state.dataOption[`${quadrant.value}-2`] = true;
			} else if (taskContentIn(position, getElementBound(quadrant3.value[0].$el))) {
				resetDataOption();
				state.dataOption[`${quadrant.value}-3`] = true;
			} else if (taskContentIn(position, getElementBound(quadrant4.value[0].$el))) {
				resetDataOption();
				state.dataOption[`${quadrant.value}-4`] = true;
			}
		}
	}

	function taskContentDragged(event, task, itemIndex) {
		task.style = "";
		state.selectedTask = null;
		const point = event.changedTouches[0];
		const position = {
			x: point.pageX,
			y: point.pageY
		};
		resetDataOption();
		var priority = undefined;
		if (taskContentIn(position, getElementBound(quadrant1.value[0].$el)) && task.priority != state.priority[0].value)
			priority = state.priority[0].value;
		else if (taskContentIn(position, getElementBound(quadrant2.value[0].$el)) && task.priority != state.priority[1]
			.value)
			priority = state.priority[1].value;
		else if (taskContentIn(position, getElementBound(quadrant3.value[0].$el)) && task.priority != state.priority[2]
			.value)
			priority = state.priority[2].value;
		else if (taskContentIn(position, getElementBound(quadrant4.value[0].$el)) && task.priority != state.priority[3]
			.value)
			priority = state.priority[3].value;

		if (priority == undefined) return;
		ChangePriority({
			taskId: task.taskId,
			instanceId: task.instanceId,
			priority: priority,
			repeatable: task.repeatable
		}, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			const quadrantValue = `${quadrant.value}-${task.priority}`;

			const toQuadrant = `${quadrant.value}-${priority}`;
			state.data[quadrantValue].splice(itemIndex, 1);
			task.priority = priority;
			const data = state.data[toQuadrant];
			if (data.length == 0)
				data.push(task);
			else {
				var i;
				for (i = 0; i < data.length; i++) {
					if (data[i].createTime <= task.createTime) {
						data.splice(i, 0, task);
						break;
					}
				}
				if (i == data.length)
					data.push(task);
			}
		});
	}

	function cancelDragging(task) {
		task.style = "";
	}

	function taskContentIn(position, bound) {
		return position.x >= bound.left && position.x <= bound.left + bound.width &&
			position.y >= bound.top && position.y <= bound.top + bound.height;
	}

	function getElementBound(element) {
		return {
			left: element.offsetLeft,
			top: element.offsetTop,
			width: element.offsetWidth,
			height: element.offsetHeight
		};
	}

	function getQuadrant(index) {
		return `${quadrant.value}-${index+1}`;
	}

	function getTimeStr(date) {
		if (dateEquals(date, today.value))
			return timeWithoutSeconds(date);
		const year = today.value.getFullYear();
		return getDateTimeStr(date, year);
	}
	
	function getBorderStyle(index){
		const priority = index + 1;
		switch(priority){
			case 1: return "border:1.5px solid red";
			case 2: return "border:1.5px solid rgb(255, 195, 0)";
			case 3: return "border:1.5px solid blue";
			case 4: return "border:1.5px solid springgreen";
		}
	}
</script>

<style>
	#four-quadrants {
		position: relative;
		display: flex;
		width: 100%;
		background-color: aliceblue;
		height: 96vh;
		flex-flow: column nowrap;
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

	#four-quadrants .header {
		width: 96%;
		/*#ifdef H5*/
		padding-top: 20px;
		;
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

	#four-quadrants .item-content {
		height: 45px;
		width: 38vw;
	}

	#four-quadrants .task {
		display: flex;
		align-items: center;
		width: 44vw;
		border-radius: 6px;
		z-index: 1;
	}

	#four-quadrants .task .task-text {
		font-size: 12px;
		text-wrap: nowrap;
		text-overflow: ellipsis;
	}

	#four-quadrants .task .info {
		display: flex;
		flex-flow: column nowrap;
		color: black;
	}

	#four-quadrants .task .info .text {
		font-size: 10px;
	}

	#quadrant-1,
	#quadrant-2,
	#quadrant-3,
	#quadrant-4 {}

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
	#four-quadrants .time .select-datetime {
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

	#four-quadrants .mask {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 0;
		background-color: rgb(25, 35, 25, .5);
	}
</style>