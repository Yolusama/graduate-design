<template>
	<view class="k-split" >
		<view :style="style"></view>
	</view>
</template>

<script setup>
	import { onMounted,ref } from 'vue';
	const pros = defineProps({
		width:Number,
		height:Number,
		backgroundColor:String,
		boderRadius:Number,
		unit:String
	});
	const width = ref(pros.width);
	const height = ref(pros.height);
	const backgroundColor = ref(pros.backgroundColor);
	const borderRadius = ref(pros.boderRadius);
	const unit = ref(pros.unit);
	//#ifdef H5
	const style = ref({});
	//#endif
	//#ifndef H5
	const style = ref("");
	//#endif
	onMounted(()=>{
		if(unit.value==undefined)
		   unit.value = "px";
		if(width.value==undefined)
             width.value = 0;
	    if(height.value == undefined)
		     height.value = 0;
		if(backgroundColor.value==undefined)
		   backgroundColor.value = "#2979ff";
		if(borderRadius.value == undefined)
		   borderRadius.value = 10;
		//#ifdef H5
		style.value.width = width.value + unit.value;
		style.value.height = height.value + unit.value;
		style.value.backgroundColor = backgroundColor.value;
		style.value.borderRadius = borderRadius.value + unit.value;
		//#endif
		//#ifndef H5
		style.value = `width:${width.value+unit.value};height:${height.value+unit.value};
		background-color:${backgroundColor.value};border-radius:${borderRadius.value+unit.value}`;
		//#endif
	});
</script>

<style>
   .k-split{
	   margin-left:5px;
	   margin-right: 5px;
   }
</style>