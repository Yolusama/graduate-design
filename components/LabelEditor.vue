<template>
	<uni-popup ref="popup" type="bottom" style="z-index: 1001;" @change="closePopup">
		<view class="label-edit">
			<view class="header">
				<uni-icons type="closeempty" color="black" :size="24" @click="popup.close()">></uni-icons>
				<text class="title">
					{{getLabelText()}}
				</text>
				<uni-icons type="checkempty" color="black" :size="24" @click="editLabel"></uni-icons>
			</view>
			<view>
				<image :src="state.imgShow" @click="uploadImage"></image>
			</view>
			<uni-easy-input v-model="state.label.name" :placeholder="isList?'清单名':'标签名'" focus></uni-easy-input>
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
		DefaultListIcon
	} from '../module/Common';
	const popup = ref(null);
	const pros = defineProps({
		isList: Boolean,
		labelName: String
	});
	const emits = defineEmits(["created", "close", "updated"]);
	const state = reactive({
		isLabelUpdate: false,
		label: {},
		selectedFile: null,
		imgShow: ""
	});
	const isList = ref(pros.isList);
	const label = ref(pros.label);

	onMounted(() => {
		if (label.value != undefined)
			state.label = label.value;
		else {
			const user = uni.getStorageSync("user");
			state.label = {
				userId: user.uid,
				name: "",
				isList: isList.value,
				icon: isList.value ? DefaultListIcon : DefaultLabelIcon
			};
		}
		state.imgShow = imgSrc(state.label.icon);

	});

	function closePopup(e) {
		if (e.show) return;
		emits("close");
	}

	function getLableText() {
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
	
	function uploadImage(){
		uni.chooseImage({
			count:1,
			success:result=>{
				const fileUrl = result.tempFilePaths[0];
				state.thumbShow = fileUrl;
				state.selectedImgFile = fileUrl;
			}
		});
	}

	function editLabel() {
        if(state.label.name.length==0)return;
		
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
		height: 100vh;
		padding: 2%;
	}

	.label-edit .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 30px;
	}

	.label-edit .header .title {
		font-size: 18px;
		color: black;
		font-weight: 600;
	}
</style>