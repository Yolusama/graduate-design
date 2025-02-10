<template>
	<view id="setting" v-if="state.user!=null">
		<uni-list style="width: 92%;">
			<uni-list-item show-arrow>
				<template v-slot:body>
					<view class="item" @click="goToSelfInfo">
						<image :src="imgSrc(state.user.avatar)" class="avatar"></image>
						<text class="item-text">{{state.user.nickname}}</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item show-arrow>
				<template v-slot:body>
					<view class="item" @click="seeAppHelp">
						<image src="../static/doubt.png" class="avatar"></image>
						<text class="item-text">帮助</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item show-arrow>
				<template v-slot:body>
					<view class="item" @click="showAbout">
						<uni-icons type="flag-filled" :size="32"></uni-icons>
						<text class="item-text">关于</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item show-arrow>
				<template v-slot:body>
					<view class="item" @click="feedbackPopup.open()">
						<uni-icons type="chat-filled" :size="32"></uni-icons>
						<text class="item-text">反馈</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<button @click="logout" class="logout">退出登录</button>
		<uni-popup ref="feedbackPopup" background-color="#fff" border-radius="7px 7px 7px 7px"
			@change="beforePopupClose">
			<view class="feedback">
				<view class="header">
					<uni-icons type="closeempty" @click="feedbackPopup.close()"></uni-icons>
				</view>
				<view class="feedback-content">
					<uni-title title="用户反馈" type="h4"></uni-title>
					<textarea rows="5" :maxlength="-1" v-model="state.userFeedback" placeholder="反馈内容" style="font-size: 14px;
					width: 100%;"></textarea>
				</view>
				<view style="display: flex;width: 65%;justify-content: center;">
					<button size="mini" type="primary" @click="feedback">发送</button>
					<button @click="feedbackPopup.close()" size="mini" style="background-color: gray;color: white;">
						取消</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		reactive,
		onMounted,
		ref
	} from 'vue';
	import {
		imgSrc
	} from '../module/Request';
	import {
		Logout
	} from '../api/UserInfo';
import { Feedback } from '../api/User';
	const state = reactive({
		user: null,
		userFeedback: ""
	});
	const feedbackPopup = ref(null);
	const appSrc = ref("https://github.com/Yolusama/graduate-design/tree/front");
	onMounted(() => {
		const user = uni.getStorage({
			key: "user",
			success: res => {
				state.user = res.data;
			}
		});
	});

	function logout() {
		Logout(false, state.user.userId, state.user.email, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			uni.clearStorage();
			uni.reLaunch({
				url: "/pages/login"
			});
		});
	}

	function goToSelfInfo() {
		uni.navigateTo({
			url: "/pages/userInfo"
		});
	}

	function showAbout() {
		uni.navigateTo({
			url: "/pages/version"
		});
	}

	function feedback() {
	   const authorization = {
		   token: state.user.token
	   };
       Feedback(state.user.email,state.userFeedback,authorization,response=>{
		  const res = response.data;
		  if(!res.succeeded){
			  uni.showToast({
			  	title:res.message,
				icon:"none"
			  });
			  return;
		  }
		  feedbackPopup.value.close();
	   });
	}

	function seeAppHelp() {
		//#ifdef H5
		window.open(appSrc.value);
		//#endif
		//#ifndef H5
		plus.runtime.openURL(appSrc.value, res => console.log(res));
		//#endif
	}

	function beforePopupClose(e) {
		if (e.show) return;
		state.userFeedback = "";
	}
</script>

<style scoped>
	#setting {
		position: relative;
		width: 100%;
		padding-top: 3%;
		/*#ifndef H5*/
		padding-top: 4vh;
		/*#endif*/
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		height: 96vh;
		background-color: aliceblue;
	}

	#setting .avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}

	#setting .item {
		display: flex;
		height: 40px;
		width: 100%;
		font-size: 15px;
		align-items: center;
	}

	.item .item-text {
		font-size: 15px;
		margin-left: 4%;
		color: gray;
	}

	#setting .logout {
		width: 72%;
		background-color: #fff;
		font-size: 16px;
		color: rgb(0, 75, 235);
		margin-top: 3%;
	}
	
	#setting .feedback{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 74vw;
		height: 40vh;
	} 
	
	.feedback .header{
		display: flex;
		align-items: center;
		height: 30px;
		width:94%;
	}
	
	.feedback .feedback-content{
		display: flex;
		flex-direction: column;
		width: 94%;
		justify-content: center;
	}
</style>