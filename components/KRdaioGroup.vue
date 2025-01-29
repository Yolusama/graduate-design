<template>
		<view class="k-popup-radio">
			<checkbox-group @change="select" v-if="checkMode">
				<uni-list>
					<uni-list-item v-for="(item,index) in data" :key="index">
						<template v-slot:body>
							<label class="check" v-if="checkMode">
								<checkbox :value="item.value" style="transform: scale(0.7);" 
								:checked="model.indexOf(item.value)>0">	
								</checkbox>
								<text>{{item.text}}</text>
							</label>
						</template>
					</uni-list-item>
				</uni-list>	
			</checkbox-group>
			<radio-group @change="select"  v-if="!checkMode">
				<uni-list>
					<uni-list-item v-for="(item,index) in data" :key="index">
						<template v-slot:body>
							<label class="radio" v-if="!checkMode" @click="itemClick">
								<text>{{item.text}}</text>
								<radio :value="item.value" style="transform: scale(0.7);" :checked="item.value==modelValue"></radio>
							</label>
						</template>
					</uni-list-item>
						<uni-list-item v-if="containDef">
							<template v-slot:body>
								<label class="radio" v-if="!checkMode">
									<text>自定义</text>
									<radio :value="data.length" style="transform: scale(0.7);" ref="defRadio" 
									:checked="modelValue==data.length"></radio>
								</label>
							</template>
						</uni-list-item>
				   </uni-list>		
			</radio-group>
		</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';

	const emit = defineEmits(["change","itemClick"]);
	const pros = defineProps({
		data: Array,
		modelValue:Number,
		containDef:Boolean,
		checkMode:Boolean,
	});  
	const data = ref(pros.data);
    const containDef = ref(pros.containDef);
	const checkMode = ref(pros.checkMode);
	const defRadio = ref(null);
	const model = ref(pros.modelValue);
	
	function select(e) {
		const detail = e.detail;
        emit("update:modelValue",detail.value);
		var item = {};
		item.value = detail.value;
		if(containDef.value){
			item.isDef = detail.value == data.value.length;
		}
		emit("onChange",item);
	}
	
	function itemClick(){
		emit("itemClick");
	}

	onMounted(function(){
		if(containDef.value == undefined)
		   containDef.value = false;
		if(checkMode.value == undefined)
		   checkMode.value = false;
		if(checkMode.value)
		   model.value = [];
	});
</script>

<style>
	.k-popup-radio{
		position: relative;
		width: 75vw;
	}
	.k-popup-radio .radio,.k-popup-radio .check {
		display: flex;
		width: 100%;
		justify-content: space-between;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
	}
	.k-popup-radio .check{
		justify-content: flex-start;
	}
</style>