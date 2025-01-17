<template>
	<view class="k-habit-group">
		<view class="k-habit-group-item" v-for="(group,index) in data">
			<text>{{group.name}}</text>
			<view style="padding: 1%;">
			<uni-icons type="compose" :size="20" @click="toEdit(group)" style="margin-right: 5px;"></uni-icons>
			<uni-icons type="closeempty" @click="remove(index)" :size="20"></uni-icons>
			</view>
		</view>
		<view class="k-habit-group-item" @click="popup.open()">
			<view style="height: 40px;line-height: 40px;">
			<uni-icons type="plusempty" :size="20" color="rgb(0, 75, 235)"></uni-icons>
			<text style="color:rgb(0, 75, 235)">添加分组</text>
			</view>
		</view>
	</view>
	<uni-popup type="center" ref="popup" background-color="#fff" @change="popupClose" border-radius="8px 8px 8px 8px">
		<view class="edit-group">
			<text class="title">
				{{state.isUpdate?'编辑分组':'添加分组'}}
			</text>
			<view style="width: 90%;">
			<uni-easyinput v-model="state.groupName" @input="check" style="height: 30px;" placeholder="习惯分组名称"
			focus>
			</uni-easyinput>
			</view>
			<view class="func-text">
				<text @click="createGroup" :style="state.canAdd?'':'opacity:0.3'">确定</text>
				<text @click="popup.close()" style="margin-left: 15px;margin-right: 15px;">取消</text>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import { reactive,ref,onMounted } from 'vue';
    import { CreateGroup, RemoveGroup } from '../api/Habit';
	const pros = defineProps({
		modelValue:Array
	});
	const emits = defineEmits();
	const popup = ref(null);
	const data = ref(pros.modelValue);
	const state = reactive({
		groupName:"",
		canAdd:false,
		userId:"",
		isUpdate:false
	});
	
	onMounted(function(){
		state.userId = uni.getStorageSync("user").uid;
	});
	
	function toEdit(group){
		state.groupName = group.name;
		state.isUpdate = true;
		popup.value.open();
	}
	
	function remove(index){
		const group = data.value[index];
		RemoveGroup(group.id,state.userId,group.code,response=>{
			const res = response.data;
			if(!res.succeeded){
				uni.showToast({
					title:res.message,
				    icon:"none"
				});
				return;
			}
			data.value.splice(index,1);
			emits("modelValue:update",data.value);
		})
	}
	
	function createGroup(){
		if(!state.canAdd)return;
		CreateGroup(state.userId,state.groupName,response=>{
			const res = response.data;
			if(!res.succeeded){
				uni.showToast({
					title:res.message,
					icon:"none"
				});
				return;
			}
			const group = {
				id:res.data,
				name:state.groupName,
			    userId:state.userId
			};
			data.value.push(group);
			popup.value.close();
			emits("modelValue:update",data.value);
		});
	}
	
	function check(value){
		value=value.trimStart().trimEnd();
		state.canAdd = value.length>0;
	}
	
	function popupClose(e){
		if(e.show)return;
		state.groupName = "";
		state.canAdd = false;
		state.isUpdate = false;
	}
		
</script>

<style>
   .k-habit-group{
	   position: relative;
	   width:100vw;
	   height: 96vh;
	   padding: 1%;
	   background-color: aliceblue;
   }
   .k-habit-group-item{
	   display: flex;
       justify-content: space-between;
	   padding-left: 4%;
	   padding-right: 4%;
	   padding-top: 3%;
	   padding-bottom: %3;
	   align-items: center;
	   background-color: #fff;
	   height: 40px;
   }
   .edit-group{
	   display: flex;
       align-items: center;
	   justify-content: center;
	   flex-direction: column;
	   height: 20vh;
	   width: 70vw;
   }
   .edit-group .func-text
   { 
	display: flex;
	width: 90%;
   	font-size: 14px;
   	color: rgb(0, 75, 235);
   	justify-content: flex-end;
	margin-top: 12px;
   }
   .edit-group .title{
	   margin-bottom: 10px;
	   font-size: 18px;
	   font-weight: 600;
	   text-align: left;
	   width: 90%;
   }
</style>