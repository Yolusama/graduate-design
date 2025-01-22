<template>
	<uni-popup type="center" ref="popup" @change="closePopup" border-radius="10px 10px 10px 10px" background-color="#fff">
		<view  class="modal-content">
			<view style="display:flex;justify-content: center;align-items: center;">
				<image :src="imgSrc(state.thumb)" style="height: 50px;width:50px"></image></view>
			<text  class="modal-title">{{state.title}}</text>
			<view v-html="state.content" style="font-size: 15px;"></view>
			<view class="func">
				<text class="close" @click="close" :style="{color:state.cancelColor}">{{state.cancelText}}</text>
				<k-split :width="2" :height="40" backgroundColor="black"></k-split>
				<text class="finish" @click="onFinish" :style="{color:state.confirmColor}">{{state.confirmText}}</text>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import {reactive,onMounted,ref} from "vue";
	import { imgSrc } from "../module/Request";
	
	const state =  reactive({
		title:"",
		content:"",
		thumb:"",
		cancelText:"关闭",
		confirmText:"完成",
		confirmColor:"rgb(0,75,235)",
		cancelColor:"black",
		success:null
	});
	
	const popup = ref(null);
	const emits = defineEmits();
	
	function show(options){
		popup.value.open();
		if(options==null||options==undefined)return;
		state.title = options.title;
		state.content = options.content;
		state.thumb = options.thumb;
		state.success = options.success;
	}
	
	function close(){
		popup.value.close();
	}
	
	function closePopup(e){
		if(e.show)return;
		emits("close");
	}
	
	
	function onFinish(){
		if(state.success!=null)
		  state.success({confirm:true,cancel:false});
		close();
	}
	
	
	defineExpose({
		show
	});
</script>

<style>
  .modal-content{
	  display: flex;
	  flex-flow: column nowrap;
	  width:80vw;
	  height: 24vh;
	  padding: 2%;
	  justify-content: space-between;
  }
  
  .modal-content .modal-title{
	  text-wrap: nowrap;
	  text-overflow: ellipsis;
	  font-size: 16px;
	  font-weight: 600;
	  width:100%;
  }
  
  .modal-content .func{
	  display: flex;
	  width: 100%;
	  height: 40px;
	  align-items: center;
	  justify-content: space-between;
  }
  .modal-content .func .close,.modal-content .func .finish{
	  width: 100%;
	  text-align: center;
  }
</style>