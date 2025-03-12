<template>
	<view id="version">
		<view class="info">
			<view style="display: flex;align-items: center;justify-content: center;height: 70px;">
				<image :src="imgSrc(state.appInfo.icon)" class="icon"></image>
				<text class="app-name">{{state.appInfo.name}}</text>
			</view>
			<text class="version-number" @click="showVersionDescription">版本：{{state.version.number}}</text>
		</view>
		<uni-popup type="center" background-color="#fff" border-radius="7px 7px 7px 7px" ref="versionIntroPopup">
			<scroll-view style="height: 45vh;width:75vw" scroll-y>
				<view v-html="state.version.description" class="intro"></view>
			</scroll-view>
		</uni-popup>
		<!--#ifdef APP-PLUS-->
		<uni-list style="width: 92%;margin-top: 5px;margin-bottom: 7px;">
			<uni-list-item show-arrow title="检查更新">
				<template v-slot:body>
					<view style="width: 100%;" @tap="checkUpdate">
						检查更新
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-popup type="center" background-color="#fff" border-radius="7px 8px 8px 7px" ref="versionPopup">
			<view class="version-update">
				<view class="header">
					<uni-icons type="closeempty" @click="versionPopupClose"></uni-icons>
				</view>
				<uni-title type="h4" title="版本更新"></uni-title>
				<view class="content" v-html="newVersion.description">
				</view>
				<view class="btns">
					<button size="mini" type="primary" @click="update">更新</button>
					<button size="mini" style="color: white;background-color: red;" @click="versionPopupClose">取消</button>
				</view>
			</view>
		</uni-popup>
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
		onMounted,
		version
	} from 'vue';
	import {
		GetCurrentVersion,
		GetLatestVersion,
		ResetCurrentVersion,
		appInfo
	} from '../api/Version';
	import {
		imgSrc,
		requestBaseUrl
	} from '../module/Request';
import { copy } from '../module/Common';

	const state = reactive({
		appInfo: appInfo,
		version: {
			number: "未知"
		},
		userId: ""
	});
	const versionIntroPopup = ref(null);

	onMounted(() => {
		const user = uni.getStorageSync("user");
		state.userId = user.uid;
		getCurrentVersion();
	});

	function getCurrentVersion() {
		GetCurrentVersion(state.userId, response => {
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
	
	function showVersionDescription(){
		versionIntroPopup.value.open();
	}
	//#ifdef APP-PLUS
	const newVersion = ref(null);
	const versionPopup = ref(null);
	
	function versionPopupClose(){
		versionPopup.value.close();
		newVersion.value = null;
	}

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
			newVersion.value = version;
			versionPopup.value.open();
		});
	}

	function update() {
		versionPopup.value.close();
		uni.showToast({
			title: "开始下载...",
			icon: "none"
		});
		plus.push.createMessage("下载新版本...",{
			route:"/pages/version"
		},{
			when:new Date(),
			title:"版本更新"
		});
		const fileUrl = `${requestBaseUrl}/download/${newVersion.value.fileName}`;
	    const downloadTask=plus.downloader.createDownload(fileUrl, {}, (res,status) => {
			if (status == 200) {
				plus.runtime.install(res.filename, {force:true}, res1 => {
					const version = {};
					copy(newVersion.value,version);
					resetCurrentVersion(version);
					uni.removeSavedFile({
						filePath: res.filename
					});
					newVersion.value = null;
				});
			} else {
				uni.removeSavedFile({
					filePath: res.filename
				});
				newVersion.value = null;
			}
			
		},error=>console.log(error));	
		downloadTask.start();
	}
	
	function resetCurrentVersion(version){
		ResetCurrentVersion(state.userId,version,response=>{
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			uni.showModal({
				title:"更新完成",
				content:"新版本安装包已安装完毕",
				success:res1=>{
					state.version = version;
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
	
	#version .intro{
		padding: 2%;
		font-size: 14px;
	}
	
	/*#ifdef APP-PLUS*/
	#version .version-update{
		display: flex;
		flex-flow: column nowrap;
        align-items: center;
		max-height: 32vh;
		width: 75vw;
	} 
	
	.version-update .header{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 30px;
		width: 100%;
		padding-right: 4%;
	}
	
	.version-update .content{
		max-height: 20vh;
		overflow:hidden auto;
		text-align: center;
		width: 92%;
	}
	
	.version-update .btns{
		display: flex;
		width: 60%;
		justify-content: center;
		margin-top: 4vh;
		margin-bottom: 3%;
	}
	/*#endif*/
</style>