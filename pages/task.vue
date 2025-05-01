<template>
	<view id="task" :style="{backgroundColor:subject.backColor}">
		<uni-icons type="reload" :size="24" :color="subject.iconColor" @click="reloadTo('/pages/task')" class="fresh"></uni-icons>
		<k-calendar :showWay="state.showWay" @modeChange="modeChange" @onChange="dateChange"></k-calendar>
		<scroll-view class="content" v-if="state.showWay!=CalendarDisplayWay.year" :scroll-y="true">
			<view class="todo" v-for="(task,index) in taskPageOpt.data" :key="index" @click="seeTaskDetail(index)">
				<view class="mask" v-if="task.state==TaskState.abondoned"></view>
				<uni-swipe-action style="width: 100%;">
					<uni-swipe-action-item>
						<template v-slot:left>
							<view class="finishBtn" @click.stop="finishOrNot(task)"
								v-if="task.state==TaskState.unfinished">完成</view>
							<view class="finishBtn" @click.stop="finishOrNot(task)"
								style="background-color: red;width: 60px;" v-if="task.state==TaskState.finished">取消完成
							</view>
						</template>
						<view class="title">
							<checkbox-group @change="finishOrNot(task)">
								<checkbox :checked="task.state==TaskState.finished" style="transform:scale(0.7)" />
							</checkbox-group>
							<view class="time" v-html="beginEndTimeStr(task)">
							</view>
							<view style="display: flex;align-items: center;">
								<k-split :width="4" :height="18"></k-split>
								<text :class="'quadrant-'+task.priority" style="margin-right:3px">
									{{getPriorityText(task)}}
								</text>
								<view class="title-text">
									<view class="title-content">{{task.title}}</view>
									<view class="title-description">{{task.description}}</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</scroll-view>
	</view>
	<uni-popup type="right" ref="popup" :background-color="subject.backColor" @change="beforeClosePopup" style="z-index:101">
		<scroll-view class="popup" :scroll-y="true">
			<view class="header">
				<uni-icons type="closeempty" @click="popup.close()" class="close" :size="25"></uni-icons>
				<text :style="'font-weight: 600;color:'+subject.textColor">{{state.isTaskUpdate?"修改任务":"新建任务"}}</text>
				<uni-icons type="checkmarkempty" :style="state.canCreateTask?'':'color:lightgray'" :size="25"
					class="create" @click="editTask"></uni-icons>
			</view>
			<uni-list :border="true" style="width: 94%;">
				<uni-list-item :show-extra-icon="true" :extra-icon="{type:'bars'}">
					<template v-slot:body>
						<input type="text" v-model="state.task.title" placeholder="标题" maxlength="30"
							@input="titleInput">
					</template>
				</uni-list-item>
				<uni-list-item :show-extra-icon="true" :extra-icon="{type:'compose',size:'27'}">
					<template v-slot:body>
						<!--#ifndef APP-PLUS-->
						<textarea inputmode="text" v-model="state.task.description" placeholder="内容描述">
						</textarea>
						<!--#endif-->
						<!--#ifdef APP-PLUS-->
						<textarea v-model="state.task.description" placeholder="内容描述" />
						<!--#endif-->
					</template>
				</uni-list-item>
				<uni-list-item :show-extra-icon="true" :extra-icon="{type:'map',size:'22'}">
					<template v-slot:body>
						<view class="time">
							<text> 设置时间</text>
							<view style="font-size: 13px;">全天&nbsp;
								<switch @change="allDay" :checked="state.allday" style="transform: scale(0.8);">
								</switch>
							</view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item show-arrow>
					<template v-slot:body>
						<view class="time">
							<text>开始</text>
							<view style="display: flex;">
								<picker mode="date" :value="state.startTime.date" start="1970-01-01"
									@change="pick($event,'begin-date')" :disabled="state.allday">
									<text class="time-str">{{state.startTime.date}}</text>
								</picker>
								&nbsp;
								<picker mode="time" :value="state.startTime.time" :start="state.startTime.time"
									end="23:59" @change="pick($event,'begin-time')" :disabled="state.allday">
									<text class="time-str">{{state.startTime.time}}</text>
								</picker>
							</view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item show-arrow>
					<template v-slot:body>
						<view class="time">
							<text>结束</text>
							<view style="display: flex;">
								<picker mode="date" :value="state.endTime.date" start="1970-01-01"
									:disabled="state.allday" @change="pick($event,'end-date')">
									<text class="time-str"> {{state.endTime.date}}</text>
								</picker>
								&nbsp;
								<picker mode="time" :value="state.endTime.time" :start="state.endTime.time" end="23:59"
									@change="pick($event,'end-time')" :disabled="state.allday">
									<text class="time-str">{{state.endTime.time}}</text>
								</picker>
							</view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item show-arrow>
					<template v-slot:body>
						<view class="priority">
							<text>设置优先级</text>
							<view @click="priorityPopup.open()">
								<uni-icons type="gear"></uni-icons>
								<text style="font-size: 13px;color:rgb(0,75,213) ">
									{{state.priority[state.task.priority-1].text}}</text>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<uni-list :border="true" style="width: 94%;margin-top:5px;font-size: 15px;">
				<uni-list-item show-arrow="">
					<template v-slot:body>
						<view class="time">
							<view style="display: flex;align-items: center;">
								<image src="../static/flash.png" style="width: 24px;height: 24px;"></image>
								<text style="margin-left: 3px;">重复</text>
							</view>
							<view v-if="state.isTaskUpdate&&state.frequency.selection>0" @click="changeRepeatRule"
								size="mini" style="margin-left: 5px;font-size: 13px;">修改</view>
							<view @click="frequencyPopup.open()" class="def-text">
								{{getRuleText(state.task)}}
							</view>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item show-arrow>
					<template v-slot:body>
						<view class="time">
							<view>
								<uni-icons type="notification"></uni-icons>
								<text style="margin-left: 3px;">提醒</text>
							</view>
							<picker :range="state.notifyOpt" mode="multiSelector" @change="addReminderInfoModel"
								@columnchange="changeNotifyMode">
								<text class="def-text">设置提醒</text>
							</picker>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item v-for="(reminder,index) in state.task.reminderInfoModels" :key="index"
					class="notify-item">
					<template v-slot:body>
						<view style="display: flex;justify-content: space-between;width:100%">
							<text>{{ReminderInfo.getModeValueText(reminder)}}</text>
							<uni-icons type="closeempty" @click="removeReminder(index)"></uni-icons>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<uni-popup type="center" ref="frequencyPopup" :background-color="subject.backColor" border-radius="5px 5px 5px 5px"
				style="height: 75vh;">
				<k-radio-group :data="state.frequency.data" v-model="state.frequency.selection" :containDef="true"
					@onChange="notify">
				</k-radio-group>
			</uni-popup>
			<uni-popup ref="defRulePopup" type="center" :background-color="subject.backColor">
				<scroll-view :scroll-y="true" class="popup">
					<view class="header" style="justify-content: flex-start;"><uni-icons type="closeempty"
							@click="defRulePopup.close()"></uni-icons>
						<text style="font-weight: 600;margin-left:10%;">自定义</text>
					</view>
					<!--#ifdef APP-PLUS-->
					<picker mode="multiSelector" :range="state.frequency.multiData" :value="state.frequency.selectedOne"
						@change="multiSelect" style="font-size: 16px;margin:0 15px;">
						<!--#endif-->
						<!--#ifndef APP-PLUS-->
						<picker mode="multiSelector" :range="state.frequency.multiData"
							:value="state.frequency.selectedOne" @change="multiSelect"
							style="font-size: 16px;margin:15px 0;">
							<!--#endif-->
							<view class="def">
								<text>自定义：</text>
								<text
									style="font-size: 13px;color: gray;letter-spacing: 1px;">{{state.defOpt.text}}</text>
							</view>
							<k-radio-group :data="state.weekdays" :checkMode="true" @onChange="takeCustom"
								v-show="state.task.periodUnit==2">
							</k-radio-group>
						</picker>
						<uni-list style="width: 94%;">
							<uni-list-item show-arrow>
								<template v-slot:body>
									<view style="display: flex;justify-content: space-between;width: 100%;">
										<text>有效</text>
										<view style="display: flex;">
											<text class="def-text" style="margin-right: 5px;"
												@click="customPopup.open()">
												{{state.defOpt.mode}}
											</text>
											<picker mode="date" v-if="state.defOpt.val==1" :value="state.task.deadline"
												@change="takeDeadline">
												<text class="def-text">
													{{state.task.deadline==null?getDateStr(today):
											getDateStr(state.task.deadline)}}
												</text>
											</picker>

											<picker :range="state.frequency.counts" v-if="state.defOpt.val==2"
												@change="takeCount">
												<text class="def-text">{{state.task.count}}次</text>
											</picker>
										</view>
									</view>
								</template>
							</uni-list-item>
						</uni-list>
				</scroll-view>
			</uni-popup>
		</scroll-view>
	</uni-popup>
	<uni-popup :background-color="subject.backColor" ref="detailPopup" type="right">
		<scroll-view class="task-detail" v-if="state.selectedTask!=null" :scroll-y="true">
			<view class="header">
				<uni-icons type="closeempty" @click="closeDetailPopup" class="close" :size="25"></uni-icons>
				<text style="font-weight: 600;">查看/修改任务</text>
				<text>&nbsp;</text>
			</view>
			<view class="task-detail-title">{{state.selectedTask.title}}</view>
			<view v-html="'任务描述：'+state.selectedTask.description" class="description"></view>
			<view class="def-text">开始：{{getDateTimeStr(state.selectedTask.beginTime,today.getFullYear())}}</view>
			<view class="def-text">结束：{{getDateTimeStr(state.selectedTask.endTime,today.getFullYear())}}</view>
			<uni-list style="width:92%">
				<uni-list-item>
					<template v-slot:body>
						<view>
							<uni-icons type="notification"></uni-icons>
							<text style="margin-left: 3px;font-size: 14px;">提醒</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item v-for="(reminder,index) in state.selectedTask.reminderInfoModels" :key="index">
					<template v-slot:body>
						<view style="display: flex;justify-content: space-between;width:100%">
							<text style="height: 25px;line-height: 25px;font-size: 14px;color:rgb(0,75,213)">
								{{ReminderInfo.getModeValueText(reminder)}}
							</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:body>
						<view>
							<uni-icons type="loop"></uni-icons>
							<text class="repeat">
								{{getRuleText(state.selectedTask)}}
							</text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<view v-if="state.selectedTask.repeatable&&state.selectedTask.taskId==state.selectedTask.instanceId"
				class="tips">
				tips:重复任务下的主任务的“仅此任务”编辑模式只针对任务基本信息，编辑规则/提醒默认为全部
			</view>
			<view class="func">
				<view class="detail-func" @click="openEditUI">
					<uni-icons type="compose" :size="30"></uni-icons>
					<text>编辑</text>
				</view>
				<view class="detail-func" @click="state.isTaskCancel=true;openEditUI();">
					<uni-icons type="close" :size="30"></uni-icons>
					<text>取消</text>
				</view>
				<view class="detail-func" @click="state.isTaskRemove=true;openEditUI();">
					<uni-icons type="trash" :size="30"></uni-icons>
					<text>删除</text>
				</view>

			</view>
		</scroll-view>
	</uni-popup>
	<uni-popup type="center" :background-color="subject.backColor" border-radius="10px 10px 10px 10px" ref="priorityPopup"
		style="z-index:101">
		<k-radio-group :data="state.priority" v-model="state.task.priority" @onChange="priorityPopup.close()">
		</k-radio-group>
	</uni-popup>
	<uni-popup type="center" :background-color="subject.backColor" border-radius="10px 10px 10px 10px" ref="customPopup"
		style="z-index: 101;">
		<k-radio-group :data="state.defOpt.data" v-model="state.defOpt.val" @onChange="takeCustomMode">
		</k-radio-group>
	</uni-popup>
	<uni-popup type="center" :background-color="subject.backColor" border-radius="10px 10px 10px 10px" ref="editModePopup">
		<k-radio-group :data="state.modeContent" v-model="state.mode" @onChange="openEditOrRemoveTaskOrCancelTask">
		</k-radio-group>
	</uni-popup>

	<uni-fab vertical="bottom" :pattern="pattern" :pop-menu="false" :horizontal="fabPosition.value()"
		@fabClick="openToEdit" @longpress="fabPosition.left=!fabPosition.left" />
</template>

<script setup>
	import {
		reactive,
		ref,
		nextTick,
		onMounted
	} from "vue";
	import {
		timeWithoutSeconds,
		priority,
		delayToRun,
		frequency,
		CalendarDisplayWay,
		PageOption,
		dateEquals,
		weekdays,
		customDef,
		getDateStr,
		loading,
		copy,
		getDateTimeStr,
		remindModeValues,
		ReminderInfo,
		ValueText,
		getRuleText,
		dateGE,
		onlyDate,
		TaskState,
		TaskReminderKey,
		reloadTo
	} from "../module/Common";
	import {
		CreateTask,
		GetTasks,
		GetTaskReminders,
		CancelTask,
		AddReminder,
		RemoveReminder,
		UpdateTask,
		ChangeRepeatRule,
		FinishOrNot,
		FreshReminderTiming,
		RemoveTask
	} from "../api/Task.js"
	import {
		user
	} from "../api/User";
	import {
		onShow,
		onTabItemTap
	} from "@dcloudio/uni-app"
import { SubjectStyle, getSubject } from "../module/Subject";
	const popup = ref(null);
	const frequencyPopup = ref(null);
	const defRulePopup = ref(null);
	const detailPopup = ref(null);
	const priorityPopup = ref(null);
	const customPopup = ref(null);
	const editModePopup = ref(null);
	const today = ref(new Date());
	const taskPageOpt = ref(new PageOption(1, 100, 0));
	const pattern = ref({
		color: '#7A7E83',
		buttonColor: '#007AFF',
		iconColor: '#fff'
	});
	const fabPosition = ref({
		left: false,
		value: function() {
			return this.left ? "left" : "right";
		}
	});
	const subject = ref(new SubjectStyle());
	const state = reactive({
		showWay: CalendarDisplayWay.week,
		canCreateTask: false,
		task: {
			title: "",
			description: "",
			beginTime: "",
			endTime: "",
			priority: 4,
			reminderInfoModels: [],
			period: 0,
			periodUnit: 0,
			custom: null,
			deadline: null,
			count: 0,
			userId: user.uid,
			repeatable: false
		},
		startTime: {
			date: "",
			time: ""
		},
		endTime: {
			date: "",
			time: ""
		},
		allday: false,
		priority: priority,
		frequency: {
			data: frequency,
			multiData: [],
			selectedOne: [],
			selection: 0,
			counts: []
		},
		notifications: [],
		notifyIntervals: [],
		notifyOpt: [
			[],
			["分", "时", "天", "周", "月"]
		],
		weekdays: weekdays,
		defOpt: {
			data: [new ValueText(0, "一直"), new ValueText(1, "截止到"), new ValueText(2, "重复")],
			val: 0,
			modal: undefined,
			mode: "一直",
			text: ""
		},
		selectedDay: new Date(today.value),
		selectedTask: null,
		mode: -1,
		modeContent: [],
		isTaskUpdate: false,
		isTaskCancel: false,
		isTaskRemove: false
	});

	onShow(function() {
		if (user == '')
			state.task.userId = uni.getStorageSync("user").uid;
		else
			state.task.userId = user.uid;
		getData();
		subject.value = getSubject();
		pattern.value.buttonColor = subject.value.fabColor;
	});

	onMounted(() => {
		state.startTime.date = getDateStr(today.value);
		state.startTime.time = timeWithoutSeconds(today.value);
		const date = new Date(today.value);
		date.setHours(date.getHours() + 1);
		state.endTime.date = getDateStr(date);
		state.endTime.time = timeWithoutSeconds(date);
		const numbers = [];
		for (let i = 1; i <= 99; i++)
			numbers.push(i);
		state.frequency.multiData.push(numbers);
		state.frequency.multiData.push(["天", "周", "月", "年"]);
		const counts = [];
		for (let i = 1; i <= 1000; i++)
			counts.push(i);
		state.frequency.counts = counts;
		state.notifyOpt[0] = remindModeValues(1);
		state.task.beginTime = new Date(today.value);
		state.task.endTime = date;
		state.modeContent = [new ValueText(0, "全部重复任务"), new ValueText(1, "仅此任务"),
			new ValueText(2, "此任务及往后的任务")
		];
	});

	onTabItemTap(() => {
		nextTick(() => {
			detailPopup.value.close();
			frequencyPopup.value.close();
			defRulePopup.value.close();
			priorityPopup.value.close();
			customPopup.value.close();
			popup.value.close();
			editModePopup.value.close();
		});
	});

	function openToEdit() {
		popup.value.open();
	}

	function modeChange(way) {
		state.showWay = way;
	}

	function beforeClosePopup(e) {
		if (e.show) return;
		reloadTaskModel();
	}

	function reloadTaskModel() {
		for (let pro in state.task) {
			if (pro == "changed") continue;
			if (pro != "priority")
				state.task[pro] = "";
			else
				state.task[pro] = 4;
		}

		reloadStartEndTime();

		state.task.custom = null;
		state.task.deadline = null;
		state.frequency.defText = "不重复";
		state.frequency.selection = 0;
		state.defOpt.mode = "一直";
		state.defOpt.val = 0;
		state.task.period = 1;
		state.task.periodUnit = 1;
		state.task.count = 0;
		state.task.reminderInfoModels = [];
		state.task.userId = user == '' ? uni.getStorageSync("user").uid : user.uid;
		state.manualPopup = false;
		state.canCreateTask = false;
		state.isTaskUpdate = false;
		state.task.repeatable = false;
		state.mode = -1;
	}

	function reloadStartEndTime() {
		const temp = new Date(state.selectedDay);
		state.startTime.date = getDateStr(temp);
		state.startTime.time = timeWithoutSeconds(temp);

		const date = new Date(temp.setHours(temp.getHours() + 1));
		state.endTime.date = getDateStr(date);
		state.endTime.time = timeWithoutSeconds(date);

		state.task.beginTime = new Date(state.startTime.date + " " + state.startTime.time);
		state.task.endTime = new Date(state.endTime.date + " " + state.endTime.time);
	}

	function pick(event, sign) {
		const detail = event.detail;
		switch (sign) {
			case "begin-date":
				state.startTime.date = getDateStr(new Date(detail.value));
				break;
			case "begin-time":
				state.startTime.time = detail.value;
				break;
			case "end-date":
				state.endTime.date = getDateStr(new Date(detail.value));
				break;
			case "end-time":
				state.endTime.time = detail.value;
				break;
		}
		state.task.beginTime = new Date(state.startTime.date + " " + state.startTime.time);
		state.task.endTime = new Date(state.endTime.date + " " + state.endTime.time);
		if (state.task.beginTime.getTime() >= state.task.endTime.getTime()) {
			state.task.endTime = new Date(state.task.beginTime);
			state.task.endTime.setHours(state.task.endTime.getHours() + 1);
			state.endTime.date = getDateStr(state.task.endTime);
			state.endTime.time = timeWithoutSeconds(state.task.endTime);
		}
	}

	function allDay() {
		state.allday = !state.allday;
		if (state.allday) {
			state.endTime.time = "23:59";
			state.task.endTime = new Date(state.endTime.date + " " + state.endTime.time);
			state.task.endTime.setSeconds(59);
		} else {
			const date = new Date(state.startTime.date + " " + state.startTime.time);
			date.setHours(date.getHours() + 1);
			state.endTime.time = timeWithoutSeconds(date);
			state.task.endTime = date;
		}
	}

	function seeTaskDetail(index) {
		state.task.changed = () => false;
		const task = taskPageOpt.value.data[index];
		GetTaskReminders(task.instanceId, response => {
			const res = response.data;
			if (res.succeeded) {
				state.selectedTask = task;
				const notifications = res.data;
				for (let datum of notifications)
					datum.timing = new Date(datum.timing);
				state.selectedTask.reminderInfoModels = notifications;
				state.selectedTask.index = index;
				state.startTime.date = getDateStr(task.beginTime);
				state.startTime.time = timeWithoutSeconds(task.beginTime);
				state.endTime.date = getDateStr(task.endTime);
				state.endTime.time = timeWithoutSeconds(task.endTime);
				if (task.repeatable) {
					state.frequency.selection = task.custom == null ? state.selectedTask.periodUnit : 5;
					state.frequency.defText = task.custom != null || state.selectedTask.period > 1 ? "自定义" :
						frequency[state.selectedTask.periodUnit].text;
				}
				detailPopup.value.open();
			} else {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
			}
		});
	}

	function titleInput() {
		if (state.isTaskUpdate) return;
		state.canCreateTask = state.task.title.length > 0;
	}

	function editTask() {
		if (!state.isTaskUpdate) {
			if (!state.canCreateTask) return;
			CreateTask(state.task, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
				} else {
					const expire = 500;
					uni.showLoading({
						title: res.message,
						duration: expire
					});

					delayToRun(() => {
						uni.hideLoading();
						state.manualPopup = true;
						if (taskPageOpt.value.data.length < taskPageOpt.value.size) {
							const task = {};
							if (dateEquals(state.task.beginTime, state.selectedDay) && dateEquals(state
									.task
									.endTime, state.selectedDay)) {
								copy(state.task, task);
								task.taskId = res.data;
								task.instanceId = res.data;
								taskPageOpt.value.data.push(task);
								taskPageOpt.value.total++;
							}
						}
						popup.value.close();
						uni.removeStorageSync(TaskReminderKey);
					}, expire);
				}
			});
		} else
			updateTask();
	}

	function multiSelect(e) {
		const detail = e.detail;
		state.defOpt.text = "每" + state.frequency.multiData[0][detail.value[0]] +
			state.frequency.multiData[1][detail.value[1]];
		state.task.period = state.frequency.multiData[0][detail.value[0]];
		state.task.periodUnit = detail.value[1] + 1;
	}

	function addReminderInfoModel(e) {
		const data = state.task.reminderInfoModels;
		if (data.length == 5) {
			uni.showToast({
				title: "最多只能有五个提醒",
				icon: "none"
			});
			return;
		}
		const detail = e.detail;
		const indexes = detail.value;
		const mode = indexes[1] + 1;
		const value = state.notifyOpt[0][indexes[0]];
		const instance = ReminderInfo.getInstance(mode, value, state.task.beginTime);
		const func = () => {
			if (data.length == 0)
				data.push(instance);
			else {
				for (let i = 0; i < data.length; i++) {
					if (instance.timing.getTime() < data[i].timing.getTime()) {
						if (data.findIndex(e => e.timing == instance.timing) < 0)
							data.splice(i, 0, instance);
						break;
					}
				}
			}
		};
		if (state.isTaskUpdate) {
			instance.taskId = state.selectedTask.taskId;
			instance.instanceId = state.selectedTask.instanceId;
			if (state.selectedTask.taskId == state.selectedTask.instanceId && state.mode == 1)
				state.mode = 0;
			instance.taskBeginTime = state.selectedTask.beginTime;
			AddReminder(instance, state.mode, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
				} else {
					instance.reminderId = res.data;
					func();
					uni.removeStorageSync(TaskReminderKey);
				}
			});
		} else func();
	}

	function changeNotifyMode(e) {
		const detail = e.detail;
		if (detail.column == 1) {
			state.notifyOpt[0] = remindModeValues(detail.value + 1);
		}
	}

	function notify(e) {
		const value = e.value;
		if (state.isTaskUpdate && value == 0) {
			frequencyPopup.value.close();
			state.task.period = 0;
			return;
		}
		if (value < state.frequency.data.length) {
			state.task.repeatable = value > 0;
			state.task.period = 1;
			state.task.periodUnit = value;
			state.frequency.defText = state.frequency.data[value].text;
		} else {
			state.task.repeatable = true;
			state.task.period = 1;
			state.task.periodUnit = 1;
			state.defOpt.text = `每${1}日`
			defRulePopup.value.open();
		}
		frequencyPopup.value.close();
	}

	function takeCustom(e) {
		const data = e.value;
		state.task.custom = new Map();
		for (let value of data) {
			const item = state.weekdays[value];
			state.task.custom[item.key] = item.value;
		}
	}

	function takeCustomMode(e) {
		const value = e.value;
		state.defOpt.mode = state.defOpt.data[value].text;
		customPopup.value.close();
	}


	function takeCount(e) {
		state.task.count = e.detail.value + 1;
	}

	function takeDeadline(e) {
		const date = new Date(e.detail.value);
		state.task.deadline = date;
		if (date.getTime() <= state.task.beginTime.getTime() || (date.getTime() > state.task.beginTime.getTime() &&
				date.getTime() < state.task.endTime.getTime())) {
			uni.showToast({
				title: "选择的截止时间应大于开始和结束时间",
				icon: "none"
			});
		}
	}

	function dateChange(date) {
		state.selectedDay = date;
		getData();
		reloadStartEndTime();
	}

	function getData() {
		GetTasks(taskPageOpt.value, state.task.userId, state.selectedDay, getDataCallback);
	}

	function getDataCallback(response) {
		const res = response.data;
		if (!res.succeeded) {
			uni.showToast({
				title: res.message,
				icon: "none"
			});
		} else {
			taskPageOpt.value.data = res.data.data;
			taskPageOpt.value.total = res.data.total;

			for (let task of taskPageOpt.value.data) {
				task.beginTime = new Date(task.beginTime);
				task.endTime = new Date(task.endTime);
				if (!dateEquals(state.selectedDay, today.value) && task.deadline != null) {
					task.deadline = new Date(task.deadline);
				}
			}
			uni.removeStorageSync(TaskReminderKey);
		}
	}

	function updateTask() {
		FreshReminderTiming(state.selectedTask.instanceId, state.task.beginTime, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.task.instanceId = state.selectedTask.instanceId;
			state.task.taskId = state.selectedTask.taskId;
			state.task.repeatable = state.selectedTask.repeatable;
			if (state.task.title.length == 0)
				state.task.title = state.selectedTask.title;
			UpdateTask(state.task, state.mode, response1 => {
				const res1 = response1.data;
				if (!res1.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
				} else {
					if (dateEquals(state.task.beginTime, state.selectedDay) && dateEquals(state.task
							.endTime, state.selectedDay)) {
						for (let pro in state.task)
							state.selectedTask[pro] = state.task[pro];
					} else
						taskPageOpt.value.data.splice(state.selectedTask.index, 1);
					loading("", () => {
						popup.value.close();
						detailPopup.value.close();
						uni.removeStorageSync(TaskReminderKey);
					}, 500)
				}
			});

		});
	}

	function closeDetailPopup() {
		detailPopup.value.close();
	}

	function removeReminder(index) {
		const reminder = state.task.reminderInfoModels[index];
		if (!state.isTaskUpdate) {
			state.task.reminderInfoModels.splice(index, 1);
		} else {
			reminder.taskId = state.selectedTask.taskId;
			reminder.instanceId = state.selectedTask.instanceId;
			reminder.taskBeginTime = state.selectedTask.beginTime;
			if (state.selectedTask.taskId == state.selectedTask.instanceId && state.mode == 1)
				state.mode = 0;
			RemoveReminder(reminder, state.mode, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
				} else {
					state.task.reminderInfoModels.splice(index, 1);
					uni.removeStorageSync(TaskReminderKey);
				}
			});
		}
	}

	function openEditOrRemoveTaskOrCancelTask() {
		if (state.isTaskCancel) {
			CancelTask(state.selectedTask, state.mode, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
				} else {
					state.isTaskCancel = false;
					taskPageOpt.value.data.splice(state.selectedTask.index, 1);
					editModePopup.value.close();
					detailPopup.value.close();
				}
			});
			return;
		}
		if (state.isTaskRemove) {
			RemoveTask(state.selectedTask, state.mode, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
				} else {
					state.isTaskRemove = false;
					taskPageOpt.value.data.splice(state.selectedTask.index, 1);
					editModePopup.value.close();
					detailPopup.value.close();
				}
			});
			return;
		}
		copy(state.selectedTask, state.task);
		state.startTime.date = getDateStr(state.task.beginTime);
		state.startTime.time = timeWithoutSeconds(state.task.beginTime);
		state.endTime.date = getDateStr(state.task.endTime);
		state.endTime.time = timeWithoutSeconds(state.task.endTime);
		state.isTaskUpdate = true;
		state.canCreateTask = true;
		openToEdit();
		editModePopup.value.close();
	}

	function openEditUI() {
		if (!state.selectedTask.repeatable) {
			state.mode = 0;
			if (state.isTaskRemove) {
				uni.showModal({
					title: "移除到回收站",
					content: "是否移动回收站",
					confirmColor: "确定",
					cancelText: "取消",
					success: (res) => {
						if (res.cancel) return;
						openEditOrRemoveTaskOrCancelTask();
					}
				});
			} else if (state.isTaskCancel) {
				uni.showModal({
					title: "取消任务",
					content: "是否取消",
					confirmColor: "是",
					cancelText: "否",
					success: (res) => {
						if (res.cancel) return;
						openEditOrRemoveTaskOrCancelTask();
					}
				});
			} else {
				copy(state.selectedTask, state.task);
				state.isTaskUpdate = true;
				state.canCreateTask = true;
				openToEdit();
			}
		} else {
			if (state.selectedTask.taskId == state.selectedTask.instanceId)
				state.modeContent = [new ValueText(0, "全部重复任务"), new ValueText(1, "仅此任务")];
			else
				state.modeContent = [new ValueText(0, "全部重复任务"), new ValueText(1, "仅此任务"),
					new ValueText(2, "此任务及往后的任务")
				];
			editModePopup.value.open();
		}
	}

	function beginEndTimeStr(task) {
		const beginTime = task.beginTime;
		const endTime = task.endTime;
		var res;
		if (dateEquals(beginTime, endTime))
			res = `<text>${timeWithoutSeconds(beginTime)}</text></text>${timeWithoutSeconds(endTime)}</text>`;
		else if (dateEquals(beginTime, state.selectedDay) && !dateEquals(beginTime, endTime))
			res = `<text style="color:rgb(0,75,225)">开始</text></text>${timeWithoutSeconds(beginTime)}</text>`;
		else if (dateEquals(endTime, state.selectedDay) && !dateEquals(beginTime, endTime))
			res = `<text text style="color:black">结束</text></text>${timeWithoutSeconds(endTime)}</text>`;
		else res = `<text text style="color:black">全天</text>`;
		return res;
	}

	function changeRepeatRule() {
		if (state.selectedTask.period == state.task.period && state.selectedTask.periodUnit == state.task.periodUnit &&
			state.selectedTask.deadline == state.task.deadline && state.selectedTask.count == state.task.count && state
			.selectedTask
			.custom == state.task.custom) return;
		ChangeRepeatRule({
			count: state.task.count,
			taskId: state.selectedTask.taskId,
			instanceId: state.selectedTask.instanceId,
			period: state.task.period,
			periodUnit: state.task.periodUnit,
			deadline: state.task.deadline,
			custom: state.task.custom,
			taskBeginTime: state.selectedTask.beginTime
		}, state.mode, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
			} else {
				uni.showToast({
					title: "已修改",
					icon: "none"
				});
				state.selectedTask.period = state.task.period;
				state.selectedTask.periodUnit = state.task.periodUnit;
				state.selectedTask.deadline = state.task.deadline;
				state.selectedTask.count = state.task.count;
				state.selectedTask.custom = state.task.custom
			}
		});
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

	function getPriorityText(task) {
		switch (task.priority) {
			case 1:
				return "Ⅰ";
			case 2:
				return "Ⅱ"
			case 3:
				return "Ⅲ";
			case 4:
				return "Ⅵ";
		}
	}
</script>

<style>
	#task {
		position: relative;
		padding: 3%;
		z-index: 1;
		height: 96vh;
		overflow: hidden;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.popup {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 94vh;
		padding-left: 5%;
		/*#ifndef H5*/
		padding-top: 4%;
		/*#endif*/
	}

	.popup .header,
	.task-detail .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 46px;
		width: 90%;
	}

	.popup .close {
		margin-left: 1%;
	}

	.popup .create {
		margin-right: 1%;
	}

	.popup .time,
	.popup .priority {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-size: 15px;
	}

	.popup .time-str {
		font-size: 13px;
		color: gray;
	}

	.popup .priority {
		height: 50px;
		position: relative;
	}

	.popup .notify {
		padding: 1%;
		width: 80vw;
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		padding: 1%;
	}

	.popup .notify-item {
		height: 30px;
		color: rgb(0, 129, 213);
		font-size: 13px;
	}

	.popup .radio {
		height: 30px;
		line-height: 30px;
	}

	.popup .def {
		display: flex;
		justify-content: space-between;
		width: 80vw;
		font-size: 15px;
	}

	.popup .def-text,
	.task-detail .def-text {
		font-size: 14px;
		color: gray;
	}

	.task-detail .def-text {
		margin-top: 4px;
	}

	.content .todo {
		position: relative;
		display: flex;
		align-items: center;
		height: 60px;
		border-radius: 8px;
		background-color: #fff;
		width: 100%;
		margin-bottom: 7px;
		z-index: 1;
	}

	.content .todo .title {
		display: flex;
		flex-flow: row nowrap;
		letter-spacing: 1px;
		align-items: center;
	}

	.content .todo .title .time {
		font-size: 12px;
		color: darkgray;
		display: flex;
		flex-flow: column nowrap;
	}

	.todo .title-text {
		display: flex;
		flex-direction: column;
		max-width: 70vw;
	}

	.todo .title-content {
		font-size: 14px;
		text-wrap: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
		font-weight: 600;
	}

	.todo .title-description {
		font-size: 12px;
		color: gray;
		text-wrap: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%
	}

	.task-detail {
		position: relative;
		display: flex;
		flex-flow: column nowrap;
		width: 100vw;
		height: 94vh;
		padding-left: 5%;
		/*#ifndef H5*/
		padding-top: 4%;
		/*#endif*/
	}

	.task-detail-title {
		width: 100%;
		text-align: center;
		font-size: 16px;
		font-weight: 600;
	}

	.task-detail .tips {
		font-size: 13px;
		color: darkgray;
	}

	.task-detail .func {
		position: absolute;
		bottom: 3vh;
		display: flex;
		width: 100%;
		justify-content: center;
	}

	.task-detail .repeat {
		font-size: 14px;
		color: gray;
	}

	.task-detail .detail-func {
		display: flex;
		flex-direction: column;
		font-size: 18px;
		color: black;
		margin: 2%;
	}

	.task-detail .description {
		text-align: left;
		text-wrap: wrap;
		font-size: 15px;
		line-height: 10px;
	}

	.todo .mask {
		height: 100%;
		width: 100%;
		position: absolute;
		z-index: -1;
		background-color: rgb(0, 0, 0, 0.25);
	}

	.todo .finishBtn {
		position: relative;
		border: none;
		color: white;
		background-color: rgb(0, 255, 0);
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 7px;
		width: 40px;
	}

	#task .fresh {
		/*#ifndef H5*/
		display: inline-block;
		margin-top: 3vh;
		/*#endif*/
	}
</style>