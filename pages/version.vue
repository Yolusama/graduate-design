<template>
	<view id="version">
		<view class="info">
			<view style="display: flex;align-items: center;justify-content: center;">
				<image :src="imgSrc(state.appInfo.icon)" class="icon"></image>
				<text class="app-name">{{state.appInfo.name}}</text>
			</view>
			  <text class="version-number">版本：{{state.version.number}}</text>
		</view>
		
		<uni-list style="width: 92%;margin-top: 5px;margin-bottom: 7px;">
			<uni-list-item show-arrow title="检查更新"></uni-list-item>
		</uni-list>
		<view class="tail">
			<text>版号：{{state.appInfo.code}}</text>
		</view>
	</view>
</template>

<script setup>
   import { reactive,ref,onMounted } from 'vue';
   import { GetCurrentVersion, appInfo } from '../api/Version';
   import { imgSrc } from '../module/Request';
   
   const state = reactive({
	   appInfo:appInfo,
	   version:{
		   number:"未知"
	   }
   });
   
   onMounted(()=>{
	  GetCurrentVersion(response=>{
		  const res = response.data;
		  if(!res.succeeded){
			  uni.showToast({
			  	title:res.message,
				icon:"none"
			  });
			  return;
		  }
		  state.version = res.data;
	  });
   });
</script>

<style scoped>
  #version{
	  position: relative;
	  width:100%;
	  height: 94vh;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
  }
  
  #version .info{
	  display: flex;
	  flex-direction: column;
	  width: 100%;
	  align-items: center;
  }
  
  #version .icon{
	  width: 60px;
	  height: 60px;
	  border-radius: 50%;
	  margin-top: 12px;
  }
  
  #version .app-name{
	  font-size:14px;
	  color:rgb(0,75,235);
	  margin-left: 6px;
  }
  
  #version .version-number{
	  color: gray;
	  font-size: 15px;
  }
  
  #version .tail{
	  position: absolute;
	  bottom: 3%;
	  font-weight: 600;
  }
</style>
