<template>
	<uni-popup type="right" ref="popup" :background-color="subject.backColor" style="z-index:101" @change="popupClose">
		<scroll-view class="habit-edit" scroll-y="true">
			<view class="header">
				<uni-icons type="left" @click="closePopup" class="close" :size="25"></uni-icons>
				<text :style="'font-weight: 600;color:'+subject.textColor">{{state.isHabitUpdate?"习惯内容更新":"添加新习惯"}}</text>
				<uni-icons type="checkmarkempty" :style="state.canAddHabit||state.isHabitUpdate?'':'color:lightgray'"
					:size="25" class="create" @click="editHabit"></uni-icons>
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

								<picker mode="date" @change="selectBeginDate" :disabled="state.isHabitUpdate">
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
						v-for="(group,index) in state.groups" :text="group.name" :key="index" @click="takeGroup(group)">
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
	<uni-popup type="center" background-color="#fff" ref="thumbPopup" style="z-index:101;" @change="thumbPopupClose"
		border-radius="10px 10px 10px 10px">
		<uni-title type="h4" title="习惯图标"></uni-title>
		<view class="thumb-content">
			<view>
				<image class="thumb" :src="state.thumbShow" style="width: 42px;height: 42px;"></image>
			</view>
			<view class="thumbs">
				<image class="thumb" v-for="(thumb,index) in defaultThumbs" :key="index" :src="imgSrc(thumb.value)"
					@click="selectAsThumb(thumb)"></image>
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
	<uni-popup type="right" :background-color="subject.backColor" ref="groupPopup" style="z-index:101">
		<view class="header" style="margin-top: 3vh;">
			<uni-icons type="left" @click="groupPopup.close()" class="close" :size="25" :color="subject.iconColor"></uni-icons>
			<text :style="'font-weight: 600;color:'+subject.textColor">习惯分组</text>
			<view style="width: 40px;"></view>
		</view>
		<k-habit-group v-model="state.groups"></k-habit-group>
	</uni-popup>

</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from "vue";
	import {
		HabitReminder,
		ValueText,
		copy,
		delayToRun,
		getDateStr,
		loading,
		onlyDate,
		persistDays,
		timeWithoutSeconds,
		weekdays
	} from "../module/Common";
	import {
		user
	} from "../api/User";
	import {
		CreateHabit,
		GetDefaultThumbs,
		GetHabitGroups,
		UpdateHabit,
		UploadThumb
	} from "../api/Habit";
	import {
		imgSrc
	} from "../module/Request";
	const popup = ref(null);
	const persistPopup = ref(null);
	const thumbPopup = ref(null);
	const groupPopup = ref(null);
	const defaultThumbs = ref([]);
	const today = ref(new Date());

	const pros = defineProps({
		habit: Object,
		isHabitUpdate: Boolean,
		subject:Object
	});
	const habit = ref(pros.habit);
	const subject = ref(pros.subject);
	const emits = defineEmits(["close", "created", "updated"]);

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
		canAddHabit: false,
		isHabitUpdate: pros.isHabitUpdate,
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
		groupCode: 1,
		selectedDay: today.value,
	});

	onMounted(() => {
		state.habit.beginDate = onlyDate(state.selectedDay);
		state.habit.userId = user == '' ? uni.getStorageSync("user").uid : user.uid;
		state.habit.recordDay = onlyDate(state.selectedDay);
		state.thumbShow = imgSrc(state.habit.thumb);
		if (habit.value != undefined && habit.value != null)
			{
				copy(habit.value, state.habit);
				state.thumbShow = imgSrc(habit.value.thumb);
				if(state.habit.days!=null)
				   state.frequency.selcection = 0;
				if(state.habit.weekPersistDays!=null)
				   state.frequency.selcection = 1;
				if(state.habit.period!=null)
				   state.frequency.selcection = 2;
				resetSomeData();   
			}
		if(!state.isHabitUpdate)
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
	});

	function habitNameInput(current) {
		state.canAddHabit = current.length > 0;
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
					UploadThumb(state.selectedImgFile, state.habit.habitId, state.habit.thumb,
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
			emits("created", {
				groupName: item.groupName,
				item: item
			});
			popup.value.close();
		}, 750);
	}

	function afterUpdating(data) {
		data.beginDate = new Date(data.beginDate);
		const index = state.habit.index;
		const oldGroupName = state.groups.filter(g => g.id == state.habit
			.oldGroupId)[0].name;
		const newGroupName = state.groups.filter(g => g.id == state.habit
			.groupId)[0].name;
		state.habit.reminderModels = data.reminderModels;
		const habit = {};
		copy(state.habit, habit);
		emits("updated", {
			index: index,
			oldGroupName: oldGroupName,
			newGroupName: newGroupName,
			item: habit
		});
		loading("", () => {
			popup.value.close();
		}, 750);
	}

	function openToEdit() {
		popup.value.open();
	}

	function takeGroup(group) {
		state.habit.groupId = group.id;
		state.groupCode = group.code;
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
			if (state.isHabitUpdate)
				state.groupCode = state.groups.filter(g=>g.id==state.habit.groupId)[0].code;
			else {
				state.habit.groupId = state.groups[0].id;
				state.groupCode = state.groups[0].code;
			}
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
		emits("close");
	}

	function closePopup() {
		popup.value.close();
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
		const habitId = state.isHabitUpdate ? state.habit.habitId : null;
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
		state.selectedImgFile = null;
		if(state.isHabitUpdate)return;
		state.habit.thumb = "habit.png";
		state.habit.description = "";
		state.thumbShow = imgSrc(state.habit.thumb);
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
				for (let pro in habit.value.days)
					state.frequency.selected.push(habit.value.days[pro]);
			}
			state.habit.weekPersistDays = null;
			state.habit.period = null;
		} else if (state.frequency.selcection == 1) {
			if (state.isHabitUpdate) state.habit.weekPersistDays = habit.value.weekPersistDays;
			state.habit.days = null;
			state.habit.period = null;
		} else {
			if (state.isHabitUpdate) state.habit.period =habit.value.period;
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

	function open() {
		popup.value.open();
	}
	
	defineExpose({
		open
	});
</script>

<style scoped>
	.habit-edit {
		position: relative;
		display: flex;
		flex-flow: column nowrap;
		width: 100vw;
		height: 92vh;
		/*#ifdef H5*/
		padding-top: 5px;
		/*#endif*/
		/*#ifndef H5*/
		padding-top: 5%;
		/*#endif*/
		align-items: center;
		font-size: 15px;
	}

	.habit-edit .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
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

	.frequency {
		display: flex;
		height: 40px;
		font-size: 16px;
		font-weight: 600;
		justify-content: flex-start;
		width: 90%;
	}

	.frequecnySet {
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
	
	.thumb-content .func-text {
		font-size: 14px;
		color: rgb(0, 75, 235);
		display: flex;
		justify-content: flex-end;
		padding-right: 3%;
	}
</style>