<template>
	<uni-nav-bar dark :fixed="true" shadow background-color="#007AFF" status-bar left-icon="left" left-text="返回"
			title="设置主题" @clickLeft="back" />
	<view id="subject" :style="getColor()">
		<radio-group v-model="state.selected" @change="setValue">
			<uni-list>
				<uni-list-item v-for="(item,index) in state.data" :key="index">
					<template v-slot:body>
						<view style="width: 100%;">
							<radio :value="item.value" :checked="item.value==state.selected"
							style="width: 100%;"><text>{{item.text}}</text>
							</radio>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</radio-group>
		<button type="primary" @click="changeSubject" style="width: 30%;margin-top: 10%;">确定更改</button>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onMounted
	} from 'vue';
	import {
		SubjectKey,
		subjects
	} from '../module/Subject';
	import {
		ValueText, loading
	} from '../module/Common';

	const state = reactive({
		data: [],
		selected: "default"
	});

	onMounted(() => {
		const currentSubject = uni.getStorageSync(SubjectKey);
		if (currentSubject == "" || currentSubject == null)
			state.selected = "default";
		else
			state.selected = currentSubject.name;
		const data = [];
		for (let pro in subjects)
			data.push(new ValueText(pro, ""));
		data[0].text = "经典";
		data[1].text = "麦黄";
		data[2].text = "深蓝";
		data[3].text = "湛蓝";
		data[4].text = "浅青";
        data[5].text = "宝石绿";
		data[6].text = "粉红";
		data[7].text = "紫罗兰";
		
		state.data = data;
	});
	
	function getColor(){
		return `background-color: ${subjects[state.selected].backColor}`;
	}
	
	function setValue(e){
		state.selected = e.detail.value;
	}
	
	function changeSubject(){
		loading("更改中...",()=>{
			uni.setStorage({
				key:SubjectKey,
				data: {name:state.selected,value:subjects[state.selected]}
			});
		},750);
	}
	
	function back(){
		uni.navigateBack({
			delta:1
		});
	}
</script>

<style scoped>
#subject{
	position: relative;
	padding: 3%;
	height: 100vh;
	width: 100vw;
}

#subject .board-container{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	margin-top: 4%;
	height: 70px;
}

#subject .board{
	height: 45px;
	width: 45px;
}
</style>