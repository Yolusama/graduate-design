<template>
	<view id="notify-audio">
		<uni-title type="h1" title="自定义音效无法完成,uniapp对上传文件与系统原生api调用的支持不足"></uni-title>
		<scroll-view scroll-y>
			<view>
				<uni-title type="h3" title="选择铃声"></uni-title>
				<uni-data-checkbox mode="list" :localdata="state.audios" v-model="state.selectedIndex">
				</uni-data-checkbox>
			</view>
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
	
	
</script>

<style scoped>
  #notify-audio{
	  position: relative;
	  width: 100vw;
	}
</style>