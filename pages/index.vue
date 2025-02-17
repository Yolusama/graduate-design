<template>
	<view id="index">
		<uni-popup type="left" ref="labelDrawer" background-color="#fff" style="z-index:1000">
			<view id="task-labels">
				<view class="header" @click="goToSelfInfo">
					<image class="avatar" :src="imgSrc(state.user.avatar)"></image>
					<text class="nickName">{{state.user.nickname}}</text>
				</view>
				<scroll-view class="labels" scroll-y>
					<uni-list>
						<uni-list-item v-for="(list,index) in state.lists" :key="index"
							:show-arrow="list.labelId!=IdOfLableNamed">
							<template v-slot:body>
								<view class="label-info" v-if="list.labelId!=IdOfLableNamed"
									@click="switchContent(list)">
									<image :src="imgSrc(list.icon)" class="label-icon"></image>
									<text class="text">{{list.labelName}}</text>
									<view style="margin-left: 5%;display: flex;width:90px">
										<view @click.stop="openLabelEditor(list,true,index);">
											<uni-icons type="compose" v-if="!list.notCustom">
											</uni-icons>
										</view>
										<text class="hide" @click.stop="hideOrShowLabel(index,true,false)">隐藏</text>
										<view @click.stop="removeLabel(index,true)">
											<uni-icons type="trash" v-if="!list.notCustom"></uni-icons>
										</view>
									</view>
								</view>
								<view style="height: 100%;width:100%" v-if="list.labelId==IdOfLableNamed">
									<view class="label-info" style="position: relative;">
										<image :src="imgSrc(list.icon)" class="label-icon"></image>
										<text class="text">{{list.labelName}}</text>
										<view @click.stop="state.labelsExpand=!state.labelsExpand" class="right"
											:style="state.labelsExpand?state.labelsExpandStyle:''"
											v-if="state.labels.length>0">
											<uni-icons type="right" color="rgb(187, 187, 187)">
											</uni-icons>
										</view>
									</view>
									<scroll-view style="height: 30vh;" v-if="state.labelsExpand&&state.labels.length>0" scroll-y>
										<view class="label-info" v-for="(label,index1) in state.labels" :key="index1"
											style="margin-left: 4%;margin-top: 2%;" @click="switchContent(label)">
											<image :src="imgSrc(label.icon)" class="label-icon"
												style="width: 16px;height: 16px;"></image>
											<text class="text" style="width:75px;">{{label.labelName}}</text>
											<view style="margin-left: 5%;display: flex;width:80px">
												<view @click.stop="openLabelEditor(label,false,index1);">
													<uni-icons type="compose"></uni-icons>
												</view>
												<text class="hide" style="margin-left: 6%;margin-right: 6%;"
													@click.stop="hideOrShowLabel(index1,false,false)">隐藏</text>
												<view @click.stop="removeLabel(index1,false)">
													<uni-icons type="trash"></uni-icons>
												</view>
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
					<text style="font-size: 13px;color: rgb(0,75,235);" @click="seeHiddenLabels">查看隐藏</text>
				</view>
				<label-editor :label="state.label" :isLabelUpdate="state.label!=null" v-if="state.show.label"
					:isList="state.isList" @created="labelCreated" @updated="labelUpdated" @close="labelEditorClose"
					ref="indexLabelEditor"></label-editor>
			</view>
		</uni-popup>
		<scroll-view class="index-content" direction="vertical">
			<view class="header">
				<uni-icons type="bars" color="rgb(0,125,245)" :size="20" @click="labelDrawer.open()"></uni-icons>
				<image :src="imgSrc(state.currentLabel.icon)"
					style="height: 30px;width: 30px;margin-left: 1%;margin-right: 1%"></image>
				<text class="text" style="margin-left: 0;">{{state.currentLabel.labelName}}</text>
			</view>
			<uni-collapse v-if="state.data['habit']!=undefined && state.data['habit'].length>0"
				style="margin-bottom: 4vh;" v-model="state.model.habit" :accordion="true">
				<uni-collapse-item>
					<template v-slot:title>
						<view class="item-title">
							<text class="text">习惯</text>
							<text style="font-size: 13px;color:gray">{{state.data['habit'].length}}</text>
						</view>
					</template>
					<scroll-view style="max-height: 40vh;" scroll-y>
						<view v-for="(habit,index) in state.data['habit']" class="habit" :key="index">
							<uni-swipe-action>
								<uni-swipe-action-item :disabled="habit.finished">
									<template v-slot:right>
										<view class="finishBtn" @click.stop="finishHabit(index)"
											v-if="state.currentLabel.labelId!=IdOfBin">完成</view>
										<view style="display: flex;align-items: center;"
											v-if="state.currentLabel.labelId==IdOfBin">
											<uni-icons type="close" color="red" @click="removeHabit(index)"
												:size="22"></uni-icons>
										</view>
									</template>
									<template v-if="state.currentLabel.labelId==IdOfBin" v-slot:left>
										<view style="display: flex;align-items: center;">
											<uni-icons type="undo" color="rgb(0,125,235)" @click="recoverHabit(index)"
												:size="22"></uni-icons>
										</view>
									</template>
									<view style="display: flex;justify-content: space-between;"
										@click="seeHabitDetail(index)">
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
			<uni-collapse v-if="(isBaseDayLabel(state.currentLabel.labelId)||state.currentLabel.labelId==IdOfBin)
			&&state.data['task'].length>0" v-model="state.model.task" :accordion="true">
				<uni-collapse-item>
					<template v-slot:title>
						<view class="item-title">
							<text class="text">任务</text>
							<text style="font-size: 13px;color:gray">{{state.data['task'].length}}</text>
						</view>
					</template>
					<scroll-view style="max-height: 30vh;" scroll-y>
						<uni-swipe-action v-for="(task,index) in state.data['task']" :key="index">
							<uni-swipe-action-item>
								<template v-slot:left>
									<view style="display: flex;align-items: center;position: relative;"
										v-if="state.currentLabel.labelId!=IdOfBin">
										<button size="mini" style="background-color: rgb(0,255,0);color: white;"
											v-if="task.state!=TaskState.finished"
											@click="finishTaskOrNot(index)">完成</button>
										<button size="mini" style="background-color: red;color: #fff;"
											v-if="task.state==TaskState.finished"
											@click="finishTaskOrNot(index)">取消完成</button>
									</view>
									<view style="display: flex;align-items: center;position: relative;">
										<uni-icons type="undo" :size="25" color="rgb(0,125,245)"
											@click="recoverTask(index)"
											v-if="state.currentLabel.labelId==IdOfBin"></uni-icons>
									</view>
								</template>
								<view style="display: flex;justify-content: center;padding-right: 1%;
									position: relative;z-index: 0;margin-top: 1%;border-radius: 5px;">
									<view class="mask" v-if="showMask(task)"></view>
									<view @click="openTaskEditor(index)" class="task">
										<checkbox-group @change="finishTaskOrNot(index)"
											v-if="state.currentLabel.labelId!=IdOfBin">
											<checkbox :checked="task.state==TaskState.finished"
												style="transform: scale(70%);">
											</checkbox>
										</checkbox-group>
										<view class="close" v-if="state.currentLabel.labelId==IdOfBin">
											<uni-icons type="close" color="red" :size="22"
												@click="removeTask(index)"></uni-icons>
										</view>
										<view class="task-content">
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
		<scroll-view scroll-y v-if="!isBaseDayLabel(state.currentLabel.labelId)&&state.currentLabel.labelId!=IdOfBin"
			style="height:94vh">
			<uni-swipe-action v-for="(task,index) in state.data['task']" :key="index">
				<uni-swipe-action-item>
					<template v-slot:left>
						<view style="display: flex;align-items: center;">
							<button size="mini" style="background-color: rgb(0,255,0);color: white;"
								v-if="task.state!=TaskState.finished" @click.stop="finishTaskOrNot(index)">完成</button>
							<button size="mini" style="background-color: red;color: #fff;"
								v-if="task.state==TaskState.finished" @click.stop="finishTaskOrNot(index)">取消完成</button>
						</view>
					</template>
					<view style="display: flex;justify-content: center;padding-right: 1%;border-radius: 5px;">
						<view @click="openTaskEditor(index)" class="task">
							<checkbox-group @change="finishTaskOrNot(index)">
								<checkbox :checked="task.state==TaskState.finished" style="transform: scale(70%);">
								</checkbox>
							</checkbox-group>
							<view class="mask" v-if="showMask(task)"></view>
							<view class="task-content">
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
			@close="taskEditorClose" @created="taskCreated" @updated="taskUpdated" :labelSet="true" 
			@removed="taskRemoved" @createdLabel="createdLabel" :userLabels="state.labels">
		</task-editor>
		<habit-detail :habit="state.habit" v-if="state.show.habit" @updated="habitUpdated" ref="indexHabitDetail"
			@close="habitDetailClose" @removed="habitRemoved" @finished="habitFinished"></habit-detail>
		<uni-fab :pattern="pattern" :horizontal="fabPosition.value()" vertical="bottom" :pop-menu="false"
			@fabClick="openToEdit" v-if="!isStateLabel(state.currentLabel.labelId)"
			@longpress="fabPosition.left=!fabPosition.left" />
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
		CheckYesterdayTask,
		FinishTaskOrNot,
		GetData,
		GetLabels,
		HideOrShowLabel,
		IdOfLableNamed,
		RemoveLabel,
		IdOfBin,
		RemoveOrRecoverTask,
		RemoveOrRecoverHabit,
		CheckContinuousDays,
		GetTaskLabels
	} from '../api/Index';
	import {
		delayToRun,
		onlyDate,
		isBaseDayLabel,
		timeWithoutSeconds,
		TaskState,
		dateEquals,
		getDateStr,
		loading,
		isStateLabel,
		dateGE,
		isBaseLabel,
		TaskReminderKey,
		HabitReminderKey,
		CurrentAudioKey,
		ValueText,
		CurrentFinsihAudioKey
	} from '../module/Common';
	import {
		imgSrc
	} from '../module/Request';
	import {
		FinishOrNot,
		GetHabitRecords,
		GetHabitReminders
	} from '../api/Habit';
	import {
		GetTaskReminders
	} from '../api/Task';

	const pattern = ref({
		color: '#7A7E83',
		backgroundColor: '#fff',
		buttonColor: '#007AFF',
		iconColor: '#fff'
	});

	const fabPosition = ref({
		left: false,
		value: function() {
			return this.left ? "left" : "right";
		}
	});

	const today = ref(onlyDate(new Date()));
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
		optionMostCheck: false,
		model: {
			task: "0",
			habit: "0"
		}
	});

	const indexTaskEditor = ref(null);
	const indexHabitDetail = ref(null);
	const indexLabelEditor = ref(null);
	const labelDrawer = ref(null);
	const currentLabel = ref("current-label");
	const todayLabel = ref({
		labelId: 1,
		labelName: "今天",
		isList: true,
		icon: "today.png"
	});

	onMounted(() => {
		const user = uni.getStorageSync("user");
		state.user.id = user.uid;
		state.user.avatar = user.avatar;
		state.user.nickname = user.nickname;

		state.labelsExpandStyle = "-webkit-transform: rotateZ(90deg);";

		var label = uni.getStorageSync(currentLabel.value);
		if (label == null || label == '')
			label = todayLabel.value;
		state.currentLabel = label;
		getData(label.labelId);

		getLabels();
		checkYesterdayTask();
		checkContinuousDays();

		var audio = uni.getStorageSync(CurrentAudioKey);
		if (audio == "" || audio == null) {
			audio = new ValueText(0, "无");
			uni.setStorageSync(CurrentAudioKey, audio);
		}
		var finishAudio = uni.getStorageSync(CurrentFinsihAudioKey);
		if(finishAudio == "" || finishAudio==null)
		{
			finishAudio = new ValueText(0,"无");
			uni.setStorageSync(CurrentFinsihAudioKey,finishAudio);
		}
	});

	function checkYesterdayTask() {
		const today = new Date();
		const yesterday = onlyDate(new Date(today.setDate(today.getDate() - 1)));
		CheckYesterdayTask(state.user.id, yesterday, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
		});
	}

	function checkContinuousDays() {
		const yesterday = onlyDate(new Date());
		yesterday.setDate(yesterday.getDate()-1);
		CheckContinuousDays(state.user.id, yesterday, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
		});
	}

	function openTaskEditor(index) {
		if (isStateLabel(state.currentLabel.labelId)) return;
		const task = state.data["task"][index];
		state.task = task;
		state.task.index = index;
		GetTaskReminders(task.instanceId, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			task.reminderInfoModels = res.data;
			for (let reminder of task.reminderInfoModels)
				reminder.timing = new Date(reminder.timing);
		});
		GetTaskLabels(state.user.id,task.instanceId,response=>{
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.task.labels = res.data.labels;
			state.task.list = res.data.list;
			openToEdit();
		});
		
	}

	function showMask(task) {
		const labelId = state.currentLabel.labelId;
		if (isBaseDayLabel(labelId))
			return task.state == TaskState.abondoned;
		if (isStateLabel(labelId))
			return dateGE(today.value, task.beginTime) && dateGE(today.value, task.endTime);
		return false;
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
			state.lists.push(label);
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
		const index = state.data["task"].findIndex(l => l.labelId == item.lableId);
		if (index < 0)
			state.labels.push(e.label);
		if (item.labelId == state.currentLabel.labelId)
			state.data["task"].push(item);
		uni.removeStorageSync(TaskReminderKey);
	}

	function taskUpdated(e) {
		const index = e.index;
		const item = e.item;

		if (item.labelId == null || item.labelId == state.currentLabel.labelId)
			state.data["task"][index] = item;
		else
			state.data["task"].splice(index, 1);
		uni.removeStorageSync(TaskReminderKey);
	}

	function taskRemoved(e) {
		state.data["task"].splice(e.index, 1);
		uni.removeStorageSync(TaskReminderKey);
	}

	function seeHabitDetail(index) {
		const habit = state.data["habit"][index];
		GetHabitReminders(habit.habitId, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			habit.oldGroupId = habit.groupId;
			habit.reminderModels = res.data;
			for (let reminder of habit.reminderModels)
				reminder.toDelete = false;
			GetHabitRecords(habit.habitId, response1 => {
				const res1 = response1.data;
				if (!res1.succeeded) {
					uni.showToast({
						title: res1.message,
						icon: "none"
					});
					return;
				}
				habit.records = res1.data;
				for (let record of habit.records)
					record.day = new Date(record.day);

				habit.index = index;
				state.habit = habit;
				state.show.habit = true;
				nextTick(() => indexHabitDetail.value.open());
			});
		});

	}

	function taskEditorClose() {
		delayToRun(() => {state.show.task = false;state.task=null;}, 150);
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
		const time = new Date(today.value);
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
			if (state.data['habit'] != undefined) {
				for (let habit of state.data['habit']) {
					habit.finishTime = new Date(habit.finishTime);
					habit.beginDate = new Date(habit.beginDate);
				}
			}

		});
	}

	function habitUpdated(e) {
		const index = e.index;
		const item = e.item;

		state.data["habit"][index] = item;
		uni.removeStorageSync(HabitReminderKey);
	}

	function habitRemoved(e) {
		state.data["habit"].splice(e.index, 1);
		uni.removeStorageSync(HabitReminderKey);
	}

	function habitFinished(e) {
		const item = e.item;
		const time = onlyDate(new Date());
		if (state.currentLabel.id == 2)
			time.setDate(time.getDate() + 1);
		else if (state.currentLabel.id == 3)
			time.setDate(time.getDate() - 1);
		const index = item.records.findIndex(r => r.day.getTime() == time.getTime());
		item.records[index].finished = true;
	}

	function hideOrShowLabel(index, isList, display) {
		const label = isList ? state.lists[index] : state.labels[index];
		HideOrShowLabel(label.labelId, display, response => {
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
			else {
				state.labels.splice(index, 1);
				if (state.labels.length == 0)
					state.labelsExpand = false;
			}

		});
	}

	function removeLabel(index, isList) {
		const label = isList ? state.lists[index] : state.labels[index];
		RemoveLabel(label.labelId, response => {
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
			if(label.labelId!=state.currentLabel.labelId)return;
			state.currentLabel = todayLabel.value;
			uni.setStorage({
				key: currentLabel.value,
				data: state.currentLabel,
				success: () => {
					getData(state.currentLabel.labelId);
					labelDrawer.value.close();
				}
			});
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

	function createdLabel(e) {
		const label = e.label;
		const labelId = label.labelId;
		const index = state.labels.findIndex(l => l.labelId == labelId);
		if (index < 0)
			state.labels.push(label);
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

		if (dateEquals(beginTime, endTime) && dateEquals(beginTime, time))
			res =
			`<text style="color:rgb(0,75,235)">${timeWithoutSeconds(beginTime)}</text><text style="color:red">${timeWithoutSeconds(endTime)}</text>`;
		else if (dateEquals(beginTime, time) && !dateEquals(endTime, time))
			res =
			`<text style="text-align:center">开始</text><text style="color:rgb(0,75,235)">${timeWithoutSeconds(beginTime)}</text>`;
		else if (!dateEquals(beginTime, time) && dateEquals(endTime, time))
			res =
			`<text style="text-align:center">结束</text><text style="color:rgb(0,75,235)">${timeWithoutSeconds(endTime)}</text>`;
		else if (onlyDate(endTime).getTime() < time.getTime()) {
			if (!dateEquals(beginTime, endTime))
				res = `<text style="color:rgb(0,75,235)">${getDateStr(beginTime)}</text>
				     <text style="color:red">${getDateStr(endTime)}</text>`;
			else
				res = `<text style="font-size:15px">${getDateStr(endTime)}</text>`

		} else
			res = "<text>全天</text>"
		return res;
	}

	function finishTaskOrNot(index) {
		const task = state.data["task"][index];
		var taskState;
		if (task.state == TaskState.finished)
			taskState = TaskState.unfinished;
		else taskState = TaskState.finished;
		FinishTaskOrNot(task.instanceId, taskState, response => {
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

	function finishHabit(index) {
		const time = onlyDate(new Date());
		if (state.currentLabel.id == 2)
			time.setDate(time.getDate() + 1);
		else if (state.currentLabel.id == 3)
			time.setDate(time.getDate() - 1);
		const habit = state.data['habit'][index];
		const record = {
			finished: true,
			day: time,
			finishTime: new Date(),
			habitId: habit.habitId
		};

		FinishOrNot(record, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			habit.finished = true;
			habit.finishTime = record.finishTime;
			recordFinish(habit, res.data);
		});
	}

	function unfinishHabit(habit) {
		const time = onlyDate(new Date());
		if (state.currentLabel.id == 2)
			time.setDate(time.getDate() + 1);
		else if (state.currentLabel.id == 3)
			time.setDate(time.getDate() - 1);

		const record = {
			finished: false,
			day: time,
			finishTime: null,
			habitId: habit.habitId
		};
		FinishOrNot(record, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			habit.finished = false;
			habit.finishTime = record.finishTime;
			recordFinish(habit, res.data);
		});
	}

	function recordFinish(habit, data) {
		habit.persistDays = data.persistDays;
		habit.mostDays = data.mostDays;
		habit.continuousDays = data.continuousDays;
	}

	function switchContent(label) {
		if (label.lableId == IdOfLableNamed) return;
		state.currentLabel = label;
		uni.setStorageSync(currentLabel.value, label);
		loading("", () => {
			labelDrawer.value.close();
			getData(label.labelId);
		}, 500);
	}

	function seeHiddenLabels() {
		uni.navigateTo({
			url: "/pages/hiddenLabel"
		});
	}

	function goToSelfInfo() {
		uni.navigateTo({
			url: "/pages/userInfo"
		});
	}

	function removeOrRecoverTask(index, isRemove) {
		const task = state.data['task'][index];
		RemoveOrRecoverTask(task.instanceId, isRemove, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.data['task'].splice(index, 1);
		});
	}

	function removeTask(index) {
		removeOrRecoverTask(index, true);
	}

	function recoverTask(index) {
		removeOrRecoverTask(index, false);
	}

	function removeOrRecoverHabit(index, isRemove) {
		const habit = state.data['habit'][index];
		RemoveOrRecoverHabit(habit.habitId, isRemove, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.data['habit'].splice(index, 1);
		});
	}

	function removeHabit(index) {
		removeOrRecoverHabit(index, true);
	}

	function recoverHabit(index) {
		removeOrRecoverHabit(index, false);
	}
</script>

<style>
	#index {
		position: relative;
		height: 96vh;
		width: 100%;
		padding: 2%;
		/*#ifdef H5*/
		padding-top: 2vh;
		/*#endif
		/*#ifndef H5*/
		padding-top: 3vh;
		/*#endif*/
	}


	#task-labels {
		position: relative;
		height: 94vh;
		width: 60vw;
		padding: 1%;
		display: flex;
		align-items: center;
		flex-direction: column;
		/*#ifndef H5*/
		padding-top: 3.5vh;
		/*#endif*/
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
		/*#ifdef APP-PLUS*/
		margin-left: 2px;
		margin-right: 2px;
		/*#endif*/
		/*#ifdef H5*/
		margin-left: 4px;
		margin-right: 4px;
		/*#endif*/
		color: rgb(0, 75, 235)
	}

	#task-labels .text {
		font-size: 13px;
		margin-left: 6%;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		width: 80px;
	}

	#task-labels .label-info .right {
		position: absolute;
		right: -2%;
		transition: transform 150ms;
	}

	#task-labels .label-icon {
		width: 25px;
		height: 25px;
	}

	#task-labels .labels {
		width: 94%;
		height: 84vh;
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

	#index .index-content .header {
		display: flex;
		align-items: center;
	}

	#index .mask {
		height: 100%;
		width: 100%;
		position: absolute;
		z-index: -1;
		background-color: rgba(0, 0, 0, 0.25);
	}

	#index .item-title .text {
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
	}

	#index .task-content {
		display: flex;
		position: relative;
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
		padding-right: 3%;
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

	#index .habit {
		display: flex;
		flex-flow: column nowrap;
		margin-top: 2%;
		margin-bottom: 1%;
		padding-right: 3%;
	}

	#index .habit .info {
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


	#index .habit .finishBtn {
		position: relative;
		border: none;
		color: white;
		background-color: rgb(0, 255, 0);
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 7px;
		width: 60px;
	}

	#index .close {
		margin-left: 1%;
		margin-right: 1%;
	}
</style>