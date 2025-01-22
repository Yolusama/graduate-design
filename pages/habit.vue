<template>
	<view id="habit">
		<!--#ifdef H5-->
		<view class="center" style="padding: 2%;">
			<k-time-counter ref="counter"></k-time-counter>
		</view>
		<!--#endif-->
		<!--#ifdef H5-->
		<k-calendar :unchangalbe="true" @onChange="dateChange" style="top:0;height: 120px;">
			<!--#endif-->
			<!--#ifndef H5-->
			<k-calendar :unchangable="true" @onChange="dateChange" style="top:4vh;height: 120px;">
				<!--#endif-->
			</k-calendar>
			<scroll-view class="content" :scroll-y="true">
				<uni-collapse class="habit" v-for="(data,groupName) in state.data" :key="groupName">
					<uni-collapse-item title-border="none" :show-animation="false">
						<template v-slot:title>
							<view style="display:flex;align-items: center;justify-content: space-between;">
								<text class="title-text">{{groupName}}</text>
								<text style="font-size: 12px;color:gray">{{data.length}}</text>
							</view>
						</template>
						<scroll-view :scroll-y="true" style="max-height:30vh;height:fit-content;">
							<view v-for="(habit,index) in data" style="display: flex;flex-flow: column nowrap;"
								:key="index">
								<uni-swipe-action>
									<uni-swipe-action-item :disabled="habit.finished">
										<template v-slot:right>
											<view class="finishBtn" @click.stop="
											state.selectedHabit=habit;finishHabit({finished:true})" >完成</view>
										</template>
										<view style="display: flex;justify-content: space-between;"
											@click="seeDetail(groupName,index)">
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

												{{dateEquals(habit.finishTime,state.selectedDay)?timeWithoutSeconds(habit.finishTime):
								  getDateStr(habit.finishTime)}}&nbsp;
												完成</text>
											<!--#ifndef H5-->
											<text @tap="unfinishHabit($event,habit)">
												<uni-icons type="close" color="red" :size="20"></uni-icons>
											</text>
											<!--#endif-->
											<!--#ifdef H5-->
											<text @click="unfinishHabit($event,habit)">
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
			</scroll-view>
			<uni-popup type="right" ref="popup" background-color="#fff" style="z-index:101" @change="popupClose">
				<scroll-view class="habit-edit" scroll-y="true">
					<view class="header">
						<uni-icons type="left" @click="closePopup" class="close" :size="25"></uni-icons>
						<text style="font-weight: 600;">{{state.isHabitUpdate?"习惯内容更新":"添加新习惯"}}</text>
						<uni-icons type="checkmarkempty"
							:style="state.canAddHabit||state.isHabitUpdate?'':'color:lightgray'" :size="25"
							class="create" @click="editHabit"></uni-icons>
					</view>
					<view class="habit-item">
						<view>
							<uni-icons type="info" :size="20"></uni-icons>
							<text>习惯图标与名称</text>
						</view>
						<view class="info">
							<image style="width: 30px;height: 30px;border-radius:50%;" :src="state.thumbShow"
								@click="thumbPopup.open();"></image>
							<view style="width: 40%;margin-left:3px;">
								<uni-easyinput v-model="state.habit.name" placeholder="习惯名称" @input="habitNameInput">
								</uni-easyinput>
							</view>
						</view>
					</view>
					<view class="habit-item">
						<uni-list :border="true" style="width: 96%;">
							<uni-list-item>
								<template v-slot:body>
									<view class="between">
										<view class="info">
											<image src="../static/time.png" style="height: 20px;width: 20px;"></image>
											<text>开始日期</text>
										</view>

										<picker mode="date"  @change="selectBeginDate">
											{{getDateStr(state.habit.beginDate)}}
										</picker>
									</view>
								</template>
							</uni-list-item>
							<uni-list-item show-arrow>
								<template v-slot:body>
									<view class="between">
										<view class="info">
											<uni-icons type="medal" :size="24"></uni-icons>
											<text>坚持天数</text>
										</view>
										<text v-if="state.persistDaysIndex!=state.persistDays.length"
											@click="persistPopup.open()">
											{{state.persistDays[state.persistDaysIndex].text}}
										</text>
										<text v-if="state.persistDaysIndex==state.persistDays.length"
											@click="persistPopup.open()">
											{{state.habit.aimDays}}天
										</text>
									</view>
								</template>
							</uni-list-item>
						</uni-list>
					</view>
					<view class="habit-item">
						<view class="center">
							<image src="../static/notifaction.png" class="img"></image>
							<text class="notify-text">提醒</text>
						</view>
						<scroll-view class="group" :scroll-x="true">
							<view v-for="(reminder,index) in state.habit.reminderModels" :key="index" class="group-item"
								v-show="!reminder.toDelete">
								<uni-icons type="closeempty" :size="10" class="remove-reminder" color="red"
									@click="removeReminder(index)"></uni-icons>
								<picker mode="time" @change="setReminderTime($event,reminder)"
									:value="timeWithoutSeconds(state.selectedDay)">
									{{reminder.time}}
								</picker>
							</view>
							<view class="extra">
								<picker mode="time" @change="editReminderTime" :value="timeWithoutSeconds(new Date())">
									<uni-icons type="plusempty" color="rgb(0,75,235)"></uni-icons>
									<text>提醒</text>
								</picker>
							</view>
						</scroll-view>
					</view>
					<view class="habit-item">
						<view class="center" style="position: relative;">
							<image src="../static/group.png" class="img"></image>
							<text class="notify-text">分组</text>
							<uni-icons type="plusempty" class="add" @click="groupPopup.open()"></uni-icons>
						</view>
						<!--大坑，水平滚动需要设置enable-flex:true,子元素使用行内块元素-->
						<scroll-view class="group" :scroll-x="true" :enable-flex="true">
							<uni-tag :inverted="state.groupCode!=group.code" type="primary"
								style="margin-left: 4px;font-size: 15px;display: inline-block;"
								v-for="(group,index) in state.groups" :text="group.name" :key="index"
								@click="takeGroup(group)">
							</uni-tag>
						</scroll-view>
					</view>

					<view class="frequecnySet">
						<view class="frequency">
							<image src="../static/frequency.png" class="img"></image>
							<text class="notify-text" style="margin-left: 4px;">频率设置</text>
						</view>
						<k-radio-group :data="state.frequency.data" v-model="state.frequency.selcection"
							@onChange="resetSomeData">
						</k-radio-group>
						<uni-data-checkbox mode="tag" v-if="state.frequency.selcection==0" :localdata="state.weekDays"
							@change="takeDays" :multiple="true" v-model="state.frequency.selected">
						</uni-data-checkbox>
						<view class="picker" v-if="state.frequency.selcection==1">
							<text>每周</text>
							<picker-view @change="takeWeekPersistDays" style="height: 100%;width: 30px;"
								:value="[!state.isHabitUpdate?0:state.habit.weekPersistDays-1]">
								<picker-view-column>
									<view v-for="(number,index) in [1,2,3,4,5,6,7]" :key="index" class="picker-inner">
										{{number}}
									</view>
								</picker-view-column>
							</picker-view>
							<text>天</text>
						</view>
						<view class="picker" v-if="state.frequency.selcection==2">
							<text>每</text>
							<picker-view @change="takePeriod" style="height: 100%;width: 30px;"
								:value="[!state.isHabitUpdate?0:state.habit.period-1]">
								<picker-view-column>
									<view v-for="(number,index) in state.dayNumbers" :key="index" class="picker-inner">
										{{number}}
									</view>
								</picker-view-column>
							</picker-view>
							<text>天</text>
						</view>
					</view>
					<view class="habit-item">
						<view style="margin-bottom: 3px;">
							<uni-icons type="bars" :size="20"></uni-icons>
							<text>习惯描述语</text>
						</view>
						<uni-easyinput type="textarea" v-model="state.habit.description" :rows="3">

						</uni-easyinput>
					</view>
				</scroll-view>
			</uni-popup>
			<uni-popup type="center" background-color="#fff" ref="persistPopup" style="z-index:101;">
				<view style="padding: 1%;width:65vw">
					<k-radio-group :data="state.persistDays" v-model="state.persistDaysIndex" @onChange="takeAimDays"
						:containDef="true" style="width: 96%;"></k-radio-group>
					<uni-easyinput placeholder="1-1000" v-model="state.habit.aimDays" type="number" maxlength="4"
						@change="takePersistDays" v-if="state.persistDaysIndex==state.persistDays.length"
						style="margin-top:5px;margin-bottom: 5px;width:96%">
					</uni-easyinput>
				</view>
			</uni-popup>
			<uni-popup type="center" background-color="#fff" ref="thumbPopup" style="z-index:101;"
				@change="thumbPopupClose" border-radius="10px 10px 10px 10px">
				<uni-title type="h4" title="习惯图标"></uni-title>
				<view class="thumb-content">
					<view>
						<image class="thumb" :src="state.thumbShow" style="width: 42px;height: 42px;"></image>
					</view>
					<view class="thumbs">
						<image class="thumb" v-for="(thumb,index) in defaultThumbs" :key="index"
							:src="imgSrc(thumb.value)" @click="selectAsThumb(thumb)"></image>
					</view>
					<view>
						<uni-tag type="primary" text="上传图片" @click="toUpload"></uni-tag>
					</view>
					<view class="func-text">
						<text @click="takeHabitThumb" style="margin-right: 10px;">确定</text>
						<text @click="thumbPopup.close();">取消</text>
					</view>
				</view>
			</uni-popup>
			<uni-popup type="right" background-color="#fff" ref="groupPopup" style="z-index:101">
				<view class="header">
					<uni-icons type="left" @click="groupPopup.close()" class="close" :size="25"></uni-icons>
					<text style="font-weight: 600;">习惯分组</text>
					<view style="width: 40px;"></view>
				</view>
				<k-habit-group v-model="state.groups"></k-habit-group>
			</uni-popup>
			<uni-popup ref="detailPopup" type="right" background-color="#fff">
				<view class="detail" v-if="state.selectedHabit!=null">
					<view class="header">
						<uni-icons type="arrow-left" :size="25" @click="detailPopup.close()"></uni-icons>
						<view style="margin-right: 7px;">
							<uni-icons type="trash" :size="25" @click="removeHabit"></uni-icons>
							<uni-icons type="compose" :size="25" @click="toEdit" style="margin-left: 3vw;margin-right: 2%;"></uni-icons>
						</view>
					</view>
					<view class="detail-content">
						<text v-if="state.selectedHabit.finished" style="width:90%;
						text-align:right;color:red">已完成</text>
						<image class="background" :src="imgSrc(state.selectedHabit.thumb)"></image>
						<view class="detail-option">
							<text class="detail-title">{{state.selectedHabit.name}}</text>
							<text class="detail-descritpion" v-html="state.selectedHabit.description"></text>
							<k-swiper @finish="finishHabit" :height="60"
								v-if="!state.selectedHabit.finished"></k-swiper>
							<view class="content-show" v-if="state.selectedHabit.finished">
								<view class="show-content">
									<text>当前坚持</text>
									<text>{{state.selectedHabit.continuousDays}}天</text>
								</view>
								<view class="show-content">
									<text>最多坚持</text>
									<text>{{state.selectedHabit.mostDays}}天</text>
								</view>
								<view class="show-content">
									<text>已坚持</text>
									<text>{{state.selectedHabit.persistDays}}天</text>
								</view>
							</view>
						</view>
						<text @click="openRecord" class="open-record">习惯记录详情</text>
					</view>
				</view>
			</uni-popup>
			<uni-popup ref="recordPopup" background-color="aliceblue" type="right">
				<view class="record">
					<view class="header" style="width: 98%;">
						<uni-icons type="arrow-left" :size="25" @click="recordPopup.close()"></uni-icons>
					</view>
					<k-record-month class="record-calendar" v-model="state.selectedHabit.records"
						:current="state.selectedDay" :habitId="state.selectedHabit.habitId"
						:beginDate="state.selectedHabit.beginDate" @select="recordFinish"
						:continuousDays="state.selectedHabit.continuousDays" :mostDays="state.selectedHabit.mostDays"
						:persistDays="state.selectedHabit.persistDays" :frequency="{
							days:state.selectedHabit.days,
							weekPersistDays:state.selectedHabit.weekPersistDays,
							period:state.selectedHabit.period
						}">
					</k-record-month>
				</view>
			</uni-popup>
			<uni-fab vertical="bottom" :pattern="pattern" :pop-menu="false" horizontal="right" @fabClick="openToEdit" />
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		nextTick
	} from "vue";
	import {
		HabitReminder,
		PageOption,
		ValueText,
		copy,
		getDateStr,
		loading,
		onlyDate,
		persistDays,
		timeWithoutSeconds,
		weekdays,
		getDateTimeStr,
		CalendarDisplayWay,
		dateEquals,
		invalidEvent,
		HabitReminderKey
	} from "../module/Common";
	import {
		user
	} from "../api/User";
	import {
		CreateGroup,
		CreateHabit,
		FinishOrNot,
		GetDefaultThumbs,
		GetHabitGroups,
		GetHabitRecords,
		GetHabitReminders,
		GetHabits,
		RemoveHabit,
		UpdateHabit,
		UploadThumb
	} from "../api/Habit";
	import {
		imgSrc
	} from "../module/Request";
	const counter = ref(null);
	const popup = ref(null);
	const persistPopup = ref(null);
	const thumbPopup = ref(null);
	const groupPopup = ref(null);
	const detailPopup = ref(null);
	const recordPopup = ref(null);
	const today = ref(new Date());
	const habitOption = ref(new PageOption(1, 1000, 0));
	const defaultThumbs = ref([]);
	const pattern = ref({
		color: "#7A7E83",
		backgroundColor: "yellow",
		selectedColor: "#007AFF",
		buttonColor: "#007AFF",
		iconColor: '#fff'
	});
	const state = reactive({
		habit: {
			userId: "",
			thumb: "habit.png",
			name: "",
			beginDate: "",
			reminderModels: [],
			days: null,
			period: null,
			weekPersistDays: null,
			groupId: 1,
			description: "",
			aimDays: -1,
			recordDay: ""
		},
		groups: [],
		selectedDay: new Date(today.value.setMilliseconds(0)),
		canAddHabit: false,
		isHabitUpdate: false,
		persistDays: persistDays,
		persistDaysIndex: 0,
		frequency: {
			data: [new ValueText(0, "每周"), new ValueText(1, "每周几天"), new ValueText(2, "每隔几天")],
			selcection: 0,
			weekDays: [],
			selected: [0, 1, 2, 3, 4, 5, 6]
		},
		weekDays: [],
		dayNumbers: [],
		thumbChangeCancelled: true,
		thumbShow: "",
		selectedThumb: "",
		selectedImgFile: null,
		groupName: "",
		groupAdd: false,
		selectedHabit: null,
		groupCode: 1,
		data: {},
		optionMostCheck: false
	});

	onMounted(() => {
		state.habit.beginDate = onlyDate(state.selectedDay);
		state.habit.userId = user == '' ? uni.getStorageSync("user").uid : user.uid;
		state.habit.recordDay = onlyDate(state.selectedDay);
		state.thumbShow = imgSrc(state.habit.thumb);
		fillWeekdays();
		for (let day of weekdays) {
			state.weekDays.push({
				key: day.key,
				value: day.value,
				text: day.text.substring(day.text.length - 1)
			});
		}
		for (let i = 1; i <= 99; i++)
			state.dayNumbers.push(i);
		getDefaultThumbs();
		getGroups();
		getData();
	});

	function reloadHabitModel() {
		state.habit.beginDate = onlyDate(state.selectedDay);
		state.habit.recordDay = onlyDate(state.selectedDay);
		state.habit.groupId = state.groups[0].id;
		state.habit.aimDays = -1;
		state.habit.name = "";
		state.habit.reminderModels = [];
		state.habit.priority = 4;
		state.habit.thumb = "habit.png";
		state.thumbShow = imgSrc(state.habit.thumb);
		state.thumbChangeCancelled = true;
		state.selectedImgFile = null;
		state.habit.userId = user == '' ? uni.getStorageSync("user").uid : user.uid;
		state.habit.description = "";
		state.habit.days = null;
		state.habit.weekPersistDays = null;
		state.habit.period = null;
		state.groupCode = 1;
		state.frequency.selcection = 0;
		state.frequency.selcected = [0, 1, 2, 3, 4, 5, 6];
		fillWeekdays();
	}

	function seeDetail(groupName, index) {
		state.selectedHabit = state.data[groupName][index];
		if (state.selectedDay.getTime() > today.value.getTime() || state.selectedDay.getTime() < state.selectedHabit
			.beginDate
			.getTime())
			return;
		state.selectedHabit.index = index;
		state.thumbShow = imgSrc(state.selectedHabit.thumb);
		GetHabitReminders(state.selectedHabit.habitId, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			const reminders = res.data;
			for (let i = 0; i < reminders.length; i++)
				reminders[i].toDelete = false;
			state.selectedHabit.reminderModels = reminders;
			detailPopup.value.open();
		});
		GetHabitRecords(state.selectedHabit.habitId, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			for (let record of res.data)
				record.day = new Date(record.day);
			state.selectedHabit.records = res.data;
		});
	}

	function toEdit() {
		copy(state.selectedHabit, state.habit);
		state.groupCode = state.selectedHabit.groupCode;
		state.isHabitUpdate = true;
		if (state.selectedHabit.days != null) {
			state.frequency.selcection = 0;
			state.frequency.selected = [];
			for (let pro in state.selectedHabit.days)
				state.frequency.selected.push(state.selectedHabit.days[pro]);
		}
		if (state.selectedHabit.weekPersistDays != null)
			state.frequency.selcection = 1;
		if (state.selectedHabit.interval != null)
			state.frequency.selcection = 2;
		popup.value.open();
	}

	function habitNameInput(current) {
		state.canAddHabit = current.length > 0;
	}

	function dateChange(date) {
		state.selectedDay = onlyDate(date);
		getData();
	}

	function selectBeginDate(e) {
		const value = e.detail.value;
		state.habit.beginDate = new Date(value);
	}

	function editHabit() {
		if (!state.isHabitUpdate) {
			if (!state.canAddHabit) return;
			CreateHabit(state.habit, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
				} else {
					if (state.selectedImgFile == null) {
						afterCreating("", res.data, state.habit.thumb);
						return;
					}
					UploadThumb(state.selectedImgFile, res.data, null, response1 => {
						const res1 = JSON.parse(response1.data);
						if (!res1.succeeded) {
							uni.showToast({
								title: res1.message,
								icon: "none"
							});
							return;
						}
						afterCreating(res.message, res.data, res1.data);
					});
				}
			});
		} else {
			UpdateHabit(state.habit, response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
					return;
				}
				if (state.selectedImgFile == null)
					afterUpdating(res.data);
				else {
					UploadThumb(state.selectedImgFile, state.selectedHabit.habitId, state.habit.thumb,
						response1 => {
							const res1 = JSON.parse(response1.data);
							if (!res1.succeeded) {
								uni.showToast({
									title: res.message,
									icon: "none"
								});
								return;
							}
							res.data.thumb = res1.data;
							afterUpdating(res.data);
						});
				}
			});
		}
	}

	function afterCreating(msg, habitId, thumb) {
		loading(msg, () => {
			const item = {
				habitId: habitId,
				name: state.habit.name,
				thumb: thumb,
				persistDays: 0,
				groupName: state.groups.filter(g => g.id == state.habit
					.groupId)[0].name,
				beginDate: state.habit.beginDate
			};
			if (habitOption.value.data.length < habitOption.value.size) {
				habitOption.value.data.push(item);
				if (state.data[item.groupName] == undefined)
					state.data[item.groupName] = [item];
				else
					state.data[item.groupName].push(item);
			}
			uni.removeStorageSync(HabitReminderKey);
			popup.value.close();
		}, 750);
	}

	function afterUpdating(data) {
		data.beginDate = new Date(data.beginDate);
		const index = state.selectedHabit.index;
		state.selectedHabit = data;
		const groupName = state.groups.filter(g => g.id == state.selectedHabit
			.groupId)[0].name;
		state.data[groupName][index] = data;
		loading("", () => {
			popup.value.close();
			uni.removeStorageSync(HabitReminderKey);
			}, 500);
	}

	function openToEdit() {
		popup.value.open();
	}

	function closePopup() {
		popup.value.close();
		reloadHabitModel();
	}

	function takeGroup(group) {
		state.habit.groupId = group.id;
		state.groupCode = group.code;
	}


	function getData() {
		GetHabits(habitOption.value, state.habit.userId, state.selectedDay.getTime(), response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
			}
			habitOption.value.data = res.data.data;
			habitOption.value.total = res.data.total;
			dataReogrized();
		});
	}

	function getGroups() {
		GetHabitGroups(state.habit.userId, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.groups = res.data;
			state.habit.groupId = state.groups[0].id;
		});
	}

	function getDefaultThumbs() {
		GetDefaultThumbs(response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			defaultThumbs.value = res.data;
		});
	}

	function popupClose(e) {
		if (e.show) return;
		reloadHabitModel();
	}

	function setReminderTime(e, reminder) {
		const value = e.detail.value;
		reminder.time = value;
	}

	function removeReminder(index) {
		if (state.isHabitUpdate)
			state.habit.reminderModels[index].toDelete = true;
		else
			state.habit.reminderModels.splice(index, 1);
	}

	function editReminderTime(e) {
		const value = e.detail.value;
		const habitId = state.isHabitUpdate ? state.selectedHabit.habitId : null;
		const data = state.habit.reminderModels;
		if (data.length == 0)
			data.push(new HabitReminder(value, habitId));
		else {
			var i;
			const index = data.findIndex(r => r.time == value);
			for (i = 0; i < data.length; i++) {
				const dateStr =
					`${state.selectedDay.getFullYear()}-${state.selectedDay.getMonth()+1}-${state.selectedDay.getDate()} `;
				const date = new Date(dateStr + value);
				const current = new Date(dateStr + data[i].time);
				if (date.getTime() < current.getTime() && index < 0) {
					data.splice(i, 0, new HabitReminder(value, habitId));
					break;
				}
			}
			if (i == data.length && index < 0)
				data.push(new HabitReminder(value, habitId));	
		}
	}

	function takeAimDays(item) {
		state.habit.aimDays = state.persistDays[item.value].key;
		persistPopup.value.close();
	}

	function thumbPopupClose(e) {
		if (e.show || !state.thumbChangeCancelled) return;
		state.habit.thumb = "habit.png";
		state.habit.description = "";
		state.thumbShow = imgSrc(state.habit.thumb);
		state.selectedImgFile = null;
	}

	function selectAsThumb(thumb) {
		state.selectedThumb = thumb.value;
		state.thumbShow = imgSrc(thumb.value);
		if (state.habit.description.length == 0)
			state.habit.description = thumb.text;
	}

	function takeDays(e) {
		const value = e.detail.value;
		const days = new Map();
		for (let i = 0; i < value.length; i++) {
			days[weekdays[value[i]].key] = weekdays[value[i]].value;
		}
		state.habit.days = days;
	}

	function resetSomeData() {
		if (state.frequency.selcection == 0) {
			if (!state.isHabitUpdate) {
				fillWeekdays();
				state.frequency.selected = [0, 1, 2, 3, 4, 5, 6];
			} else {
				state.frequency.selected = [];
				for (let pro in state.selectedHabit.days)
					state.frequency.selected.push(state.selectedHabit.days[pro]);
			}
			state.habit.weekPersistDays = null;
			state.habit.period = null;
		} else if (state.frequency.selcection == 1) {
			if (state.isHabitUpdate) state.habit.weekPersistDays = state.selectedHabit.weekPersistDays;
			state.habit.days = null;
			state.habit.period = null;
		} else {
			if (state.isHabitUpdate) state.habit.period = state.selectedHabit.period;
			state.habit.days = null;
			state.habit.weekPersistDays = null;
		}
	}

	function fillWeekdays() {
		const days = new Map();
		for (let i = 0; i < weekdays.length; i++)
			days[weekdays[i].key] = weekdays[i].value;
		state.habit.days = days;
	}

	function takeWeekPersistDays(e) {
		state.habit.weekPersistDays = e.detail.value[0] + 1;
	}

	function takePeriod(e) {
		state.habit.period = e.detail.value[0] + 1;
	}

	function takeHabitThumb() {
		state.thumbChangeCancelled = false;
		if (state.selectedThumb.length > 0)
			state.habit.thumb = state.selectedThumb;
		thumbPopup.value.close();
	}

	function toUpload() {
		uni.chooseImage({
			count: 1,
			success: result => {
				const fileUrl = result.tempFilePaths[0];
				state.thumbShow = fileUrl;
				state.selectedImgFile = fileUrl;
			}
		});
	}

	function finishHabit(e) {
		const finished = e.finished;
		const model = {
			habitId:state.selectedHabit.habitId,
			finishTime: new Date(),
			finished: finished,
			day: onlyDate(state.selectedDay)
		};
		if (!model.finished && !state.selectedHabit.finished) return;
		FinishOrNot(model, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.selectedHabit.finished = finished;
			state.selectedHabit.finishTime = model.finishTime;
			recordFinish(res.data);
		});
	}

	function unfinishHabit(e, habit) {
		e.stopPropagation();
		state.selectedHabit = habit;
		FinishOrNot({
			habitId: habit.habitId,
			finished: false,
			day: onlyDate(state.selectedDay)
		}, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			habit.finished = false;
			recordFinish(res.data);
		});
	}

	function removeHabit() {
		uni.showModal({
			confirmText:"确定",
			cancelText:"取消",
			title:"删除习惯",
			content:"习惯将移至回收站",
			success:res=>{
				if(res.confirm){
					RemoveHabit(state.selectedHabit.habitId, response => {
						const res = response.data;
						if (!res.succeeded) {
							uni.showToast({
								title: res.message,
								icon: "none"
							});
							return;
						}
						habitOption.value.data.splice(state.selectedHabit.index, 1);
					});
				}
			}
		})
	}

	function openRecord() {
		recordPopup.value.open();
	}

	function dataReogrized() {
		const data = habitOption.value.data;
		state.data = {};
		for (let datum of data) {
			datum.beginDate = new Date(datum.beginDate);
			datum.finishTime = new Date(datum.finishTime);
			const groupName = datum.groupName;

			if (state.data[groupName] != undefined)
				state.data[groupName].push(datum);
			else {
				state.data[groupName] = [datum];
			}
		}
	}

	function recordFinish(data) {
		state.selectedHabit.persistDays = data.persistDays;
		state.selectedHabit.mostDays = data.mostDays;
		state.selectedHabit.continuousDays = data.continuousDays;
	}
</script>

<style scoped>
	#habit {
		position: relative;
		width: 100%;
		background-color: aliceblue;
	}

	#habit .content {
		position: relative;
		width: 100vw;
		height: 80vh;
		padding: 1.5%;
	}

	.habit-edit {
		position: relative;
		display: flex;
		flex-flow: column nowrap;
		width: 100vw;
		height: 90vh;
		/*#ifdef H5*/
		padding-top: 5px;
		/*#endif*/
		/*#ifndef H5*/
		padding-top: 5%;
		/*#endif*/
		background-color: aliceblue;
		align-items: center;
		font-size: 15px;
	}

	#habit .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 30px;
	}

	.habit-edit .header {
		width: 96%;
		height: fit-content;
	}

	.habit-edit .habit-item {
		background-color: #fff;
		width: 96%;
		/*#ifdef H5*/
		margin: 5px;
		/*#endif*/
		border-radius: 5px;
		padding: 1%
	}

	.habit-edit .habit-item .info {
		display: flex;
		justify-content: flex-start;
		margin-top: 8px;
		align-items: center;
	}

	.habit-edit .remove-reminder {
		position: absolute;
		right: -2px;
		top: -13px;
		z-index: 10;
	}

	.habit-edit .img {
		width: 20px;
		height: 20px;
	}

	.habit-edit .between {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: gray;
	}

	.habit-edit .between .info {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.habit-item .extra {
		display: inline-flex;
		color: rgb(0, 75, 235);
		font-size: 16px;
	}

	.habit-item .notify-text {
		margin-left: 3px;
		font-size: 15px;
	}

	.habit-item .group {
		display: flex;
		flex-flow: row nowrap;
		height: 50px;
		line-height: 50px;
		width: 100%;
		white-space: nowrap;
	}

	.habit-item .group-item {
		position: relative;
		display: inline-block;
		width: 50px;
		text-align: center;
		background-color: rgb(96%, 96%, 98%);
		height: 32px;
		border-radius: 6px;
		line-height: 32px;
		margin-right: 4px;
	}

	.habit-item .center .add,
	.habit-item .group .close {
		position: absolute;
		top: 1%;
		right: 1%;
	}

	#habit .frequency {
		display: flex;
		height: 40px;
		font-size: 16px;
		font-weight: 600;
		justify-content: flex-start;
		width: 90%;
	}

	#habit .frequecnySet {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		width: 96%;
		padding: 5px;
		height: 50vh;
		background-color: #fff;
		margin: 5px;
		border: 5px;
	}

	.frequecnySet .picker {
		display: flex;
		justify-content: center;
		width: 90%;
		height: 20vh;
		align-items: center;
		font-size: 18px;
		word-spacing: 2px;
	}

	.frequecnySet .picker-inner {
		width: 30px;
		text-align: center;
		line-height: 34px;
	}

	.thumb-content {
		display: flex;
		flex-direction: column;
		width: 80vw;
		height: 25vh;
		padding: 1%;
	}

	.thumb-content .thumbs {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap
	}

	.thumb-content .thumb {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		margin-right: 8px;
		margin-bottom: 4px;
	}

	#habit .func-text {
		font-size: 14px;
		color: rgb(0, 75, 235);
		display: flex;
		justify-content: flex-end;
		padding-right: 3%;
	}

	#habit .content .habit {
		position: relative;
		display: flex;
		border-radius: 8px;
		margin-bottom: 2%;
	}

	#habit .content .title-text {
		font-size: 14px;
		height: 40px !important;
		line-height: 40px;
		font-weight: 600;
		padding: 1%;
		color: rgb(12, 12, 13)
	}

	#habit .content .habit .info {
		display: flex;
		padding: 2%;
		font-size: 15px;
		align-items: center;
	}

	#habit .content .option {
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

	#habit .content .finish {
		display: flex;
		padding-left: 3%;
		height: 25px;
		line-height: 25px;
	}

	#habit .detail {
		width: 100vw;
		height: 96vh;
		padding-left: 1%;
		/*#ifdef H5*/
		padding-top: 5px;
		/*#endif*/
		/*#ifndef H5*/
		padding-top: 3vh;
		/*#endif*/
		background-color: cornsilk;
	}

	#habit .detail .detail-content {
		display: flex;
		position: relative;
		height: 100%;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		padding: 1%;
	}

	.detail .background {
		position: absolute;
		width: 90px;
		height: 90px;
		top: 20%;
	}

	.detail .detail-title,
	.detail .detail-descritpion {
		font-size: 18px;
		font-weight: 600;
		text-align: center;
		width: 100%;
	}

	.detail .detail-descritpion {
		display: block;
		width: 100%;
		font-size: 15px;
		font-weight: normal;
		text-wrap: wrap;
		text-align: center;
		text-indent: 2px;
		margin-top: 2%;
	}

	.detail .detail-option {
		display: flex;
		flex-direction: column;
		width: 80%;
		align-items: center;
		justify-content: center;
	}

	.detail-option .content-show {
		display: flex;
		margin-top: 4%;
	}

	.detail-option .show-content {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column nowrap;
		font-size: 18px;
		margin-left: 15px;
	}

	.open-record {
		color: rgb(0, 75, 235);
		margin-top: 2%;
	}

	#habit .record {
		display: flex;
		width: 100vw;
		height: 96vw;
		flex-direction: column;
		align-items: center;
		/*#ifndef H5*/
		padding-top: 3vh;
		/*#endif*/
	}

	.record .record-calendar {
		width: 90%;
		background-color: rgb(99%, 99%, 99%);
		border-radius: 10px;
		height: 220px;
	}
	
	#habit .finishBtn{
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