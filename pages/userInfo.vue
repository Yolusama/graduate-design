<template>
	<view id="user" v-if="state.user!=null">
        <view class="info">
			<image :src="imgSrc(state.user.avatar)" @click="changeAvatar"></image>
			<view>
				<text v-if="!state.modify.nickName">{{state.user.nickName}}</text>
			    <uni-easyinput v-model="state.user.nickName" v-if="state.modify.nickName" @input="nickNameInput"
				@change="changeNickName"></uni-easyinput>
				<uni-icons type="compose" @click="state."></uni-icons>
			</view>
		</view>
		<!--echart折线图查看任务、习惯情况-->
		<view class="task">
			<text>{{state.tasks.length}}</text>
		</view>
		<view class="habit">
			<text>{{state.tasks.length}}</text>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive
	} from 'vue';
	import { imgSrc } from '../module/Request';
	const state = reactive({
		user: null,
		modify:{
			nickName:false
		},
		imageGetMode:0
	});

	onMounted(() => {
		uni.getStorage({
			key: "user",
			success: res => {
				const data = res.data;
				state.user = {
					userId: data.uid,
				};
				for(let pro in data){
					if(pro!="uid")
					state.user[pro] = data[pro];
				}
			}
		});
	});
	
	function changeAvatar(){
		uni.chooseImage({
			count:1,
			success:res=>{
				const filePath = res.tempFilePaths[0];
			}
		});
	}
</script>

<style>

</style>