<template>
	<view id="index">
		<uni-drawer mode="left" ref="labelDrawer">
			<view id="task-labels">
				<view class="haeder">
				</view>
				<scroll-view class="labels">
					<view class="label" v-for="(label,index) in state.lists">
						<uni-collapse v-if="label.id==4">
							<uni-list-item>
								<template v-slot:title>
									<image :src="imgSrc(label.icon)"></image>
									<text>{{label.name}}</text>
								</template>
								<scroll-view>
									<view>
										<image :src="imgSrc(label.icon)"></image>
										<text>{{label.name}}</text>
									</view>
								</scroll-view>
							</uni-list-item>
						</uni-collapse>
						<view v-if="label.id!=4">
							<image :src="imgSrc(label.icon)"></image>
							<text>{{label.name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-drawer>
		<scroll-view class="index-content" direction="vertical">
			<view class="header"></view>
			<uni-collapse v-if="state.data['habit']!=undefined && state.data['habit'].length>0">
				<uni-collapse-item title="习惯">
					<scroll-view @click="openTaskEditor(habit)" v-for="(habit,index) in state.data['habit']"
						:key="index" :title="habitName">{{habit.description}}</scroll-view>
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
		<habit-detail :habit="state.habit" v-if="state.habit!=null"></habit-detail>
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
		GetLabels
	} from '../api/Index';
	import {
		copy,
		delayToRun
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
		label: {}
	});

	const indexTaskEditor = ref(null);

	onMounted(() => {
		const user = uni.getStorageSync("user");
		state.user.id = user.uid;
		state.user.avatar = user.avatar;
		state.user.nickName = user.nickName;

		getData();
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

	function taskEditorClose() {
		delayToRun(() => state.show.task = false, 150);
	}

	function getData() {
		GetData(state.user.id, 1, response => {
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

	}
</style>