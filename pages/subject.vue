<template>
	<uni-nav-bar dark :fixed="true" shadow background-color="#007AFF" status-bar left-icon="left" left-text="返回"
		title="设置主题" @clickLeft="back" />
	<view id="subject" :style="getColor()">
		<scroll-view scroll-y style="max-height: 60vh;">
			<radio-group @change="setValue">
				<uni-list>
					<uni-list-item v-for="(item,index) in state.data" :key="index">
						<template v-slot:body>
							<view style="width: 100%;">
								<radio :value="item.value" :checked="item.value==state.selected" style="width: 100%;">
									<text>{{item.text}}</text>
								</radio>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</radio-group>
		</scroll-view>
		<view class="board-container">
			<view class="board" :style="getColor()"></view>
			<button type="primary" @click="changeSubject" style="width: 30%;margin-top: 1%;margin-bottom: 1%;"
				size="mini">确定更改</button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from 'vue';
	import {
		SubjectKey,
		subjects
	} from '../module/Subject';
	import {
		ValueText,
		loading
	} from '../module/Common';

	const state = reactive({
		data: [],
		selected: "default"
	});

	onMounted(() => {
		const currentSubject = uni.getStorageSync(SubjectKey);
		if (currentSubject == "" || currentSubject == null)
			state.selected = "default";
		else
			state.selected = currentSubject.name;
		const data = [];
		for (let pro in subjects)
			data.push(new ValueText(pro, ""));
		data[0].text = "经典";
		data[1].text = "淡麦"
		data[2].text = "麦黄";
		data[3].text = "深蓝";
		data[4].text = "湛蓝";
		data[5].text = "浅青";
		data[6].text = "宝石绿";
		data[7].text = "粉红";
		data[8].text = "紫罗兰";
		data[9].text = "橘红";
		data[10].text = "午夜蓝"
		data[11].text = "海宝石蓝";
		data[12].text = "黄绿";
		data[13].text = "番茄红";
		data[14].text = "棕褐";
		data[15].text = "银灰";

		state.data = data;
	});

	function getColor() {
		return `background-color: ${subjects[state.selected].backColor}`;
	}

	function setValue(e) {
		state.selected = e.detail.value;
	}

	function changeSubject() {
		loading("更改中...", () => {
			uni.setStorage({
				key: SubjectKey,
				data: {
					name: state.selected,
					value: subjects[state.selected]
				},
				success: () => {
					const expire = 1500;
					uni.showToast({
						title: "已更改！",
						icon: "success",
						duration: expire
					});
					setTimeout(()=>uni.reLaunch({
						url:"/pages/setting"
					}),expire);
				}
			});
		}, 750);
	}

	function back() {
		uni.navigateBack({
			delta: 1
		});
	}
</script>

<style scoped>
	#subject {
		position: relative;
		padding: 3%;
		height: 100vh;
		width: 100vw;
	}

	#subject .board-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100vw;
		margin-top: 4%;
		height: 120px;
		background-color: #fff;
	}

	#subject .board {
		height: 60px;
		width: 60px;
		margin-top: 2%;
	}
</style>