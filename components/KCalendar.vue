<template>
	<view class="k-calendar">
		<view v-if="state.selectedDay!=undefined" class="title" :style="'color:'+subject.textColor">
			{{ labelText()}}
			<view class="sign" @click="signRotate" :style="'border-top-color:'+subject.textColor+';'+state.view.rotation"
			 v-if="!unchangable"></view>
			<view class="select-date">
				<picker mode="date" :value="state.dateStr" start="1970-01-01" @change="dateChange"
					@cancel="state.dateStr=''">
					<uni-icons type="paperplane" :size="18" :color="subject.iconColor"></uni-icons>
				</picker>
			</view>
			<view class="switch">
				<uni-icons type="left" :size="16" @click="switchLeft" :color="subject.iconColor"></uni-icons>
				<uni-icons type="right" :size="16" @click="switchRight" :color="subject.iconColor"></uni-icons>
			</view>
		</view>
		<uni-segmented-control style-type="text" :values="state.view.items" :current="state.view.current"
			v-if="state.view.expanded" @clickItem="switchViewMode"  :active-color="subject.fabColor"
			style="margin-bottom:5px">
		</uni-segmented-control>
		<swiper :current="state.current" @transition="toTransform" @change="transformed" :duration="state.duration"
			@animationfinish="backTransform" v-if="showWay==CalendarDisplayWay.week" style="height: 110px;">
			<swiper-item v-for="(item,index) in state.data" :key="index">
				<view class="header">
					<view class="day-label">
						<view v-for="(weekDay,index1) in state.days[index]" :key="index1" class="week">
							<text class="day-text" :style="{color:subject.textColor}">{{weekDayShow(weekDay.date.getDay())}}</text>
							<text @tap="selectDay($event,weekDay,index)"
								:style="weekDay.selected?{borderColor:subject.fabColor,backgroundColor:'aqua',color:'white',
								borderWidth:'2px',borderStyle:'solid'}:
								{color:subject.textColor}"
								:class="dateEquals(weekDay.date,current)?'date date-today':'date'">
								{{weekDay.date.getDate()}}</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<swiper v-if="showWay==CalendarDisplayWay.month" :current="state.current" @transition="toTransform"
			@change="transformed" @animationfinish="backTransform" style="height: 230px">
			<swiper-item v-for="(item,index) in state.data" :key="index">
				<view class="day-label">
					<text class="day-text" v-for="(day,index1) in ['日','一','二','三','四','五','六']"
						:key="index1" :style="'color:'+subject.textColor">{{day}}</text>
				</view>
				<view class="month">
					<view v-for="(day,index2) in state.days[index]" :key="index2" class="month-container">
						<view :class="day!=null&&dateEquals(day.date,current)?'date date-today':'date'"
							@tap="selectDay($event,day,index)"
							:style="day!=null&&day.selected?{borderColor:subject.fabColor,backgroundColor:'aqua',color:'white',
							borderWidth:'2px',borderStyle:'solid'}:
							{color:subject.textColor}">
							{{day!=null?day.date.getDate():""}}
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<swiper v-if="showWay==CalendarDisplayWay.year" :current="state.current" @transition="toTransform"
			@change="transformed" @animationfinish="backTransform" style="height: 600px;">
			<swiper-item v-for="(item,index) in state.data" :key="index">
				<view class="year">
					<view class="year-item" v-for="(monthDays,index2) in state.days[index]" :key="index2"
						@tap="goToMonth(index2)">
						<h4 :style="{color:subject.textColor}">{{index2+1}}月</h4>
						<view class="day-label">
							<text class="day-text" v-for="(day,index1) in ['日','一','二','三','四','五','六']"
								:key="index1" :style="{color:subject.textColor}">{{day}}</text>
						</view>
						<view class="month">
							<view v-for="(day,index3) in monthDays" :key="index3" class="month-container">
								<view :class="day!=null&&dateEquals(day.date,current)?'date date-today':'date'" 
								:style="day!=null&&day.selected?{borderColor:subject.fabColor,backgroundColor:'aqua',color:'white',
								borderWidth:'2px'}:
							{color:subject.textColor}">
									{{day!=null?day.date.getDate():""}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<swiper v-if="showWay==CalendarDisplayWay.day" :current="state.current" @transition="toTransform"
			@change="transformed" @animationfinish="backTransform" style="height: 70px;">
			<swiper-item v-for="(item,index) in state.data" :key="index"
				:style="{height: '50px',color:subject.textColor}">
				<view v-for="(day,index1) in state.days[index]" :key="index1"
					style="font-size: 18px;text-align: center;line-height: 50px;">
					<k-time-counter v-if="day.selected"></k-time-counter>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import {
		reactive,
		onMounted,
		ref,
		defineProps,
		defineEmits,
		watch,
		nextTick
	} from 'vue';
	import {
		CalendarDisplayWay,
		delayToRun,
		monthDays,
		dateEquals
	} from '../module/Common.js'
import { SubjectStyle, getSubject } from '../module/Subject.js';
	const pros = defineProps({
		currentDay: Date,
		showWay: Number,
		unchangable: Boolean,
		subject:Object
	});

	const state = reactive({
		days: [],
		current: 1,
		selectedDay: undefined,
		data: [1, 1, 1],
		transformed: false,
		duration: 750,
		moveLeft: undefined,
		view: {
			current: 2,
			expanded: false,
			rotation: "-webkit-transform: ",
			items: ['年', '月', '周', '日']
		},
		dateStr: ""
	});

	const current = ref(pros.currentDay);
	const showWay = ref(pros.showWay);
	const unchangable = ref(pros.unchangable);
	const subject = ref(new SubjectStyle());
	const emits = defineEmits(["modeChange", "onChange"]);

	onMounted(() => {
		if (current.value == undefined)
			current.value = new Date();
		if (showWay.value == undefined)
			showWay.value = CalendarDisplayWay.week;
		if (unchangable.value == undefined)
			unchangable.value = false;
		state.selectedDay = new Date(current.value);
		state.days.push([], [], []);
		if (showWay.value == CalendarDisplayWay.week) {
			loadWeekDays();
		} else if (showWay.value == CalendarDisplayWay.month) {
			loadMonthDays();
		} else if (showWay.value == CalendarDisplayWay.year) {
			loadYearDays();
		} else if (showWay.value == CalendarDisplayWay.day) {
			loadDays();
		}
		subject.value = getSubject();
	});

	function weekDayShow(weekDay) {
		switch (weekDay) {
			case 0:
				return "日";
			case 1:
				return "一";
			case 2:
				return "二";
			case 3:
				return "三";
			case 4:
				return "四";
			case 5:
				return "五";
			case 6:
				return "六";
		}
	}

	function loadWeekDays() {
		const today = new Date(state.selectedDay);
		const day = today.getDate();
		const weekDay = today.getDay();
		for (let i = 0; i < state.data.length; i++) {
			if (i == 1) continue;
			for (let j = 0; j < 7; j++)
				state.days[i].push({
					date: new Date(new Date(state.selectedDay).setDate((day - weekDay) + (i - 1) * 7 + j)),
					selected: false
				});
		}
		for (let i = 0; i <= weekDay; i++) {
			let temp = new Date(today);
			state.days[1].push({
				date: new Date(temp.setDate(day - weekDay + i)),
				selected: false
			});
		}
		for (let i = weekDay + 1, j = 1; i < 7; i++, j++) {
			let temp = new Date(today);
			state.days[1].push({
				date: new Date(temp.setDate(day + j)),
				selected: false
			});
		}
		freshSelection();
	}

	function loadMonthDays() {
		const date = new Date(state.selectedDay);
		for (let i = 0; i < state.data.length; i++) {
			const month = date.getMonth();
			const dateTemp = new Date(new Date(date).setMonth(month + i - 1));
			for (let j = 0; j < monthDays(dateTemp.getFullYear(), dateTemp.getMonth() + 1); j++) {
				const temp = new Date(dateTemp);
				temp.setDate(j + 1);
				for (let k = 0; j == 0 && k < temp.getDay(); k++) {
					state.days[i].push(null);
				}
				const item = {
					date: temp,
					selected: false
				};
				if (temp.getFullYear() == state.selectedDay.getFullYear()) {
					if (temp.getMonth() != state.selectedDay.getMonth() && temp.getDate() == 1)
						item.selected = true;
					else if (temp.getMonth() == state.selectedDay.getMonth()) {
						if (temp.getDate() == state.selectedDay.getDate() && temp.getFullYear() == state.selectedDay
							.getFullYear())
							item.selected = true;
						else if (temp.getFullYear() != state.selectedDay.getFullYear() && temp.getDate() == 1)
							item.selected = true;
					}
				} else if (temp.getMonth() != state.selectedDay.getMonth() && temp.getDate() == 1)
					item.selected = true;

				state.days[i].push(item);
			}
		}
	}

	function loadYearDays() {
		const year = state.selectedDay.getFullYear();
		for (let i = 0; i < state.data.length; i++) {
			const date = new Date(new Date().setFullYear(year + i - 1));
			for (let j = 0; j < 12; j++) {
				const days = [];
				for (let k = 0; k < monthDays(date.getFullYear(), j + 1); k++) {
					const day = new Date(date);
					day.setMonth(j);
					day.setDate(k + 1);
					for (let n = 0; k == 0 && n < day.getDay(); n++)
						days.push(null);
					const item = {
						date: day
					};
					days.push(item);
				}
				state.days[i].push(days);
			}
		}
	}

	function loadDays() {
		const date = state.selectedDay.getDate();
		for (let i = 0; i < state.data.length; i++) {
			const temp = new Date(new Date(state.selectedDay).setDate(date + i - 1));
			const item = {
				date: temp,
				selected: false
			};
			item.selected = dateEquals(current.value, item.date);
			state.days[i].push(item);
		}
	}

	function labelText() {
		const date = state.selectedDay;
		switch (showWay.value) {
			case CalendarDisplayWay.month:
			case CalendarDisplayWay.week:
				return `${date.getFullYear()}年${date.getMonth()+1}月`;
			case CalendarDisplayWay.year:
				return `${date.getFullYear()}年`;
			case CalendarDisplayWay.day:
				return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日周${weekDayShow(date.getDay())}`;
		}
	}

	function selectDay(event, day, current) {
		if (day == null) return;
		event.stopPropagation();
		state.selectedDay = new Date(day.date);
		emits("onChange", state.selectedDay);
		if (showWay.value == CalendarDisplayWay.week) {
			freshSelection();
		} else {
			const data = state.days[current];
			for (let i = 0; i < data.length; i++) {
				if (data[i] == null) continue;
				if (data[i].date.getFullYear() == state.selectedDay.getFullYear() &&
					data[i].date.getMonth() == state.selectedDay.getMonth() && data[i].date.getDate() == state.selectedDay
					.getDate())
					data[i].selected = true;
				else
					data[i].selected = false;
			}
		}

	}

	function freshSelection() {
		const data = state.days;
		for (let i = 0; i < data.length; i++)
			for (let j = 0; j < data[i].length; j++) {
				if (data[i][j] == null) continue;
				const date = data[i][j].date;
				data[i][j].selected = false
				if (date.getDay() == state.selectedDay.getDay()) {
					data[i][j].selected = true;
				}
			}
	}

	function transformed(e) {
		const detail = e.detail;
		if (detail.source == "") return;
		const date = new Date(state.selectedDay);
		const day = date.getDate();
		const weekDay = date.getDay();
		if (state.moveLeft == undefined) return;
		if (state.moveLeft) {
			if (showWay.value == CalendarDisplayWay.week) {
				state.selectedDay = new Date(date.setDate(date.getDate() - 7));
			} else if (showWay.value == CalendarDisplayWay.month) {
				date.setMonth(date.getMonth() - 1);
				if (date.getFullYear() == current.value.getFullYear() && date.getMonth() == current.value.getMonth())
					date.setDate(current.value.getDate());
				state.selectedDay = date;
			} else if (showWay.value == CalendarDisplayWay.year) {
				date.setFullYear(date.getFullYear() - 1);
				state.selectedDay = date;
			} else if (showWay.value == CalendarDisplayWay.day) {
				date.setDate(date.getDate() - 1);
				state.selectedDay = date;
			}
		} else {
			if (showWay.value == CalendarDisplayWay.week)
				state.selectedDay = new Date(date.setDate(date.getDate() + 7));
			else if (showWay.value == CalendarDisplayWay.month) {
				date.setMonth(date.getMonth() + 1);
				if (date.getFullYear() == current.value.getFullYear() && date.getMonth() == current.value.getMonth())
					date.setDate(current.value.getDate());
				state.selectedDay = date;
			} else if (showWay.value == CalendarDisplayWay.year) {
				date.setFullYear(date.getFullYear() + 1);
				state.selectedDay = date;
			} else if (showWay.value == CalendarDisplayWay.day) {
				date.setDate(date.getDate() + 1);
				state.selectedDay = date;
			}
		}
		if (showWay.value != CalendarDisplayWay.year)
			emits("onChange", state.selectedDay);
		else
			emits("onChange", current.value);
	}

	function toTransform(e) {
		const detail = e.detail;
		if (!state.transformed && state.moveLeft == undefined) {
			if (detail.dx > 0)
				state.moveLeft = false;
			else if (detail.dx < 0)
				state.moveLeft = true;
			state.transformed = true;
		}
	}

	function backTransform(e) {
		const detail = e.detail;

		changeDays(e.detail.current);
	}

	function changeDays(index) {
		const date = state.selectedDay;
		const day = date.getDate();
		const weekDay = date.getDay();
		if (index == state.data.length - 1) {
			state.data.push(1);
			const toAdd = [];
			if (showWay.value == CalendarDisplayWay.week) {
				for (let i = 0; i < 7; i++) {
					let data = {};
					data.date = new Date(new Date(date).setDate(day - weekDay + i + 7));
					data.selected = data.date.getDay() == state.selectedDay.getDay();
					toAdd.push(data);
				}
			} else if (showWay.value == CalendarDisplayWay.month) {
				const temp = new Date(new Date(date).setMonth(date.getMonth() + 1));
				for (let i = 0; i < monthDays(temp.getFullYear(), temp.getMonth() + 1); i++) {
					let data = {
						date: new Date(new Date(temp).setDate(i + 1)),
						selected: false
					};
					if (i == 0) {
						for (let j = 0; j < data.date.getDay(); j++)
							toAdd.push(null);
						data.selected = true;
					}
					toAdd.push(data);
				}
			} else if (showWay.value == CalendarDisplayWay.year) {
				const temp = new Date(new Date(date).setFullYear(date.getFullYear() + 1));
				for (let i = 0; i < 12; i++) {
					const tempData = [];
					for (let j = 0; j < monthDays(temp.getFullYear(), i + 1); j++) {
						const theDay = new Date();
						theDay.setFullYear(temp.getFullYear());
						theDay.setMonth(i);
						theDay.setDate(j + 1);
						for (let k = 0; j == 0 && k < theDay.getDay(); k++)
							tempData.push(null);
						tempData.push({
							date: theDay
						});
					}
					toAdd.push(tempData);
				}
			} else if (showWay.value == CalendarDisplayWay.day) {
				toAdd.push({
					date: new Date(new Date(date).setDate(day + 1)),
					selected: false
				});
			}
			state.days.push(toAdd);
			state.current = state.days.length - 2;
		} else if (index == 0) {
			var toAdd = [];
			state.data.splice(0, 0, 1);
			if (showWay.value == CalendarDisplayWay.week) {
				for (let i = 0; i < 7; i++) {
					let data = {};
					data.date = new Date(new Date(date).setDate(day - weekDay + i - 7));
					data.selected = data.date.getDay() == state.selectedDay.getDay();
					toAdd.push(data);
				}
			} else if (showWay.value == CalendarDisplayWay.month) {
				const temp = new Date(new Date(date).setMonth(date.getMonth() - 1));
				for (let i = 0; i < monthDays(temp.getFullYear(), temp.getMonth() + 1); i++) {
					let data = {
						date: new Date(new Date(temp).setDate(i + 1)),
						selected: false
					};
					if (i == 0) {
						for (let j = 0; j < data.date.getDay(); j++)
							toAdd.push(null);
						data.selected = true;
					}
					toAdd.push(data);
				}
			} else if (showWay.value == CalendarDisplayWay.year) {
				const temp = new Date(new Date(date).setFullYear(date.getFullYear() - 1));
				for (let i = 0; i < 12; i++) {
					const tempData = [];
					for (let j = 0; j < monthDays(temp.getFullYear(), i + 1); j++) {
						const theDay = new Date();
						theDay.setFullYear(temp.getFullYear());
						theDay.setMonth(i);
						theDay.setDate(j + 1);
						for (let k = 0; j == 0 && k < theDay.getDay(); k++)
							tempData.push(null);
						tempData.push({
							date: theDay
						});
					}
					toAdd.push(tempData);
				}
			} else if (showWay.value == CalendarDisplayWay.day) {
				toAdd.push({
					date: new Date(new Date(date).setDate(day - 1)),
					selected: false
				});
			}
			state.days.splice(0, 0, toAdd);
			state.current = 1;
		}
		state.transformed = false;
		state.moveLeft = undefined;
	}

	function switchLeft() {
		const date = new Date(state.selectedDay);
		switch (showWay.value) {
			case CalendarDisplayWay.day:
				date.setDate(date.getDate() - 1);
				break;
			case CalendarDisplayWay.week:
				date.setDate(date.getDate() - 7);
				break;
			case CalendarDisplayWay.month:
				date.setMonth(date.getMonth() - 1);
				break;
			case CalendarDisplayWay.year:
				date.setFullYear(date.getFullYear() - 1);
				break;
		}
		changeDays(state.current--);
		state.selectedDay = date;
		if (showWay.value != CalendarDisplayWay.year)
			emits("onChange", date);
	}

	function switchRight() {
		const date = new Date(state.selectedDay);
		switch (showWay.value) {
			case CalendarDisplayWay.day:
				date.setDate(date.getDate() + 1);
				break;
			case CalendarDisplayWay.week:
				date.setDate(date.getDate() + 7);
				break;
			case CalendarDisplayWay.month:
				date.setMonth(date.getMonth() + 1);
				break;
			case CalendarDisplayWay.year:
				date.setFullYear(date.getFullYear() + 1);
				break;
		}
		changeDays(state.current++);
		state.selectedDay = date;
		if (showWay.value != CalendarDisplayWay.year)
			emits("onChange", date);
	}

	function signRotate() {
		if (state.view.expanded) {
			state.view.expanded = false;
			state.view.rotation = "";
		} else {
			state.view.expanded = true;
			state.view.rotation = "-webkit-transform:rotateX(-180deg)";
		}
	}

	function updateView(way) {
		switch (way) {
			case CalendarDisplayWay.month:
				loadMonthDays();
				break;
			case CalendarDisplayWay.week:
				loadWeekDays();
				break;
			case CalendarDisplayWay.year:
				loadYearDays();
				break;
			case CalendarDisplayWay.day:
				loadDays();
				break;
		}
	}

	function switchViewMode(item) {
		freshItems();
		state.current = 1;
		var way;
		switch (item.currentIndex) {
			case 0:
				way = CalendarDisplayWay.year;
				break;
			case 1:
				way = CalendarDisplayWay.month;
				break;
			case 2:
				way = CalendarDisplayWay.week;
				break;
			case 3:
				way = CalendarDisplayWay.day;
				break;
		}
		//#ifndef H5
		updateView(way);
		nextTick(() => {
			if (way != CalendarDisplayWay.day)
				showWay.value = way;
			else {
				showWay.value = CalendarDisplayWay.year;
				nextTick(() => showWay.value = way);
			}
		});
		// #endif
		//#ifdef H5
		showWay.value = way;
		updateView(showWay.value);
		//#endif 
		state.view.current = item.currentIndex;

		emits("modeChange", way);
	}

	function goToMonth(month) {
		freshItems();
		showWay.value = CalendarDisplayWay.month;
		state.selectedDay.setMonth(month);
		if (month != current.value.getMonth()) {
			state.selectedDay.setDate(1);
		}
		updateView(showWay.value);
		state.view.current = 1;
		state.view.expanded = false;
		emits("modeChange", showWay.value);
		emits("onChange", state.selectedDay);
	}

	function freshItems() {
		state.data.splice(0, state.data.length);
		state.days.splice(0, state.days.length);
		state.days.push([], [], []);
		state.data.push(1, 1, 1);
	}

	function dateChange(event) {
		const detail = event.detail;
		const date = new Date(detail.value);
		const toSet = new Date(state.selectedDay);
		toSet.setFullYear(date.getFullYear());
		toSet.setMonth(date.getMonth());
		toSet.setDate(date.getDate());
		freshItems();
		state.selectedDay = toSet;
		//#ifndef H5
		state.view.current = 2;
		state.current = 1;
		updateView(CalendarDisplayWay.week);
		nextTick(() => {
			showWay.value = CalendarDisplayWay.week;
		});
		// #endif
		// #ifdef H5
		showWay.value = CalendarDisplayWay.week;
		state.view.current = 2;
		state.current = 1;
		nextTick(() => {
			updateView(showWay.value);
		});
		// #endif
		emits("modeChange", CalendarDisplayWay.week);
		emits("onChange", state.selectedDay);
	}
</script>

<style>
	.k-calendar {
		position: relative;
		top: 20px;
		touch-action: none;
		height: fit-content;
		padding: 1%;
	}

	.k-calendar .title {
		display: flex;
		align-items: center;
		position: relative;
		font-size: 18px;
		font-weight: 600;
	}

	.k-calendar .title .switch {
		position: absolute;
		right: 9%;
		display: flex;
		justify-content: space-between;
		width: 12%;
	}

	.k-calendar .title .select-date {
		position: absolute;
		right: 3%;
	}

	.k-calendar .day-label {
		display: flex;
		justify-content: space-around;
		font-size: 13px;
	}

	.k-calendar .week {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		color: black;
		font-weight: 600;
	}

	.k-calendar .day-text {
		font-weight: 400;
	}

	.k-calendar .date {
		height: 30px;
		line-height: 30px;
		width: 30px;
		border-radius: 50%;
		text-align: center;
	}

	.k-calendar .title .sign {
		margin-left: 10px;
		width: 0;
		height: 0;
		border-top: 10px solid black;
		border-right: 8px solid transparent;
		border-left: 8px solid transparent;
		transition: transform 750ms;
	}

	.k-calendar .month {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		width: 100%;
	}

	.k-calendar .month-container {
		width: 14.28%;
		display: flex;
		justify-content: center;
	}

	.k-calendar .date-today {
		color: white;
		background-color: aqua;
	}

	.k-calendar .year {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.k-calendar .year .day-label {
		font-size: 10px;
	}

	.k-calendar .year .date {
		height: 12px;
		line-height: 12px;
		width: 12px;
		border-radius: 50%;
		text-align: center;
		font-size: 10px;
		font-weight: 600;
	}

	.k-calendar .year-item {
		width: 33.3%;
	}
</style>