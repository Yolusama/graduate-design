<template>
	<view class="k-record-month">
		<view class="title">
			<uni-icons type="left" @click="transformLeft"></uni-icons>
			<picker mode="date" @change="selectDate" style="margin-left: 2%;margin-right: 2%;"
				:value="getDateStr(current)">
				{{current.getFullYear()}}年{{current.getMonth()+1}}月
			</picker>
			<uni-icons type="right" @click="transformRight"></uni-icons>
		</view>
		<swiper :current="state.current" @transition="toTransform" @change="transformed"
			@animationfinish="backTransform" style="height: 230px">
			<swiper-item v-for="(item,index) in state.data" :key="index">
				<view class="day-label">
					<text class="day-text" v-for="(day,index1) in ['日','一','二','三','四','五','六']"
						:key="index1">{{day}}</text>
				</view>
				<view class="month">
					<view class="month-container" v-for="(day,index2) in state.days[index]" :key="index2">
						<view :class="day!=null?day.class:'date'" @tap="select(day)" :style="day!=null&&onlyDate(day.date).getTime() <= today.getTime() &&
						  onlyDate(day.date).getTime() >= beginDate.getTime()?'background-color:rgb(5,5,5,.75)':''">
							{{day!=null?day.date.getDate():''}}
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="rercord-card">
			<view class="card-header">
				习惯完成数据
			</view>
			<view class="card-content">
				<view class="card">
					<view class="head">
						<image src="../static/percentage.png" class="head-image"></image>
						<text>完成率</text>
					</view>
					<view class="card-option">{{getFinishRate()}}
						<text class="card-option-text">%</text>
					</view>
				</view>
				<view class="card">
					<view class="head">
						<image src="../static/finish.png" class="head-image"></image>
						<text>总完成</text>
					</view>
					<view class="card-option">{{persistDays}}&nbsp;<text class="card-option-text">天</text></view>
				</view>
				<view class="card">
					<view class="head">
						<image src="../static/lean.png" class="head-image"></image>
						<text>连续</text>
					</view>
					<view class="card-option">{{continuousDays}}&nbsp;<text class="card-option-text">天</text></view>
				</view>
				<view class="card">
					<view class="head">
						<image src="../static/continuous.png" class="head-image"></image>
						<text>最多连续</text>
					</view>
					<view class="card-option">{{mostDays}}&nbsp;<text class="card-option-text">天</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		reactive
	} from 'vue';
	import {
		onlyDate,
		monthDays,
		getDateStr,
		copy,
		ADayMillseconds
	} from '../module/Common';
	import {
		DayInFrequency,
		FinishOrNot
	} from '../api/Habit';

	const pros = defineProps({
		modelValue: Array,
		beginDate: Date,
		habitId: String,
		current: Date,
		continuousDays: Number,
		mostDays: Number,
		persistDays: Number,
		frequency: Object
	});
	const emits = defineEmits();

	const today = ref(onlyDate(new Date()));
	const state = reactive({
		data: new Array(3),
		current: 1,
		days: [
			[],
			[],
			[]
		],
		moveLeft: undefined,
		transformed: false,
		daysFromBeginDateToNow: 0
	});

	const records = ref(pros.modelValue);
	const beginDate = ref(pros.beginDate);
	const habitId = ref(pros.habitId);
	const current = ref(pros.current);
	const continuousDays = ref(pros.continuousDays);
	const mostDays = ref(pros.mostDays);
	const persistDays = ref(pros.persistDays);
	const frequency = ref(pros.frequency);

	onMounted(() => {
		if (beginDate.value == undefined)
			beginDate.value = today.value; 
		loadMonthDays();
		state.daysFromBeginDateToNow = ((today.value.getTime() - beginDate.value.getTime()) / ADayMillseconds) + 1;
	});

	function loadMonthDays() {
		const date = new Date(current.value);
		for (let i = 0; i < state.data.length; i++) {
			const month = date.getMonth();
			const dateTemp = new Date(new Date(date).setMonth(month + i - 1));
			for (let j = 0; j < monthDays(dateTemp.getFullYear(), dateTemp.getMonth() + 1); j++) {
				const temp = new Date(dateTemp);
				temp.setDate(j + 1);
				for (let k = 0; j == 0 && k < temp.getDay(); k++) {
					state.days[i].push(null);
				}
				const index = records.value.findIndex(r => r.day.getTime() == onlyDate(temp).getTime());
				const day = {
					date: temp,
					class: "date",
					record: {
						index: index,
						result: index >= 0
					}
				};
				if (day.record.result)
					day.class = records.value[day.record.index].finished ? "date finished" : "date unfinished";
				state.days[i].push(day);
			}
		}
	}

	function select(day) {
		if (day.record.result) {
			const record = records.value[day.record.index];
			DayInFrequency(habitId.value, day.date.getTime(), beginDate.value.getTime(), response => {
				const res = response.data;
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
					return;
				}
				if (!res.data) {
					uni.showToast({
						title: "非习惯执行频率区段或在当前习惯执行频率区段中，习惯已执行完毕",
						icon: "none"
					});
					return;
				}
				uni.showModal({
					content: "完成/不完成",
					confirmText: "完成",
					cancelText: "不完成",
					success: res => {
						const model = {};
						copy(record, model);
						if (res.confirm) {
							if (record.finsihed) return;
							model.finished = true;
						}
						if (res.cancel) {
							if (!record.finished) return;
							model.finished = false;
						}
						model.finishTime = model.finished ? new Date() : null;
						model.habitId = habitId.value;
						FinishOrNot(model, response => {
							if (!response.data.succeeded) {
								uni.showToast({
									title: response.data.message,
									icon: "none"
								});
								return;
							}
							const data = response.data.data;
							record.finished = model.finished;
							record.finishTime = model.finishTime;
							persistDays.value = data.persistDays;
							mostDays.value = data.mostDays;
							continuousDays.value = data.continuousDays;
							day.class = record.finished ? "date finished" : "date unfinished";
							emits("update:modelValue", records.value);
							emits("select", data);
						});
					}
				});
			});
		} else {
			const date = onlyDate(day.date);
			if (date.getTime() <= today.value.getTime() && date.getTime() >= beginDate.value.getTime()) {
				DayInFrequency(habitId.value, day.date.getTime(), beginDate.value.getTime(), response => {
					const res = response.data;
					if (!res.succeeded) {
						uni.showToast({
							title: res.message,
							icon: "none"
						});
						return;
					}
					if (!res.data) {
						uni.showToast({
							title: "在当前习惯执行频率区段中，习惯已执行完毕",
							icon: "none"
						});
						return;
					}
					uni.showModal({
						content: "是否完成",
						confirmText: "完成",
						cancelText: "不完成",
						success: result => {
							var finished;
							if (result.confirm)
								finished = true;
							if (result.cancel)
								finished = false;
							const record = {
								habitId: habitId.value,
								day: onlyDate(day.date),
								finished: finished,
								finishTime: finished ? new Date() : null
							};
							FinishOrNot(record, response1 => {
								const res1 = response1.data;
								if (!res1.succeeded) {
									uni.showToast({
										title: res1.message,
										icon: "none"
									});
									return;
								}
								const data = res1.data;
								records.value.push(record);
								day.class = record.finished ? "date finished" :
									"date unfinished";
								persistDays.value = data.persistDays;
								mostDays.value = data.mostDays;
								continuousDays.value = data.continuousDays;
								emits("update:modelValue", records.value);
								emits("select", data);
							});
						}
					});
				})
			}
		}
	}

	function toTransform(e) {
		const detail = e.detail;
		if (!state.transformed && state.moveLeft == undefined) {
			if (detail.dx < 0)
				state.moveLeft = true;
			else if (detail.dx > 0)
				state.moveLeft = false;
			state.transformed = true;
		}
	}

	function backTransform(e) {
		const detail = e.detail;
		changeMonthDays(detail.current);
	}

	function transformed(e) {
		const detail = e.detail;
		if (detail.source == "") return;
		if (state.moveLeft == undefined) return;
		const date = new Date(current.value);
		if (state.moveLeft)
			date.setMonth(date.getMonth() - 1);
		else
			date.setMonth(date.getMonth() + 1);
		current.value = date;
		state.transformed = false;
	}

	function selectDate(e) {
		current.value = new Date(e.detail.value);
	}

	function transformLeft() {
		const date = new Date(current.value);
		date.setMonth(date.getMonth() - 1);
		changeMonthDays(state.current--);
		current.value = date;
	}

	function transformRight() {
		const date = new Date(current.value);
		date.setMonth(date.getMonth() + 1);
		changeMonthDays(state.current++);
		current.value = date;
	}

	function changeMonthDays(index) {
		const toAdd = [];
		const date = current.value;
		if (index == state.data.length - 1) {
			state.data.push({});
			const temp = new Date(new Date(date).setMonth(date.getMonth() + 1));
			const index = records.value.findIndex(r => r.day.getTime() == temp.getTime());
			for (let i = 0; i < monthDays(temp.getFullYear(), temp.getMonth() + 1); i++) {
				let data = {
					date: new Date(new Date(temp).setDate(i + 1)),
					class: "date",
					record: {
						index: index,
						result: index >= 0
					}
				};
				if (data.record.result)
					data.class = records.value[data.record.index].finished ? "date finished" : "date unfinished";
				if (i == 0) {
					for (let j = 0; j < data.date.getDay(); j++)
						toAdd.push(null);
				}
				toAdd.push(data);
			}
			state.current = state.data.length - 2;

			state.days.push(toAdd);
		}
		if (index == 0) {
			const temp = new Date(new Date(date).setMonth(date.getMonth() - 1));
			const index1 = records.value.findIndex(r => r.day.getTime() == temp.getTime());
			state.data.splice(0, 0, {});
			for (let i = 0; i < monthDays(temp.getFullYear(), temp.getMonth() + 1); i++) {
				let data = {
					date: new Date(new Date(temp).setDate(i + 1)),
					class: "date",
					record: {
						index: index1,
						result: index1 >= 0
					}
				};
				if (data.record.result)
					data.class = records.value[data.record.index].finished ? "date finished" : "date unfinished";
				if (i == 0) {
					for (let j = 0; j < data.date.getDay(); j++)
						toAdd.push(null);
				}
				toAdd.push(data);
			}
			state.current = 1;

			state.days.splice(0, 0, toAdd);
		}
		state.transformed = false;
		state.moveLeft = undefined;
	}

	function getFinishRate() {
		var count = 0;
		if (frequency.value.days != null) {
			for (let i = 0; i < state.daysFromBeginDateToNow; i++) {
				const date = new Date(new Date(beginDate.value).setDate(beginDate.value.getDate() + i));
				for (let pro in frequency.value.days) {
					if (frequency.value.days[pro] == date.getDay()) {
						count++;
						break;
					}
				}
			}
		}

		if (frequency.value.weekPersistDays != null) {
			const beginDateDay = beginDate.value.getDay();
			if (beginDateDay <= frequency.value.weekPersistDays) {
				count += frequency.value.weekPersistDays;
			}
			const leftDays = state.daysFromBeginDateToNow - (7 - beginDateDay);
			const mod = leftDays % 7;
			const left = Math.floor(leftDays / 7);
			count += frequency.value.weekPersistDays * left + (mod < frequency.value.weekPersistDays ? mod : frequency
				.value.weekPersistDays);
		}

		if (frequency.value.period != null)
			{
				count = Math.floor(state.daysFromBeginDateToNow / frequency.value.period);
				if(count == 0)
				  return 0;
			}
		if(persistDays.value==0) return 0;
		return ((persistDays.value / count)* 100).toFixed(2);
	}
</script>

<style>
	.k-record-month {
		position: relative;
		width: 100%;
	}

	.k-record-month .title {
		display: flex;
		font-size: 16px;
		width: 100%;
		justify-content: center;
		align-items: center;
		height: 30px;
	}

	.k-record-month .day-label {
		display: flex;
		justify-content: space-around;
		font-size: 13px;
	}

	.k-record-month .date {
		color: darkgray;
		height: 30px;
		width: 30px;
		border-radius: 50%;
		text-align: center;
		line-height: 30px;
	}

	.k-record-month .finished {
		background-color: rgb(0, 75, 245) !important;
		color: white;
	}

	.k-record-month .unfinished {
		background-color: rgb(225, 225, 225) !important;
		color: red;
	}

	.k-record-month .month {
		display: flex;
		flex-wrap: wrap;
		width: 100%
	}

	.k-record-month .month-container {
		width: 14.28%;
		display: flex;
		justify-content: center;
		margin-bottom: 1%;
	}


	.k-record-month .rercord-card {
		position: relative;
		background-color: #fff;
		border-radius: 8px;
	}

	.k-record-month .card-content {
		display: flex;
		width: 100%;
		flex-flow: row wrap;
		justify-content: center;
	}

	.k-record-month .card {
		display: flex;
		flex-direction: column;
		width: 44%;
		background-color: aliceblue;
		margin-left: 3%;
		margin-bottom: 3%;
		border-radius: 5px;
		font-size: 14px;
		height: 60px;
		justify-content: center;
	}

	.k-record-month .card .head {
		display: flex;
		align-items: center;
		color: gray
	}

	.k-record-month .card .head-image {
		width: 15px;
		height: 15px;
		margin-left: 2%;
		margin-right: 2%;
	}

	.k-record-month .card .card-option {
		margin-left: 2%;
		font-size: 18px;
		font-weight: 600;
	}

	.k-record-month .card .card-option-text {
		font-size: 14px;
	}

	.k-record-month .card-header {
		font-size: 18px;
		color: black;
		width: 100%;
		padding: 1%;
		font-weight: 600;
	}
</style>