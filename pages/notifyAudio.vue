<template>
	<view id="notify-audio">
		<view class="content">
			<uni-title type="h1" title="自定义音效无法完成,uniapp对上传文件与系统原生api调用的支持不足,无法完成上传文件,只提供系统音频供使用"
			 style="width: 90%;">
			</uni-title>
			<scroll-view scroll-y style="width: 90%;">
				<view >
					<uni-title type="h3" title="选择铃声"></uni-title>
					<uni-data-checkbox mode="list" :localdata="state.audios" v-model="state.value"
						@change="selectAudio">
					</uni-data-checkbox>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		onMounted,
		ref
	} from 'vue';
	import {
		CurrentAudioKey,
		ValueText,
		playNotifyAudio
	} from '../module/Common';
	import {
		GetNotifyAudios
	} from '../api/Index';
	import {
		audioSrc
	} from '../module/Request';
	const state = reactive({
		audios: [],
		value: 0
	});

	const key = ref(CurrentAudioKey);

	onMounted(() => {
		const current = uni.getStorageSync(key.value);
		if (current != "" && current != null)
			state.value = current.value;
		getNotifyAudios();
	});

	function getNotifyAudios() {
		GetNotifyAudios(response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			const audios = [new ValueText(0, "无")];
			const data = res.data;
			let i = 1;
			for (let audio of data) {
				const toAdd = new ValueText(i++, audio.substring(0, audio.indexOf('.')));
				toAdd.fileName = audio;
				audios.push(toAdd);
			}
			state.audios = audios;
		});
	}

	function selectAudio() {
		const audio = state.audios[state.value];
		uni.setStorage({
			key: key.value,
			data: audio,
			success: () => {
				if (state.value == 0) return;
				playNotifyAudio(audioSrc(audio.fileName));
			}
		});
	}
</script>

<style scoped>
	#notify-audio {
		position: relative;
		width: 100vw;
	}
	
	#notify-audio .content{
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
	}
</style>