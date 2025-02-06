<template>
	<view id="version">
		<view class="info">
			<view style="display: flex;align-items: center;justify-content: center;">
				<image :src="imgSrc(state.appInfo.icon)" class="icon"></image>
				<text class="app-name">{{state.appInfo.name}}</text>
			</view>
			<text class="version-number">版本：{{state.version.number}}</text>
		</view>
		<!--#ifdef APP-PLUS-->
		<uni-list style="width: 92%;margin-top: 5px;margin-bottom: 7px;">
			<uni-list-item show-arrow title="检查更新" @click="checkUpdate"></uni-list-item>
		</uni-list>
		<!--#endif-->
		<view class="tail">
			<text>版号：{{state.appInfo.code}}</text>
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
		GetCurrentVersion,
		GetLatestVersion,
		appInfo
	} from '../api/Version';
	import {
		imgSrc,
		requestBaseUrl
	} from '../module/Request';

	const state = reactive({
		appInfo: appInfo,
		version: {
			number: "未知"
		}
	});

	onMounted(() => {
		getCurrentVersion();
	});
	
	function getCurrentVersion(){
		GetCurrentVersion(response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.version = res.data;
		});
	}
	//#ifdef APP-PLUS
	function checkUpdate() {
		GetLatestVersion(response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			const version = res.data;
			if (version.id == state.version.id) {
				uni.showToast({
					title: "已经是最新版本~",
					icon: "none"
				});
				return;
			}
			uni.showModal({
				cancelText: "取消",
				confirmText: "确定",
				content: version.description,
				title: "版本更新",
				success: res => {
					if (res.cancel) return;
					const fileUrl = `${requestBaseUrl}/download/${version.fileName}`;
					plus.downloader.createDownload(fileUrl, {}, (res) => {
						if (status == 200)
							plus.runtime.install(res.filename,{},res1=>{
								getCurrentVersion();
							});
						else
							uni.removeSavedFile({
								filePath: res.filename
							});
					});
				}
			});
		});
	}
	//#endif 
</script>

<style scoped>
	#version {
		position: relative;
		width: 100%;
		height: 94vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#version .info {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}

	#version .icon {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		margin-top: 12px;
	}

	#version .app-name {
		font-size: 14px;
		color: rgb(0, 75, 235);
		margin-left: 6px;
	}

	#version .version-number {
		color: gray;
		font-size: 15px;
	}

	#version .tail {
		position: absolute;
		bottom: 3%;
		font-weight: 600;
	}
</style>