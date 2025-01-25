<template>
	<view id="index">
		<uni-popup type="left" ref="labelDrawer" background-color="#fff" style="z-index:1000">
			<view id="task-labels">
				<view class="header">
					<image class="avatar" :src="imgSrc(state.user.avatar)"></image>
					<text class="nickName">{{state.user.nickName}}</text>
				</view>
				<scroll-view class="labels">
					<uni-list>
						<uni-list-item v-for="(list,index) in state.lists" :key="index"
							:show-arrow="list.id!=IdOfLableNamed">
							<template v-slot:body>
								<view class="label-info" v-if="list.id!=IdOfLableNamed">
									<image :src="imgSrc(list.icon)" class="label-icon"></image>
									<text class="text">{{list.name}}</text>
									<view style="margin-left: 5%;display: flex;width:80px">
										<uni-icons type="compose" v-if="!list.notCustom"></uni-icons>
										<text class="hide">隐藏</text>
										<uni-icons type="trash"  v-if="!list.notCustom"></uni-icons>
									</view>
								</view>
								<view style="height: 100%;width:100%" v-if="list.id==IdOfLableNamed">
									<view class="label-info" style="position: relative;">
										<image :src="imgSrc(list.icon)" class="label-icon"></image>
										<text class="text">{{list.name}}</text>
										<view @click.stop="state.labelsExpand=!state.labelsExpand" class="right"
											:style="state.labelsExpand?state.labelsExpandStyle:''">
											<uni-icons type="right" color="rgb(187, 187, 187)">
											</uni-icons>
										</view>
									</view>
									<scroll-view style="height: 30vh;" v-if="state.labelsExpand">
										<view class="label-info" v-for="(label,index1) in state.labels" :key="index1">
											<image :src="imgSrc(label.icon)" class="label-icon"></image>
											<text class="text">{{label.name}}</text>
										</view>
										<view style="margin-left: 5%;display: flex;width:80px">
											<uni-icons type="compose"></uni-icons>
											<text class="hide">隐藏</text>
											<uni-icons type="trash"></uni-icons>
										</view>
									</scroll-view>
								</view>
							</template>
						</uni-list-item>
					</uni-list>
				</scroll-view>
				<view class="add-list">
					<view class="add">
					<uni-icons type="plusempty" color="rgb(0,75,235)"></uni-icons><text style="margin-left: 2px;">清单</text>
					</view>
					<view class="add" style="margin-left:4%;margin-right: 4%;">
					<uni-icons type="plusempty" color="rgb(0,75,235)"></uni-icons><text style="margin-left: 2px;">标签</text>
					</view>
					<text style="font-size: 13px;color: rgb(0,75,235);">查看隐藏</text>
				</view>
			</view>
		</uni-popup>
		<scroll-view class="index-content" direction="vertical">
			<view class="header">
				<uni-icons type="bars" color="rgb(0,125,245)" :size="20" @click="labelDrawer.open()"></uni-icons>
				<text class="text">{{state.currentLabel.name}}</text>
			</view>
			<uni-collapse v-if="state.data['habit']!=undefined && state.data['habit'].length>0">
				<uni-collapse-item title="习惯">
					<scroll-view @click="seeHabitDetail(habit)" v-for="(habit,index) in state.data['habit']"
						:key="index" :title="habit.name">{{habit.description}}</scroll-view>
				</uni-collapse-item>
			</uni-collapse>
			<uni-collapse>
				<uni-collapse-item title="任务">
					<view @click="openTaskEditor(task)" v-for="(task,index) in state.data['task']" :key="index">
						{{task.description}}
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</scroll-view>
		<task-editor ref="indexTaskEditor" :task="state.task" :isTaskUpdate="state.task!=null" v-if="state.show.task"
			@close="taskEditorClose">
		</task-editor>
		<habit-detail :habit="state.habit" v-if="state.show.habit" @updated="habitUpdated" ref="indexHabitDetail"
			@close="habitDetailClose"></habit-detail>
		<uni-fab :pattern="pattern" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="openToEdit" />
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
		GetData,
		GetLabels,
		IdOfLableNamed
	} from '../api/Index';
	import {
		copy,
		delayToRun,
		onlyDate
	} from '../module/Common';
	import {
		user
	} from '../api/User';
	import {
		imgSrc
	} from '../module/Request';

	const pattern = ref({
		color: '#7A7E83',
		backgroundColor: '#fff',
		buttonColor: '#007AFF',
		iconColor: '#fff'
	});

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
			habit: false
		},
		habit: null,
		lists: [],
		labels: [],
		labelsExpand: false,
		labelsExpandStyle: "",
		currentLabel: {}
	});

	const indexTaskEditor = ref(null);
	const indexDetail = ref(null);
	const labelDrawer = ref(null);
	const currentLabel = ref("current-label");

	onMounted(() => {
		const user = uni.getStorageSync("user");
		state.user.id = user.uid;
		state.user.avatar = user.avatar;
		state.user.nickName = user.nickName;

		state.labelsExpandStyle = "-webkit-transform: rotateZ(90deg);";

		var label = uni.getStorageSync(currentLabel.value);
		if (label == null || label == '')
			label = {
				id: 1,
				name: "今天"
			};
		state.currentLabel = label;
		getData(label.id);

		getLabels();
	});

	function openTaskEditor(task) {
		state.task = task;
		openToEdit();
	}

	function openToEdit() {
		state.show.task = true;
		nextTick(() => {
			indexTaskEditor.value.open();
		});
	}

	function seeHabitDetail(habit) {
		state.habit = habit;
		state.show.habit = true;
		nextTick(() => indexDetail.value.open());
	}

	function taskEditorClose() {
		delayToRun(() => state.show.task = false, 150);
	}

	function habitDetailClose() {
		delayToRun(() => state.show.habit = false, 150);
	}

	function getData(lableId) {
		const time = onlyDate(new Date());
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
</script>

<style>
	#index {
		position: relative;
		height: 96vh;
		width: 100%;
		padding: 2%;
		padding-top: 2vh;
	}

	#task-labels {
		position: relative;
		height: 94vh;
		width: 70vw;
		padding: 1%;
		display: flex;
		align-items: center;
		flex-direction: column;
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
		margin-left: 6px;
		margin-right: 6px;
		color: rgb(0, 75, 235)
	}

	#task-labels .text {
		font-size: 13px;
		margin-left: 6%;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap:nowrap;
		width:100px;
	}

	#task-labels .label-info .right {
		position: absolute;
		right: -2%;
		transition: transform 150ms;
	}

	#task-labels .label-icon {
		width: 22px;
		height: 22px;
	}

	#task-labels .labels {
		width: 94%;
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
	
	#task-labels .add-list .add{
		color: rgb(3%,3%,3%);
		font-size: 13px;
	}
</style>