<template>
	<uni-popup ref="detailPopup" type="right" :background-color="subject.backColor" @change="beforeClose">
		<view class="detail">
			<view class="header">
				<uni-icons type="arrow-left" :size="25" @click="detailPopup.close();"></uni-icons>
				<view style="margin-right: 7px;">
					<uni-icons type="trash" :size="25" @click="removeHabit"></uni-icons>
					<uni-icons type="compose" :size="25" @click="toEdit"
						style="margin-left: 3vw;margin-right: 2%;"></uni-icons>
				</view>
			</view>
			<view class="detail-content">
				<view class="detail-content-inner">
					<text v-if="state.selectedHabit.finished" style="width:90%;
						text-align:right;color:red">已完成</text>
					<image class="background" :src="imgSrc(state.selectedHabit.thumb)"></image>
					<view class="detail-option">
						<text class="detail-title">{{state.selectedHabit.name}}</text>
						<view class="detail-descritpion" v-html="state.selectedHabit.description"></view>
						<k-swiper @finish="finishHabit" :height="60" v-if="!state.selectedHabit.finished"></k-swiper>
						<view class="content-show" v-if="state.selectedHabit.finished">
							<view class="show-content">
								<text>当前连续</text>
								<text>{{state.selectedHabit.continuousDays}}天</text>
							</view>
							<view class="show-content">
								<text>最多连续</text>
								<text>{{state.selectedHabit.mostDays}}天</text>
							</view>
							<view class="show-content">
								<text>已坚持</text>
								<text>{{state.selectedHabit.persistDays}}天</text>
							</view>
						</view>
					</view>
					<view class="frequency-text">{{getFrequencyText(state.selectedHabit)}}</view>
					<text @click="openRecord" class="open-record">习惯记录详情</text>
				</view>
			</view>
		</view>
	</uni-popup>
	<uni-popup ref="recordPopup" :background-color="subject.backColor" type="right">
		<view class="record">
			<view class="header" style="width: 98%;height: 35px;">
				<uni-icons type="arrow-left" :size="25" @click="recordPopup.close()" :color="subject.iconColor"></uni-icons>
			</view>
			<k-record-month class="record-calendar" v-model="state.selectedHabit.records" :current="state.selectedDay"
				:habitId="state.selectedHabit.habitId" :beginDate="state.selectedHabit.beginDate" @select="recordFinish"
				:continuousDays="state.selectedHabit.continuousDays" :mostDays="state.selectedHabit.mostDays"
				:persistDays="state.selectedHabit.persistDays" :frequency="{
							days:state.selectedHabit.days,
							weekPersistDays:state.selectedHabit.weekPersistDays,
							period:state.selectedHabit.period
						}" :subject="subject">
			</k-record-month>
		</view>
	</uni-popup>
	<habit-editor :habit="state.selectedHabit" :isHabitUpdate="true" v-if="state.show" @close="editorClose"
		@updated="habitUpdated" ref="editorInHabitDetail" :subject="subject"></habit-editor>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		nextTick
	} from "vue";
	import {
		onlyDate,
		delayToRun,
		getFrequencyText
	} from "../module/Common";
	import {
		FinishOrNot,
		RemoveHabit,
	} from "../api/Habit";
	import {
		imgSrc
	} from "../module/Request";
	const detailPopup = ref(null);
	const recordPopup = ref(null);
	const editorInHabitDetail = ref(null);
	const today = ref(new Date());
	const state = reactive({
		selectedDay: new Date(today.value.setMilliseconds(0)),
		selectedHabit: null,
		show: false
	});

	const pros = defineProps({
		habit: Object,
		date: Date,
		subject: Object
	});

	const subject = ref(pros.subject);
	const habit = ref(pros.habit);
	const date = ref(pros.date);
	const emits = defineEmits(["close", "finished", "removed", "updated"]);

	onMounted(() => {
		if (habit.value != undefined && habit.value != null)
			state.selectedHabit = habit.value;
		if (date.value != undefined)
			state.selectedDay = onlyDate(date.value);
	});

	function toEdit() {
		state.show = true;
		nextTick(() => {
			editorInHabitDetail.value.open();
		});
	}

	function beforeClose(e) {
		if (e.show) return;
		emits("close");
	}

	function editorClose() {
		delayToRun(() => state.show = false, 175);
	}

	function finishHabit(e) {
		const finished = e.finished;
		const model = {
			habitId: state.selectedHabit.habitId,
			finishTime: new Date(),
			finished: finished,
			day: onlyDate(date.value)
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
			emits("finished", {
				item: state.selectedHabit
			});
		});
	}

	function recordFinish(data) {
		state.selectedHabit.persistDays = data.persistDays;
		state.selectedHabit.mostDays = data.mostDays;
		state.selectedHabit.continuousDays = data.continuousDays;
	}

	function habitUpdated(e) {
		const data = e.item;
		state.selectedHabit = data;
		emits("updated", e);
	}

	function removeHabit() {
		uni.showModal({
			confirmText: "确定",
			cancelText: "取消",
			title: "删除习惯",
			content: "习惯将移至回收站",
			success: res => {
				if (res.confirm) {
					RemoveHabit(state.selectedHabit.habitId, response => {
						const res = response.data;
						if (!res.succeeded) {
							uni.showToast({
								title: res.message,
								icon: "none"
							});
							return;
						}
						emits("removed", {
							index: state.selectedHabit.index,
							groupName: state.selectedHabit.groupName
						});
						detailPopup.value.close();
					});
				}
			}
		})
	}

	function openRecord() {
		recordPopup.value.open();
	}

	function open() {
		detailPopup.value.open();
	}

	defineExpose({
		open
	});
</script>

<style scoped>
	.detail {
		width: 100vw;
		height: 96vh;
		padding-left: 1%;
		/*#ifdef H5*/
		padding-top: 5px;
		/*#endif*/
		/*#ifndef H5*/
		padding-top: 3vh;
		/*#endif*/
	}

	.detail .detail-content {
		display: flex;
		position: relative;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}

	.detail .detail-content-inner {
		display: flex;
		position: relative;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		height: 75%;
		padding: 1%;
		border-radius: 8px;
		width: 86%;
		background-color: #fff;
	}

	.detail .background {
		width: 90px;
		height: 90px;
	}

	.detail .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 30px;
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

	.detail .frequency-text {
		font-size: 14px;
		color: gray;
		margin-top: 2%;
	}

	.open-record {
		color: rgb(0, 75, 235);
		margin-top: 2%;
	}

	.record {
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
		height: 250px;
	}

	.finishBtn {
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
</style>