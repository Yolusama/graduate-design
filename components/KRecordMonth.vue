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
						<view :class="day!=null?day.class:'date'" @tap="select(day)" 
						:style="day!=null&&onlyDate(day.date).getTime() <= today.getTime() &&
						  onlyDate(day.date).getTime() >= beginDate.getTime()?'background-color:rgb(5,5,5,.75)':''">
							{{day!=null?day.date.getDate():''}}
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
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
		copy
	} from '../module/Common';
	import {
		DayInFrequency,
		FinishOrNot
	} from '../api/Habit';

	const pros = defineProps({
		modelValue: Array,
		beginDate: Date,
		habitId: String,
		current: Date
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
		transformed: false
	});

	const records = ref(pros.modelValue);
	const beginDate = ref(pros.beginDate);
	const habitId = ref(pros.habitId);
	const current = ref(pros.current);

	onMounted(() => {
		if (beginDate.value == undefined)
			beginDate.value = onlyDate(new Date());
		loadMonthDays();
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
				if(day.record.result)
					day.class = records.value[day.record.index].finished? "date finished" : "date unfinished";
				state.days[i].push(day);
			}
		}
	}

	function select(day) {
		if (day.record.result) {
			const record = records.value[day.record.index];
			uni.showModal({
				confirmText:"完成",
				cancelText:"不完成",
				success: res => {
					const model = {};
					copy(record,model);
					if (res.confirm) {
						if(record.finsihed)return;
						model.finished = true;
					}
					if(res.cancel){
						if(!record.finished)return;
						model.finished = false;
					}
					model.finishTime = model.finished? new Date() : null;
					model.habitId = habitId.value;
					FinishOrNot(model,response=>{
						if(!response.data.succeeded){
							uni.showToast({
								title:response.data.message,
								icon:"none"
							});
							return;
						}
						record.finished = model.finished;
						record.finishTime = model.finishTime;
						day.class = record.finished ? "date finished" : "date unfinished";
						emits("update:modelValue", records.value);
					});	
				}
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
								finishTime: finished?new Date():null
							};
							FinishOrNot(record, response1 => {
								const res1 = response.data;
								if (!res1.succeeded) {
									uni.showToast({
										title: res1.message,
										icon: "none"
									});
									return;
								}
								records.value.push(record);
								day.class = record.finished ? "date finished" : "date unfinished";
								emits("update:modelValue", records.value);
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
			else if(detail.dx > 0)
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
		if(state.moveLeft)
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
		date.setMonth(date.getMonth()-1);
		changeMonthDays(state.current--);
		current.value = date;
	}

	function transformRight() {
		const date = new Date(current.value);
		date.setMonth(date.getMonth()+1);
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
				if(data.record.result)
					data.class = records.value[data.record.index].finished? "date finished" : "date unfinished";
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
						result: index >= 0
					}
				};
				if(data.record.result)
					data.class = records.value[data.record.index].finished? "date finished" : "date unfinished";
				if (i == 0) {
					for (let j = 0; j < data.date.getDay(); j++)
						toAdd.push(null);
				}
				toAdd.push(data);
			}
			state.current = 1;
			
			state.days.splice(0,0,toAdd);
		}
		state.transformed = false;
		state.moveLeft = undefined;
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
		background-color: rgb(225,225,225) !important;
		color:red;
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
	}
</style>