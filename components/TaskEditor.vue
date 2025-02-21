<template>
	<uni-popup ref="popup" type="bottom" background-color="#fff" @change="beforeEditorClose">
		<view class="task-edit">
			<view class="head">
				<text :class="'quadrant-'+state.task.priority" @click="priorityPopup.open()">
					{{state.priority[state.task.priority-1].text}}
				</text>
				<image src="../static/task.png" @click="timePopup.open()" class="image"></image>
				<image src="../static/plane.png" v-if="!state.canCreateTask&&!state.isTaskUpdate" :size="18"
					class="image" />
				<image src="../static/plane-filled.png" v-if="state.isTaskUpdate||state.canCreateTask" :size="18"
					class="image" @click="editTask" />
				<image :src="imgSrc(DefaultLabelIcon)" v-if="state.hasLabelSetter" @click="takeLabel" class="image">
				</image>
				<text class="label-text" v-if="state.hasLabelSetter" @click="listPopup.open()"
					style="background-color: cyan;">
					{{state.task.list!=null?state.task.list.labelName:"指定清单"}}
				</text>
				<uni-icons type="close" color="red" :size="18" v-if="state.isTaskUpdate" style="margin-left: 2%;"
					@click="removeTask"></uni-icons>
			</view>
			<uni-easyinput v-model="state.task.title" placeholder="标题" :focus="!state.isTaskUpdate"
				style="margin-bottom: 2px;margin-top: 3px;" @input="titleInput"></uni-easyinput>
			<uni-easyinput v-model="state.task.description" placeholder="描述" type="textarea" :rows="3"></uni-easyinput>
			<view v-if="state.hasLabelSetter" style="display: flex;flex-wrap: wrap;margin-top: 5px;">
				<text class="label-text" v-for="(label,index) in state.task.labels" :key="index">
					{{label.labelName}}
				</text>
			</view>
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
						<image src="../static/clock.png" class="image"></image>
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
				<image class="image" src="../static/flash.png"></image>
				<picker mode="multiSelector" :value="state.frequency.selected" @change="takeDef" :range="
				[state.frequency.multiData[0],state.frequency.multiData[1]]">
					{{getRuleText(state.task)}}
				</picker>
			</view>
			<uni-data-checkbox style="margin-bottom: 5px;" v-if="state.task.periodUnit==2" multiple @change="takeCustom"
				v-model="state.rule.selected" :localdata="state.weekdays" mode="tag">
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
						<view v-for="(number,index) in state.frequency.multiData[2]" :key="index" class="picker-inner">
							{{number}}
						</view>
					</picker-view-column>
				</picker-view>
				<text>次</text>
			</view>
		</scroll-view>
	</uni-popup>
	<uni-popup ref="labelPopup" background-color="#fff" border-radius="7px 8px 8px 7px" v-if="state.hasLabelSetter">
		<scroll-view scroll-y style="max-height: 40vh;">
			<view class="header">
				<uni-icons type="closeempty" @click="labelPopup.close()"></uni-icons>
			</view>
			<view class="label">
				<view style="width: 90%">
					<uni-easyinput placeholder="新标签" v-model="state.labelOpt.labelName"
						@change.once="createNewLabel"></uni-easyinput>
				</view>
				<uni-data-checkbox v-model="state.labelOpt.selected" :localdata="state.labelOpt.data" mode="tag"
					@change="changeTaskLabels" multiple></uni-data-checkbox>
			</view>
		</scroll-view>
	</uni-popup>
	<uni-popup ref="listPopup" background-color="#fff" border-radius="7px 8px 8px 7px" v-if="state.hasLabelSetter">
		<view class="list">
			<view class="header">
				<uni-icons type="closeempty" @click="listPopup.close()"></uni-icons>
			</view>
			<button @click="addList" style="margin-top: 2%;margin-bottom: 1%;height: 30px;line-height: 30px;"
				size="mini" type="primary">
				<uni-icons type="plusempty" color="white"></uni-icons>
				<text style="font-size: 13px;">添加清单</text>
			</button>
			<scroll-view scroll-y style="max-height: 34vh;">
				<view class="list-item" @click="changeTaskList(null)"
					:style="state.listOpt.selected==null?'background-color:rgb(25,25,24,.25)':''">
					<view style="display: flex;align-items: center;margin-left: 1%;">
						<image class="image" :src="imgSrc(DefaultListIcon)"></image>
						<text class="overflow">无</text>
					</view>
					<uni-icons type="checkmarkempty" v-if="state.listOpt.selected==null" :size="18" color="red"
						style="margin-right: 2%;"></uni-icons>
				</view>
				<view class="list-item" @click="changeTaskList(list)" v-for="(list,index) in userLists" :key="index"
					:style="state.listOpt.itemSelected(list)?'background-color:rgb(25,25,24,.25)':''">
					<view style="display: flex;align-items: center;margin-left: 1%;">
						<image class="image" :src="imgSrc(list.icon)"></image>
						<text class="overflow">{{list.labelName}}</text>
					</view>
					<uni-icons type="checkmarkempty" v-if="state.listOpt.itemSelected(list)" :size="18" color="red"
						style="margin-right: 2%;"></uni-icons>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script setup>
	import {
		onMounted,
		ref,
		reactive
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
		DefaultLabelIcon,
		isBaseDayLabel,
		isBaseLabel,
		DefaultListIcon
	} from '../module/Common';
	import {
		CreateTask,
		RemoveTask,
		FreshReminderTiming
	} from "../api/Task"
	import {
		UpdateTask
	} from '../api/FourQuadrants';
	import {
		user
	} from '../api/User';
	import {
		imgSrc
	} from '../module/Request';
	import {
		CreateList,
		CreateOrGetLabel,
		TakeTaskLabelsFor
	} from '../api/Index';


	const pros = defineProps({
		task: Object,
		isTaskUpdate: Boolean,
		labelSet: Boolean,
		userLabels: Array,
		userLists: Array,
		label: Object
	});
	const task = ref(pros.task);
	const label = ref(pros.label);
	const userLabels = ref(pros.userLabels);
	const userLists = ref(pros.userLists);
	const popup = ref(null);
	const timePopup = ref(null);
	const priorityPopup = ref(null);
	const defRulePopup = ref(null);
	const customPopup = ref(null);
	const labelPopup = ref(null);
	const listPopup = ref(null);

	const emits = defineEmits(["close", "created", "updated", "removed", "createdLabel"]);
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
		selectedDay: new Date(today.value),
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
		isTaskUpdate: pros.isTaskUpdate,
		hasLabelSetter: pros.labelSet,
		labelOpt: {
			data: [],
			selected: [],
			labelName: ""
		},
		listOpt: {
			itemSelected: function(list) {
				return this.selected != null && list != null && list.labelId == this.selected;
			},
			selected: null
		}
	});

	onMounted(() => {
		for (let i = 0; i < 4; i++)
			state.priority.push(new ValueText(i + 1, ""));
		state.priority[0].text = "Ⅰ " + priority[0].text;
		state.priority[1].text = "Ⅱ " + priority[1].text;
		state.priority[2].text = "Ⅲ " + priority[2].text;
		state.priority[3].text = "Ⅳ " + priority[3].text;

		for (let i = 1; i <= 99; i++)
			state.frequency.multiData[0].push(i);
		for (let i = 1; i <= 1000; i++)
			state.frequency.multiData[2].push(i);

		state.notifyOpt[0] = remindModeValues(1);
		if (task.value != undefined && task.value != null) {
			copy(task.value, state.task);
			startTime.value.date = getDateStr(task.value.beginTime);
			startTime.value.time = timeWithoutSeconds(task.value.beginTime);
			endTime.value.date = getDateStr(task.value.endTime);
			endTime.value.time = timeWithoutSeconds(task.value.endTime);
		}
		if (!state.isTaskUpdate)
			resetBeginEndTime();

		if (state.hasLabelSetter) {
			if (!state.isTaskUpdate && label.value != undefined) {
				if (label.value.isList) {
					if (!isBaseLabel(label.value.labelId)) {
						state.task.list = label.value;
						state.listOpt.selected = label.value.labelId;
					}
					state.task.labels = [];
				} else {
					state.labelOpt.selected.push(label.value.labelId);
					state.task.labels = [label.value];
					state.task.list = null;
					state.listOpt.selected = null;
				}
			}
			if (state.isTaskUpdate && state.task.list != null)
				state.listOpt.selected = state.task.list.labelId;
			for (let i = 0; i < userLabels.value.length; i++) {
				const label = userLabels.value[i];
				state.labelOpt.data.push(new ValueText(label.labelId, label.labelName));
				if (state.isTaskUpdate) {
					const index = state.task.labels.findIndex(l => l.labelId == label.labelId);
					if (index >= 0)
						state.labelOpt.selected.push(label.labelId);
				}
			}
		}
	});

	function beforeEditorClose(e) {
		if (e.show)
			return;
		emits("close");
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
		const values = e.detail.value;
		const reminder = ReminderInfo.getInstance(values[1] + 1, values[0] + 1, new Date(startTime.value.date + " " +
			startTime.value.time));
		if (reminder.mode == 1)
			reminder.value = values[0];

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
		if (state.isTaskUpdate) return;
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

	function createNewLabel(e) {
		if (e.trim().length == 0) return;
		const user = uni.getStorageSync("user");
		CreateOrGetLabel(state.labelOpt.labelName, user.uid, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			const data = res.data;
			const index = userLabels.value.findIndex(l => l.labelId == data.labelId);
			if (index < 0) {
				loading("", () => {
					state.labelOpt.labelName = "";
						userLabels.value.push(data);
						state.labelOpt.data.push(new ValueText(data.labelId, data.labelName));
						state.labelOpt.selected.push(data.labelId);
						state.task.labels.push(data);
						emits("createdLabel", {
							data: userLabels.value,
							isList: false
						});
				}, 750);
			}
			else
			    state.labelOpt.labelName = "";
		});
	}

	function changeTaskLabels() {
		const labels = [];
		for (let labelId of state.labelOpt.selected) {
			const label = userLabels.value.find(l => l.labelId == labelId);
			labels.push(label);
		}
		state.task.labels = labels;
	}

	function changeTaskList(list) {
		if (list == null) state.listOpt.selected = null;
		else state.listOpt.selected = list.labelId;
		state.task.list = list;
		listPopup.value.close();
	}


	function openToEdit() {
		popup.value.open();
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
					task.style = "";
					copy(state.task, task);
					const user = uni.getStorageSync("user");
					if (state.hasLabelSetter)
						TakeTaskLabelsFor(user.uid, state.task.instanceId, state.listOpt.selected, state
							.labelOpt.selected, false,
							response1 => {
								const res1 = response1.data;
								if (!res1.succeeded) {
									uni.showToast({
										title: res1.message,
										icon: "none"
									});
									return;
								}
								const arg = {
									item: task,
									list: state.task.list,
									labels: state.task.labels,
									labelSet: true
								};
								emits("created", arg);
								popup.value.close();
							});
					else {
						const arg = {
							item: task
						};
						emits("created", arg);
						popup.value.close();
					}
				}, 750);
			});
		} else {
			if (state.task.title.length == 0)
				state.task.title = "无标题";
			FreshReminderTiming(state.task.instanceId, state.task.beginTime, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
					return;
				}
				UpdateTask(state.task, response1 => {
					const res1 = response1.data;
					if (!res.succeeded) {
						uni.showToast({
							title: res1.message,
							icon: "none"
						});
						return;
					}
					loading("", () => {
						if (state.hasLabelSetter) {
							TakeTaskLabelsFor(user.uid, state.task.instanceId, state.listOpt
								.selected,
								state.labelOpt.selected, true,
								response1 => {
									const res1 = response1.data;
									if (!res1.succeeded) {
										uni.showToast({
											title: res1.message,
											icon: "none"
										});
										return;
									}
									emits("updated", {
										index: state.task.index,
										item: state.task,
										labels: state.task.labels,
										list: state.task.list
									});
									popup.value.close();
								});
							return;
						}
						emits("updated", {
							index: state.task.index,
							item: state.task
						});
						popup.value.close();
					}, 550);

				});
			});
		}
	}

	function removeTask() {
		RemoveTask(state.task, 1, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			loading("", () => {
				emits("removed", {
					index: state.task.index,
					priority: state.task.priority
				});
				popup.value.close();
			});
		});
	}

	function selectDay(date) {
		state.selectedDay = date;
		resetBeginEndTime();
		state.task.beginTime = new Date(`${startTime.value.date} ${startTime.value.time}`);
		state.task.endTime = new Date(`${endTime.value.date} ${endTime.value.time}`);
	}

	function openEditMode() {
		editModePopup.value.open();
	}

	function takeLabel() {
		labelPopup.value.open();
	}

	function addList() {
		uni.showModal({
			title: "添加清单",
			cancelText: "取消",
			confirmText: "确定",
			editable: true,
			placeholderText: "清单名",
			success: res => {
				if (res.cancel) return;
				const user = uni.getStorageSync("user");
				CreateList(user.uid, res.content, response => {
					const res = response.data;
					if (!res.succeeded) {
						uni.showToast({
							title: res.message,
							icon: "none"
						});
						return;
					}
					const newList = res.data;
					state.listOpt.selected = newList.labelId;
					state.task.list = newList;
					userLists.value.push(newList);
					emits("createdLabel", {
						data: newList,
						isList: true
					});
					listPopup.value.close();
				});
			}
		})
	}

	function open() {
		popup.value.open();
	}

	defineExpose({
		open
	});
</script>

<style scoped>
	.text-editor {
		position: relative;
		display: flex;
		width: 100%;
		background-color: aliceblue;
		height: 96vh;
		flex-flow: column nowrap;
		align-items: center;
	}

	.task-edit {
		position: relative;
		height: 45vh;
		padding: 1%;
	}

	.task-edit .label-text {
		height: 20px;
		line-height: 20px;
		padding: 4px;
		padding-top: 0;
		padding-bottom: 0;
		max-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		margin-left: 3px;
		background-color: rgb(0, 235, 75);
		color: white;
		border-radius: 7px;
		font-size: 13px;
		min-width: 20px;
		text-align: center;
	}

	.gray-text {
		font-size: 14px;
		color: gray;
	}

	.task-edit .head {
		padding: 2%;
		display: flex;
		align-items: center;
	}

	.head .image {
		width: 20px;
		height: 20px;
		margin-left: 5px;
	}

	.time {
		height: 40vh;
	}

	.time .image {
		width: 18px;
		height: 18px;
	}

	.time .select-datetime,
	.time .info {
		display: flex;
		font-size: 14px;
		color: gray;
	}

	/*#ifndef H5*/
	.time .select-datetime {
		font-size: 12px;
		height: 20px;
		line-height: 20px;
	}

	/*#endif*/
	.time .info {
		align-items: center;
	}

	.time .time-item {
		display: flex;
		justify-content: space-between;
		width: 100%;
		display: flex;
		font-size: 14px;
	}

	.custom {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 78vh;
		padding: 1%;
		width: 100vw;
	}

	.custom .head {
		display: flex;
		align-items: center;
		margin-top: 1%;
		margin-bottom: 1%;
		width: 100%;
	}

	.custom .picker {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1%;
		height: 30px;
	}

	.custom .picker .picker-inner {
		width: 20px;
		line-height: 32px;
		text-align: center;
	}

	.reminders {
		display: flex;
	}

	.reminder {
		position: relative;
		width: 70px;
		height: 30px;
		border-radius: 8px;
		margin-left: 2%;
		background-color: aliceblue;
	}

	.reminder .close {
		position: absolute;
		right: 0px;
		top: 0px;
		z-index: 6;
	}

	.reminder .reminder-text {
		display: block;
		color: rgb(0, 75, 235);
		height: 30px;
		line-height: 30px;
		width: 100%;
		text-align: center;
		font-size: 14px;
	}

	.label {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 72vw;
		height: 40vh;
	}

	.list {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 72vw;
		height: 45vh;
	}

	.list .header {
		width: 94%;
		margin-bottom: 1%;
	}

	.list .list-item {
		height: 35px;
		width: 92%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		margin-top: 1%;
		border-radius: 7px;
	}

	.list .list-item .image {
		width: 28px;
		height: 28px;
		margin-right: 4px;
	}

	.list .list-item .overflow {
		max-width: 60%;
		text-wrap: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 13px;
		color: rgb(0, 75, 235);
	}
</style>