<template>
	<view id="notify-audio">
		<uni-title type="h1" title="自定义音效无法完成,uniapp对上传文件的支持不足"></uni-title>
		<view @click="uploadAudio">
			<uni-icons type="plusempty"></uni-icons>
			<text>上传本地音频文件（大于30s,可用)</text>
		</view>
		<scroll-view scroll-y>
			<uni-data-checkbox mode="list" :localdata="state.audios" v-model="state.selectedIndex">
			</uni-data-checkbox>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		reactive,
		onMounted
	} from 'vue';
	import {
		ValueText
	} from '../module/Common';
	const state = reactive({
		audios: [new ValueText(0, "系统")],
		selectedIndex: -1
	});

	onMounted(() => {
		const currentAudio = uni.getStorageSync("current-notify-audio");
		if (currentAudio == null || currentAudio == "")
			state.selectedIndex = 0;
		else
			state.selectedIndex = currentAudio;
	});

	function uploadAudio() {
		uni.chooseAudio({
			count: 1, // 选择文件的个数 
			extension:[".mp3"],
			success: (res) => {
				const file = res.tempFiles[0];
				console.log('选中的音频文件：', file);
			},
			fail: (err) => {
				console.log('选择文件失败', err);
			}
		});
	}
</script>

<style scoped>

</style>