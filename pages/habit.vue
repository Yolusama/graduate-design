<template>
	<view id="habit" :style="{backgroundColor:subject.backColor}">
		<!--#ifdef H5-->
		<view class="center" :style="'padding: 2%;color:'+subject.textColor">
			<k-time-counter ref="counter"></k-time-counter>
			<uni-icons type="reload" :size="24" @click="reloadTo('/page/habit')" :color="subject.iconColor" class="fresh" />
		</view>
		<!--#endif-->
		<!--#ifndef H5-->
		<uni-icons type="reload" :size="24" @click="reloadTo('/page/habit')" :color="subject.iconColor" class="fresh" />
		<!--#endif-->
		<!--#ifdef H5-->
		<k-calendar :unchangable="true" @onChange="dateChange" style="top:0;height: 120px;">
			<!--#endif-->
			<!--#ifndef H5-->
			<k-calendar :unchangable="true" @onChange="dateChange" style="top:0;height: 120px;">
				<!--#endif-->
			</k-calendar>
			<scroll-view class="content" :scroll-y="true">
				<uni-collapse class="habit" v-for="(data,groupName) in state.data" :key="groupName" accordion="true"
					v-model="state.model[groupName]">
					<uni-collapse-item title-border="none" :show-animation="false" v-if="data.length>0">
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
									<uni-swipe-action-item :disabled="habit.finished
									||onlyDate(today).getTime()<state.selectedDay.getTime()">
										<template v-slot:right>
											<view style="display: flex;align-items: center;">
												<view class="finishBtn" @click.stop="
											state.selectedHabit=habit;finishHabit({finished:true})">完成</view>
											</view>
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
			<habit-editor ref="editor" :habit="state.habit" v-if="state.show.editor" :isHabitUpate="state.habit!=null"
				@close="editorClose" @created="habitCreated" :subject="subject">
			</habit-editor>
			<habit-detail :habit="state.selectedHabit" ref="detail" @finished="habitFinished" v-if="state.show.detail"
				@updated="habitUpdated" @close="detailClose" @removed="habitRemoved" :date="state.selectedDay" :subject="subject">
			</habit-detail>
			<uni-fab vertical="bottom" :pattern="pattern" :pop-menu="false" :horizontal="fabPosition.value()"
				@fabClick="openToEdit" @longpress="fabPosition.left=!fabPosition.left" />
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		nextTick
	} from "vue";
	import {
		PageOption,
		onlyDate,
		timeWithoutSeconds,
		dateEquals,
		HabitReminderKey,
		delayToRun,
		getDateStr,
		reloadTo
	} from "../module/Common";
	import {
		GetHabits,
		FinishOrNot,
		GetHabitRecords,
		GetHabitReminders
	} from "../api/Habit";
	import {
		imgSrc
	} from "../module/Request";
	import {
		onShow,
		onTabItemTap
	} from "@dcloudio/uni-app"
import { SubjectStyle, getSubject } from "../module/Subject";
	const counter = ref(null);
	const editor = ref(null);
	const detail = ref(null);
	const habitOption = ref(new PageOption(1, 1000, 0));
	const today = ref(new Date());
	const pattern = ref({
		color: "#7A7E83",
		backgroundColor: "yellow",
		selectedColor: "#007AFF",
		buttonColor: "#007AFF",
		iconColor: '#fff'
	});
	const fabPosition = ref({
		left: false,
		value: function() {
			return this.left ? "left" : "right";
		}
	});
	const state = reactive({
		habit: null,
		selectedHabit: null,
		userId: "",
		data: {},
		optionMostCheck: false,
		show: {
			detail: false,
			editor: false
		},
		selectedDay: onlyDate(today.value),
		model: {}
	});
    const subject = ref(new SubjectStyle());
	onShow(() => {
		const user = uni.getStorageSync("user");
		state.userId = user.uid;
		getData();
		subject.value = getSubject();
		pattern.value.buttonColor = subject.value.fabColor;
	});

	onTabItemTap(() => {
		state.show.editor = false;
		state.show.detail = false;
	});

	function seeDetail(groupName, index) {
		if(onlyDate(today.value).getTime()<state.selectedDay.getTime())
		{
			uni.showToast({
				title:"现在还不能操作!",
				icon:"none"
			})
			return;
		}
		state.selectedHabit = state.data[groupName][index];
		if (state.selectedDay.getTime() < state.selectedHabit
			.beginDate
			.getTime())
			return;
		state.selectedHabit.index = index;
		state.selectedHabit.oldGroupId = state.selectedHabit.groupId;
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
			state.show.detail = true;
			nextTick(() => {
				detail.value.open();
			})
		});
	}

	function habitCreated(e) {
		const item = e.item;
		const groupName = e.groupName;
		if (dateEquals(item.beginDate, state.selectedDay)) {
			if (habitOption.value.data.length < habitOption.value.size) {
				habitOption.value.data.push(item);
				if (state.data[groupName] == undefined) {
					state.data[groupName] = [item];
					state.model[groupName] = "0";
				} else
					state.data[groupName].push(item);
			}
		}
		uni.removeStorageSync(HabitReminderKey);
	}

	function habitUpdated(e) {
		const index = e.index;
		const data = e.item;
		const oldGroupName = e.oldGroupName;
		const newGroupName = e.newGroupName;
		if (state.data[newGroupName] == undefined) {
			state.model[newGroupName] = "0";
			state.data[newGroupName] = [data];
		} else
		if (oldGroupName == newGroupName)
			state.data[oldGroupName][index] = data;
		else {
			state.data[oldGroupName].splice(index, 1);
			state.data[newGroupName].push(data);
		}
		uni.removeStorageSync(HabitReminderKey);
	}

	function openToEdit() {
		state.show.editor = true;
		nextTick(() => editor.value.open());
	}


	function takeGroup(group) {
		state.habit.groupId = group.id;
		state.groupCode = group.code;
	}


	function getData() {
		GetHabits(habitOption.value, state.userId, state.selectedDay.getTime(), response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			habitOption.value.data = res.data.data;
			habitOption.value.total = res.data.total;
			dataReogrized();
		});
	}

	function editorClose() {
		delayToRun(() => state.show.editor = false, 150);
	}

	function detailClose() {
		delayToRun(() => state.show.detail = false, 150);
	}


	function habitFinished(e) {
		const item = e.item;
		const index = item.records.findIndex(r => r.day.getTime() == onlyDate(state.selectedDay).getTime());
		item.records[index].finished = true;
		state.selectedHabit = item;
	}

	function finishHabit(e) {
		const finished = e.finished;
		const model = {
			habitId: state.selectedHabit.habitId,
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

	function recordFinish(data) {
		state.selectedHabit.persistDays = data.persistDays;
		state.selectedHabit.mostDays = data.mostDays;
		state.selectedHabit.continuousDays = data.continuousDays;
	}

	function habitRemoved(e) {
		habitOption.value.data[e.groupName].splice(e.index, 1);
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
		for (let pro in state.data)
			state.model[pro] = "0";
	}

	function dateChange(date) {
		state.selectedDay = onlyDate(date);
		getData();
	}
</script>

<style scoped>
	#habit {
		position: relative;
		width: 100%;
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


	#habit .finishBtn {
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
		height: 40px;
	}
	
	#habit .fresh{
		margin-left: 4%;
		/*#ifndef H5*/
		display: inline-block;
		margin-top: 3vh;
		/*#endif
	}
</style>