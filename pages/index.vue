<template>
	<view id="index">
		<uni-popup type="left" ref="labelDrawer" background-color="#fff" style="z-index:1000">
			<view id="task-labels">
				<view class="header">
					<image class="avatar" :src="imgSrc(state.user.avatar)"></image>
					<text class="nickName">{{state.user.nickName}}</text>
				</view>
				<scroll-view class="labels">
					<uni-list>
						<uni-list-item v-for="(list,index) in state.lists" :key="index"
							:show-arrow="list.id!=IdOfLableNamed">
							<template v-slot:body>
								<view class="label-info" v-if="list.id!=IdOfLableNamed">
									<image :src="imgSrc(list.icon)" class="label-icon"></image>
									<text class="text">{{list.name}}</text>
									<view style="margin-left: 5%;display: flex;width:80px">
										<uni-icons type="compose" v-if="!list.notCustom"
											@click.stop="openLabelEditor(list,true,index);">
										</uni-icons>
										<text class="hide" @click.stop="hideOrShowLabel(index,true,false)">隐藏</text>
										<uni-icons type="trash" v-if="!list.notCustom"
											@click.stop="removeLabel(index,true)"></uni-icons>
									</view>
								</view>
								<view style="height: 100%;width:100%" v-if="list.id==IdOfLableNamed">
									<view class="label-info" style="position: relative;">
										<image :src="imgSrc(list.icon)" class="label-icon"></image>
										<text class="text">{{list.name}}</text>
										<view @click.stop="state.labelsExpand=!state.labelsExpand" class="right"
											:style="state.labelsExpand?state.labelsExpandStyle:''"
											v-if="state.labels.length>0">
											<uni-icons type="right" color="rgb(187, 187, 187)">
											</uni-icons>
										</view>
									</view>
									<scroll-view style="height: 30vh;" v-if="state.labelsExpand">
										<view class="label-info" v-for="(label,index1) in state.labels" :key="index1"
											style="margin-left: 4%;">
											<image :src="imgSrc(label.icon)" class="label-icon"></image>
											<text class="text" syule="width:80px;">{{label.name}}</text>
											<view style="margin-left: 5%;display: flex;width:80px">
												<uni-icons type="compose"
													@click.stop="openLabelEditor(label,false,index1);"></uni-icons>
												<text class="hide" style="margin-left: 6%;margin-right: 6%;"
													@click.stop="hideOrShowLabel(index1,false,false)">隐藏</text>
												<uni-icons type="trash"
													@click.stop="removeLabel(index1,false)"></uni-icons>
											</view>
										</view>
									</scroll-view>
								</view>
							</template>
						</uni-list-item>
					</uni-list>
				</scroll-view>
				<view class="add-list">
					<view class="add" @click="openLabelEditor(null,true)">
						<uni-icons type="plusempty" color="rgb(0,75,235)"></uni-icons><text
							style="margin-left: 2px;">清单</text>
					</view>
					<view class="add" style="margin-left:4%;margin-right: 4%;" @click="openLabelEditor(null,false)">
						<uni-icons type="plusempty" color="rgb(0,75,235)"></uni-icons><text
							style="margin-left: 2px;">标签</text>
					</view>
					<text style="font-size: 13px;color: rgb(0,75,235);">查看隐藏</text>
				</view>
				<label-editor :label="state.label" :isLabelUpdate="state.label!=null" v-if="state.show.label"
					:isList="state.isList" @created="labelCreated" @updated="labelUpdated" @close="labelEditorClose"
					ref="indexLabelEditor"></label-editor>
			</view>
		</uni-popup>
		<scroll-view class="index-content" direction="vertical" v-if="isBaseDayLabel(state.currentLabel.id)">
			<view class="header">
				<uni-icons type="bars" color="rgb(0,125,245)" :size="20" @click="labelDrawer.open()"></uni-icons>
				<text class="text">{{state.currentLabel.name}}</text>
			</view>
			<uni-collapse v-if="state.data['habit']!=undefined && state.data['habit'].length>0">
				<uni-collapse-item>
					<template v-slot:title>
						<view class="item-title">
							<text class="text">习惯</text>
							<text style="font-size: 13px;color:gray">{{state.data['habit'].length}}</text>
						</view>
					</template>
					<scroll-view style="max-height: 36vh;">
						<view v-for="(habit,index) in state.data['habit']" class="habit"
							:key="index">
							<uni-swipe-action>
								<uni-swipe-action-item :disabled="habit.finished">
									<template v-slot:right>
										<view class="finishBtn" @click.stop="finishHabit(index)" >完成</view>
									</template>
									<view style="display: flex;justify-content: space-between;"
										@click="seeHabitDetail(habit)">
										<view class="info">
											<image :src="imgSrc(habit.thumb)"
												style="width: 40px;height: 40px;border-radius:50%;"></image>
											<text
												style="margin-left:3px;text-wrap: nowrap;text-overflow: ellipsis;">{{habit.name}}</text>
										</view>
										<view class="option" v-if="!state.optionMostCheck"
											@click.stop="state.optionMostCheck=true">
											<text>{{habit.persistDays}}天</text>
											<text>共坚持</text>
										</view>
										<view class="option" v-if="state.optionMostCheck"
											@click.stop="state.optionMostCheck=false">
											<text>{{habit.mostDays}}天</text>
											<text>最多连续</text>
										</view>
									</view>
									<view class="finish" v-if="habit.finished">
										<text style="font-weight: normal;font-size: 14px;color:blue;
							  margin-left: 4px;margin-right: 4px;">
											{{dateEquals(habit.finishTime,new Date())?timeWithoutSeconds(habit.finishTime):
							  getDateStr(habit.finishTime)}}&nbsp;
											完成</text>
										<!--#ifndef H5-->
										<text @tap.stop="unfinishHabit(habit)">
											<uni-icons type="close" color="red" :size="20"></uni-icons>
										</text>
										<!--#endif-->
										<!--#ifdef H5-->
										<text @click.stop="unfinishHabit(habit)">
											<uni-icons type="close" color="red" :size="20"></uni-icons>
										</text>
										<!--#endif-->
									</view>
								</uni-swipe-action-item>
							</uni-swipe-action>
						</view>
					</scroll-view>
				</uni-collapse-item>
			</uni-collapse>
			<uni-collapse>
				<uni-collapse-item>
					<template v-slot:title>
						<view class="item-title">
							<text class="text">任务</text>
							<text style="font-size: 13px;color:gray">{{state.data['task'].length}}</text>
						</view>
					</template>
					<scroll-view style="max-height: 30vh;">
						<uni-swipe-action v-for="(task,index) in state.data['task']" :key="index">
							<uni-swipe-action-item>
								<template v-slot:left>
									<view style="display: flex;align-items: center;">
										<button size="mini" style="background-color: rgb(0,255,0);color: white;"
											v-if="task.state==TaskState.unfinished"
											@click="finishTaskOrNot(index)">完成</button>
										<button size="mini" style="background-color: red;color: #fff;"
											v-if="task.state==TaskState.finished" @click="finishTaskOrNot(index)">取消完成</button>
									</view>
								</template>
								<view style="display: flex;justify-content: center;padding-right: 1%;">
									<view @click="openTaskEditor(task)" class="task">
										<checkbox-group @change="finishTaskOrNot(index)">
											<checkbox :checked="task.state==1" style="transform: scale(70%);">
											</checkbox>
										</checkbox-group>
										<view class="task-content" @click="seeTaskDetail(index)">
											<view class="title">
												<text>{{task.title}}</text>
												<text style="font-size: 13px;color: gray;">{{task.description}}</text>
											</view>
											<view v-html="getTaskTimeStr(task)" class="time"></view>
										</view>
									</view>
								</view>
							 </uni-swipe-action-item>
						</uni-swipe-action>
					</scroll-view>
				</uni-collapse-item>
			</uni-collapse>
		</scroll-view>
		<scroll-view direction="vertical" v-if="!isBaseDayLabel(state.currentLabel.id)">
			<uni-swipe-action v-for="(task,index) in state.data['task']" :key="index">
				<uni-swipe-action-item>
					<template v-slot:left>
						<view style="display: flex;align-items: center;">
							<button size="mini" style="background-color: rgb(0,255,0);color: white;"
								v-if="task.state==TaskState.unfinished"
								@click="finishTaskOrNot(index)">完成</button>
							<button size="mini" style="background-color: red;color: #fff;"
								v-if="task.state==TaskState.finished"
								@click="finishTaskOrNot(index)">取消完成</button>
						</view>
					</template>
					<view style="display: flex;justify-content: center;padding-right: 1%;">
						<view @click="openTaskEditor(task)" class="task">
							<checkbox-group @change="finishTaskOrNot(index)">
								<checkbox :checked="task.state==1" style="transform: scale(70%);">
								</checkbox>
							</checkbox-group>
							<view class="task-content" @click="seeTaskDetail">
								<view class="title">
									<text>{{task.title}}</text>
									<text style="font-size: 13px;color: gray;">{{task.description}}</text>
								</view>
								<view v-html="getTaskTimeStr(task)" class="time"></view>
							</view>
						</view>
					</view>
				 </uni-swipe-action-item>
			</uni-swipe-action>
		</scroll-view>
		<task-editor ref="indexTaskEditor" :task="state.task" :isTaskUpdate="state.task!=null" v-if="state.show.task"
			@close="taskEditorClose" @created="taskCreated" @updated="taskUpdated" :label="state.currentLabel" :labelSet="true">
		</task-editor>
		<habit-detail :habit="state.habit" v-if="state.show.habit" @updated="habitUpdated" ref="indexHabitDetail"
			@close="habitDetailClose"></habit-detail>
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="openToEdit" />
	</view>
</template>

<script setup>
	import {
		nextTick,
		onMounted,
		reactive,
		ref
	} from 'vue';
	import {
		FinishTaskOrNot,
		GetData,
		GetLabels,
		HideOrShowLabel,
		IdOfLableNamed,
		RemoveLabel
	} from '../api/Index';
	import {
		copy,
		delayToRun,
		onlyDate,
		isBaseDayLabel,
		timeWithoutSeconds,
		TaskState,
		dateEquals,
		getDateStr
	} from '../module/Common';
	import {
		user
	} from '../api/User';
	import {
		imgSrc
	} from '../module/Request';
import { FinishOrNot } from '../api/Habit';

	const pattern = ref({
		color: '#7A7E83',
		backgroundColor: '#fff',
		buttonColor: '#007AFF',
		iconColor: '#fff'
	});

	const state = reactive({
		data: {},
		user: {
			id: "",
			avatar: "",
			nickName: ""
		},
		task: null,
		show: {
			task: false,
			habit: false,
			label: false
		},
		habit: null,
		label: null,
		isList: false,
		lists: [],
		labels: [],
		labelsExpand: false,
		labelsExpandStyle: "",
		currentLabel: {},
		optionMostCheck:false
	});

	const indexTaskEditor = ref(null);
	const indexDetail = ref(null);
	const indexLabelEditor = ref(null);
	const labelDrawer = ref(null);
	const currentLabel = ref("current-label");

	onMounted(() => {
		const user = uni.getStorageSync("user");
		state.user.id = user.uid;
		state.user.avatar = user.avatar;
		state.user.nickName = user.nickName;

		state.labelsExpandStyle = "-webkit-transform: rotateZ(90deg);";

		var label = uni.getStorageSync(currentLabel.value);
		if (label == null || label == '')
			label = {
				id: 1,
				name: "今天"
			};
		state.currentLabel = label;
		getData(label.id);

		getLabels();
	});

	function openTaskEditor(task) {
		state.task = task;
		openToEdit();
	}

	function openToEdit() {
		state.show.task = true;
		nextTick(() => {
			indexTaskEditor.value.open();
		});
	}

	function openLabelEditor(label, isList, index) {
		state.show.label = true;
		state.isList = isList;
		if (label != null) {
			state.label = label;
			state.label.index = index;
		}
		nextTick(() => {
			indexLabelEditor.value.open();
		});
	}

	function labelCreated(e) {
		const label = e.item;
		if (label.isList)
			state.lists.splice(IdOfLableNamed, 0, label);
		else
			state.labels.push(label);
	}

	function labelUpdated(e) {
		const index = e.index;
		const label = e.item;
		if (label.isList)
			state.lists[index] = label;
		else
			state.labels[index] = label;
	}

	function taskCreated(e) {
		const item = e.item;
		state.data['task'].push(item);
	}

	function taskUpdated(e) {
		const index = e.index;
		const item = e.item;

		state.data['task'][index] = item;
	}

	function seeHabitDetail(habit) {
		state.habit = habit;
		state.show.habit = true;
		nextTick(() => indexDetail.value.open());
	}

	function taskEditorClose() {
		delayToRun(() => state.show.task = false, 150);
	}

	function habitDetailClose() {
		delayToRun(() => state.show.habit = false, 150);
	}

	function labelEditorClose() {
		delayToRun(() => {
			state.show.label = false;
			state.label = null;
		}, 150);
	}

	function getData(lableId) {
		const time = onlyDate(new Date());
		if (lableId == 2)
			time.setDate(time.getDate() + 1);
		else if (lableId == 3)
			time.setDate(time.getDate() - 1);
		GetData(state.user.id, lableId, time.getTime(), response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.data = res.data;
			for (let task of state.data['task']) {
				task.beginTime = new Date(task.beginTime);
				task.endTime = new Date(task.endTime);
			}
			if(state.data['habit']!=undefined)
			{
				for(let habit of state.data['habit'])
				   {
					   habit.finishTime = new Date(habit.finishTime);
					   habit.beginDate = new Date(habit.beginDate);
				   }
			}

		});
	}

	function hideOrShowLabel(index, isList, display) {
		const label = isList ? state.lists[index] : state.labels[index];
		HideOrShowLabel(label.id, display, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			if (isList)
				state.lists.splice(index, 1);
			else
				state.labels.splice(index, 1);
		});
	}

	function removeLabel(index, isList) {
		const label = isList ? state.lists[index] : state.labels[index];
		RemoveLabel(label.id, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			if (isList)
				state.lists.splice(index, 1);
			else
				state.labels.splice(index, 1);
		});
	}

	function getLabels() {
		GetLabels(state.user.id, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.lists = res.data.filter(l => l.isList);
			state.labels = res.data.filter(l => !l.isList);
		});
	}

	function getTaskTimeStr(task) {
		const beginTime = task.beginTime;
		const endTime = task.endTime;
		var res;
		const time = onlyDate(new Date());
		if (state.currentLabel.id == 2)
			time.setDate(time.getDate() + 1);
		else if (state.currentLabel.id == 3)
			time.setDate(time.getDate() - 1);
		else if(!isBaseDayLabel(state.currentLabel.id)) 
		   return `<text style="color:rgb(0,75,235)">${getDateStr(beginTime)}</text><text style="color:rgb(0,75,235)">${getDateStr(endTime)}</text>`
		if (dateEquals(beginTime, endTime))
			res = `<text style="color:rgb(0,75,235)">${timeWithoutSeconds(beginTime)}</text><text style="color:red">${timeWithoutSeconds(endTime)}</text>`;
		else if (dateEquals(beginTime, time) && !dateEquals(endTime, time))
			res = `<text>开始</text><text style="color:rgb(0,75,235)">${timeWithoutSeconds(beginTime)}</text>`;
		else if (!dateEquals(beginTime, time) && dateEquals(endTime, time))
			res = `<text>结束</text><text style="color:rgb(0,75,235)">${timeWithoutSeconds(endTime)}</text>`;
		else
			res = "<text>全天</text>"
		return res;
	}
	
	function finishTaskOrNot(index){
		const task = state.data['task'][index];
		var state;
		if(task.state==TaskState.finished)
		   state = TaskState.unfinished;
		else state = TaskState.finished;
		FinishTaskOrNot(task.instanceId,state,response=>{
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
	
	function finishHabit(index){
		const time = onlyDate(new Date());
		if (state.currentLabel.id == 2)
			time.setDate(time.getDate() + 1);
		else if (state.currentLabel.id == 3)
			time.setDate(time.getDate() - 1);
		const habit = state.data['habit'][index];
		const record = {
			finished:true,
			day:time,
			finishTime:new Date(),
			habitId:habit.habitId
		};
		
		FinishOrNot(record,response=>{
			const res = response.data;
			if(!res.succeeded){
				uni.showToast({
					title:res.message,
					icon:"none"
				});
				return;
			}
			habit.finished = true;
			habit.finishTime = record.finishTime;
			recordFinish(habit,res.data);
		});
	}
	
	function unfinishHabit(habit){
		const time = onlyDate(new Date());
		if (state.currentLabel.id == 2)
			time.setDate(time.getDate() + 1);
		else if (state.currentLabel.id == 3)
			time.setDate(time.getDate() - 1);
			
		const record = {
			finished:false,
			day:time,
			finishTime:null,
			habitId:habit.habitId
		};
		FinishOrNot(record,response=>{
			const res = response.data;
			if(!res.succeeded){
				uni.showToast({
					title:res.message,
					icon:"none"
				});
				return;
			}
			habit.finished = false;
			habit.finishTime = record.finishTime;
			recordFinish(habit,res.data);
		});
	}
	
	function recordFinish(habit,data) {
		habit.persistDays = data.persistDays;
		habit.mostDays = data.mostDays;
		habit.continuousDays = data.continuousDays;
	}
</script>

<style>
	#index {
		position: relative;
		height: 96vh;
		width: 100%;
		padding: 2%;
		padding-top: 2vh;
	}

	#task-labels {
		position: relative;
		height: 94vh;
		width: 70vw;
		padding: 1%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	#index .header .text {
		font-size: 16px;
		font-weight: 600;
		margin-left: 2%;
	}

	#task-labels .header {
		display: flex;
		font-size: 13px;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		margin-bottom: 2%;
	}

	#task-labels .header .avatar {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	#task-labels .header .nickName {
		text-wrap: nowrap;
		text-overflow: ellipsis;
		width: 150PX;
		margin-left: 3%;
		overflow: hidden;
	}

	#task-labels .label-info {
		display: flex;
		align-items: center;
		width: 100%
	}

	#task-labels .label-info .hide {
		font-size: 13px;
		margin-left: 6px;
		margin-right: 6px;
		color: rgb(0, 75, 235)
	}

	#task-labels .text {
		font-size: 13px;
		margin-left: 6%;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		width: 100px;
	}

	#task-labels .label-info .right {
		position: absolute;
		right: -2%;
		transition: transform 150ms;
	}

	#task-labels .label-icon {
		width: 22px;
		height: 22px;
	}

	#task-labels .labels {
		width: 94%;
	}

	#task-labels .add-list {
		position: fixed;
		bottom: 3%;
		left: 5%;
		display: flex;
		width: 44vw;
		height: 20px;
		align-items: center;
	}

	#task-labels .add-list .add {
		color: rgb(3%, 3%, 3%);
		font-size: 13px;
	}
	
	#index .item-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
	}
	
	#index .item-title .text{
		font-size: 14px;
		font-weight: 600;
	}

	#index .task {
		display: flex;
		height: 50px;
		width: 100%;
		align-items: center;
		font-size: 15px;
		margin-top: 2%;
		border-radius: 5px;
		margin-bottom: 2%;
	}

	#index .task-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	#index .task .title {
		display: flex;
		width: 120px;
		overflow: hidden;
		text-wrap: nowrap;
		text-overflow: ellipsis;
		flex-flow: column nowrap;
	}

	#index .task .time {
		display: flex;
		flex-flow: column nowrap;
		font-size: 13px;
		padding-right: 2%;
	}
	
	
	#index .option {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/*#ifdef H5*/
		margin-right: 2%;
		/*#endif*/
		/*#ifndef H5*/
		padding-right: 4vw;
		/*#endif*/
	}
	
	#index .habit{
		display: flex;
		flex-flow: column nowrap;
		margin-top:2%;
		margin-bottom: 1%;
		padding-right: 3%;
	}
	
	#index .habit .info{
		display: flex;
		align-items: center;
		margin-left: 2%;
	}
	
	#index .habit .finish {
		display: flex;
		padding-left: 3%;
		height: 25px;
		line-height: 25px;
	}
	
	
	#index .habit .finishBtn{
		position: relative;
		border: none;
		color: white;
		background-color: rgb(0,255,0);
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 7px;
		width: 60px;
	}
</style>