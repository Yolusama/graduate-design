<template>
	<view id="setting" v-if="state.user!=null">
		<view @click="goToSelfInfo">
			<image :src="imgSrc(state.user.avatar)"></image>
			<text>{{state.user.nickName}}</text>
		</view>
		<uni-list>
			<uni-list-item show-arrow @click="showAbout">
				<tempate v-slot:body>
					<view>
						<uni-icons type="flag-fill"></uni-icons>
						<text>关于</text>
					</view>
				</tempate>
			</uni-list-item>
		</uni-list>
		<button @click="logout" style="color: red;">退出登录</button>
	</view>
</template>

<script setup>
import { reactive,onMounted } from 'vue';
import { imgSrc } from '../module/Request';
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
</script>

<style>

</style>
