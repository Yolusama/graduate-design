<template>
	<view id="setting" v-if="state.user!=null">
		<uni-list style="width: 92%;">
			<uni-list-item show-arrow >
				<template v-slot:body>
					<view class="item" @click="goToSelfInfo">
						<image :src="imgSrc(state.user.avatar)" class="avatar"></image>
						<text class="item-text">{{state.user.nickname}}</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item show-arrow >
				<template v-slot:body>
					<view class="item">
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
		</uni-list>
		<button @click="logout" class="logout">退出登录</button>
	</view>
</template>

<script setup>
import { reactive,onMounted } from 'vue';
import { imgSrc } from '../module/Request';
import { Logout } from '../api/UserInfo';
	const state = reactive({
		user:null
	});
	
	onMounted(()=>{
		const user = uni.getStorage({
			key:"user",
			success:res=>{
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
	
	function goToSelfInfo(){
		uni.navigateTo({
			url:"/pages/userInfo"
		});
	}
	
	function showAbout(){
		uni.navigateTo({
			url:"/pages/version"
		});
	}
</script>

<style scoped>
	#setting{
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
	
	#setting .avatar{
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}
	
	#setting .item{
		display: flex;
		height: 40px;
		width: 100%;
		font-size: 15px;
		align-items: center;
	}
	
	.item .item-text{
		font-size: 15px;
		margin-left: 4%;
		color: gray;
	}
	
	#setting .logout{
		width: 72%;
		background-color: #fff;
		font-size: 16px;
		color: rgb(0, 75, 235);
		margin-top: 3%;
	}
</style>
