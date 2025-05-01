<template>
	<view id="hidden-label" :style="{backgroundColor:subject.backColor}">
		<uni-nav-bar @clickLeft="goBack" left-text="返回" left-icon="left" :border="false"></uni-nav-bar>
		<view v-if="state.lists.length==0&&state.labels.length==0" class="no-content" :style="{color:subject.textColor}">
			暂无内容
		</view>
		<view class="list-content" v-if="state.lists.length>0">
			<view class="content-head">
				<text>清单</text>
				<text style="color: gray;font-size: 13px;font-weight: 400;">{{state.lists.length}}</text>
			</view>
			<scroll-view class="content" scroll-y>
				<view class="list" v-for="(list,index) in state.lists" @click="openToEdit(index,true)">
					<view class="info">
						<image class="image" :src="imgSrc(list.icon)"></image>
						<text class="info-text">{{list.labelName}}</text>
					</view>
					<view class="show" @click.stop="showLabel(index,true)">显示</view>
				</view>
			</scroll-view>
		</view>
		<view class="label-content" v-if="state.labels.length>0">
			<view class="content-head">
				<text>标签</text>
				<text style="color: gray;font-size: 13px;font-weight: 400;">{{state.labels.length}}</text>
			</view>
			<scroll-view class="content" scroll-y>
				<view class="label" v-for="(label,index) in state.labels" @click="openToEdit(index,false)">
					<view class="info">
						<image class="image" :src="imgSrc(label.icon)"></image>
						<text class="info-text">{{label.labelName}}</text>
					</view>
					<view class="show" @click.stop="showLabel(index,false)">显示</view>
				</view>
			</scroll-view>
		</view>
		<label-editor ref="labelEditorOf" :isLabelUpdate="state.label!=null" :label="state.label" v-if="state.show"
			@updated="labelUpdated" @close="labelEditorClose"></label-editor>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted,
		nextTick
	} from 'vue';
	import {
		GetHiddenLabels, HideOrShowLabel
	} from '../api/Index';
	import {
		imgSrc
	} from '../module/Request';
import { delayToRun } from '../module/Common';
import { SubjectStyle, getSubject } from '../module/Subject';

	const labelEditorOf = ref(null);
	const subject = ref(new SubjectStyle());

	const state = reactive({
		labels: [],
		lists: [],
		userId: "",
		label: null,
		show: false
	});

	onMounted(() => {
		const user = uni.getStorageSync("user");

		state.userId = user.uid;
		getLabels();
		subject.value = getSubject();
	});

	function getLabels() {
		GetHiddenLabels(state.userId, response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				return;
			}
			state.labels = res.data.filter(l => !l.isList);
			state.lists = res.data.filter(l => l.isList);
		});
	}
	
	function showLabel(index,isList){
		const label = isList?state.lists[index]:state.labels[index];
		HideOrShowLabel(state.userId,label.labelId,true,response=>{
			const res = response.data;
			if(!res.succeeded){
				uni.showToast({
					title:res.message,
					icon:"none"
				});
				return;
			}
			if(isList)
			   state.lists.splice(index,1);
			else
			   state.labels.splice(index,1);
		});
	}
	
	function openToEdit(index,isList){
		const label = isList ? state.lists[index]:state.labels[index];
		state.label = label;
		state.label.index = index;
		state.show = true;
		nextTick(()=>{
			labelEditorOf.value.open();
		});
	}
	
	function labelUpdated(e){
		const item = e.item;
		const index = e.index;
		if(item.isList)
		   state.lists[index] = item;
		else
		   state.labels[index] = item;
	}
	
	function labelEditorClose(){
		delayToRun(()=>{
			state.show = false;
			state.label = null;
		},750);
	}

	function goBack() {
		uni.navigateBack({
			delta: 1
		});
	}
</script>

<style scoped>
	#hidden-label {
		position: relative;
		width: 100vw;
		height: 94vh;
		/*#ifndef H5*/
		padding-top: 3vh;
		/*#endif*/
	}

	#hidden-label .list-content,
	#hidden-label .label-content {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		align-items: center;
		max-height: 45vh;
		padding-left: 2%;
		padding-right: 2%;
	}

	#hidden-label .no-content {
		height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	#hidden-label .list,
	#hidden-label .label {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		height: 50px;
		background-color: #fff;
		margin-bottom: 2%;
		border-radius: 7px;
		justify-content: space-between;
	}

	#hidden-label .image {
		width: 40px;
		height: 40px;
	}

	#hidden-label .list .info,
	#hidden-label .label .info {
		display: flex;
		margin-left: 2%;
		align-items: center;
	}

	#hidden-label .info-text {
		font-size: 15px;
		max-width: 60vw;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		margin-left: 5px;
	}

	#hidden-label .show {
		color: rgb(0, 75, 255);
		font-size: 14px;
		text-align: right;
		margin-right: 3%;
	}

	#hidden-label .content-head {
		display: flex;
		align-items: center;
		margin-bottom: 1%;
		width:96%;
		font-size: 16px;
		font-weight: 600;
		justify-content: space-between;
	}
</style>