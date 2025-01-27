<template>
	<uni-popup ref="popup" type="left" @change="closePopup" background-color="#fff">
		<view class="label-edit">
			<view class="header">
				<uni-icons type="closeempty" color="black" :size="24" @click="popup.close()"></uni-icons>
				<text class="title">
					{{getLabelText()}}
				</text>
				<uni-icons type="checkmarkempty" :color="state.canCreate?'black':'lightgray'" :size="24"
					@click="editLabel"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;">
				<image :src="state.imgShow" @click="uploadImage" style="width: 80px;height:80px;"></image>
				<text class="upload" @click="uploadImage">上传图片</text>
			</view>
			<view style="width: 92%;margin-top: 3%;">
				<uni-easyinput v-model="state.label.labelName" :placeholder="isList?'清单名':'标签名'" @change="check"
					@input="input"></uni-easyinput>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from 'vue';
	import {
		imgSrc
	} from '../module/Request';
	import {
		DefaultLabelIcon,
		DefaultListIcon,
		copy,
		loading
	} from '../module/Common';
	import {
		CheckLabelNameExists,
		CreateLabel,
		UpdateLabel
	} from '../api/Index';
	const popup = ref(null);
	const pros = defineProps({
		isList: Boolean,
		labelName: String,
		isLabelUpdate: Boolean,
		label:Object
	});
	const emits = defineEmits(["created", "close", "updated"]);
	const state = reactive({
		isLabelUpdate: false,
		label: {},
		selectedFile: null,
		imgShow: "",
		canCreate: false,
		userId:""
	});
	const isList = ref(pros.isList);
	const label = ref(pros.label);
	const isLabelUpdate = ref(pros.isLabelUpdate);

	onMounted(() => {
		if (isLabelUpdate.value == undefined)
			isLabelUpdate.value = false;
		const user = uni.getStorageSync("user");
		state.userId = user.uid;
		if (label.value != undefined)
			state.label = label.value;
		else {
			state.label = {
				userId: state.userId,
				labelName: "",
				isList: isList.value,
				icon: isList.value ? DefaultListIcon : DefaultLabelIcon
			};
		}
		state.isLabelUpdate = isLabelUpdate.value;
		if(isLabelUpdate.value)
		   state.canCreate = true;
		state.imgShow = imgSrc(state.label.icon);
	});

	function closePopup(e) {
		if (e.show) return;
		emits("close");
		state.label = {};
	}

	function getLabelText() {
		if (isList.value) {
			if (state.isLabelUpdate)
				return "更新清单";
			else
				return "添加清单";
		} else {
			if (state.isLabelUpdate)
				return "更新标签";
			else
				return "添加标签";
		}
	}

	function uploadImage() {
		uni.chooseImage({
			count: 1,
			success: result => {
				const fileUrl = result.tempFilePaths[0];
				state.imgShow = fileUrl;
				state.selectedFile = fileUrl;
			}
		});
	}

	function editLabel() {
		if (!state.canCreate) return;
		if (!state.isLabelUpdate) {
			CreateLabel(state.label, state.selectedFile, response => {
				const res = JSON.parse(response.data);
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
					return;
				}
				state.label.icon = res.data.item2;
				const label = {};
				label.id = res.data.item1;
				copy(state.label, label);
				emits("created", {
					item: label
				});
				popup.value.close();
			});
		} else {
			UpdateLabel(state.label, state.selectedFile, response => {
				const res = JSON.parse(response.data);
				if (!res.succeeded) {
					uni.showToast({
						title: res.message,
						icon: "none"
					});
					return;
				}
				state.label.icon = res.data;
				const label = {};
				copy(state.label, label);
				emits("updated", {
					item: label,
					index: state.label.index
				});
				popup.value.close();
			});
		}
	}

	function check(e) {
		if (isList.value) return;
		CheckLabelNameExists(e,state.userId,response => {
			const res = response.data;
			if (!res.succeeded) {
				uni.showToast({
					title: res.message,
					icon: "none"
				});
				state.label.name = e = "";
				return;
			}
			if (res.data)
				state.label.name = e = "";
		});
	}

	function input(e) {
		state.canCreate = e.length > 0;
	}

	function open() {
		popup.value.open();
	}

	defineExpose({
		open
	});
</script>

<style scoped>
	.label-edit {
		position: relative;
		height: 94vh;
		width: 100vw;
		padding: 2%;
		/*#ifndef H5*/
		padding-top: 5%;
		/*#endif*/
	}

	#app .label-edit .header {
		display: flex;
		width: 94%;
		justify-content: space-between;
		align-items: center;
		height: 30px;
	}

	.label-edit .header .title {
		font-size: 18px;
		color: black;
		font-weight: 600;
	}
	
	.label-edit .upload{
		width:80px;
		height: 80px;
		line-height: 80px;
		text-align: center;
		border:1px dashed gray;
		font-size: 15px;
		color:rgb(0,75,235);
		margin-left: 2%;
	}
</style>