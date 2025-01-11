<template>
	<view class="k-time-counter">
		<text v-if="state.date!=undefined">{{state.timeStr}}</text>
	</view>
</template>

<script setup>
	import {ref,reactive,onMounted, onBeforeUnmount} from "vue";
	
	const pros = defineProps({
		date:Date,
		interval:Number,
		countdown:Boolean
	});
	
	const date = ref(pros.date);
	const interavl = ref(pros.interval);
	const countdown = ref(pros.countdown);
	const state = reactive({
		timer:0,
		date:undefined,
		stopped:false,
		timeStr:""
	});
	
	onMounted(()=>{
		if(countdown.value == undefined)
		   countdown.value = false;
		if(date.value == undefined)
		   date.value = new Date();
		if(interavl.value == undefined)
		   interavl.value = 1000;
		state.date = date.value;
		state.timeStr = timeStr();
		state.timer = setInterval(()=>{
			if(state.stopped)return;
			const second = state.date.getSeconds();
			if(countdown.value)
			   state.date.setSeconds(second-1);
			else
			   state.date.setSeconds(second+1); 
			state.timeStr = timeStr();	
		},interavl.value);
	});
	
	function timeStr(){
		const str = state.date.toLocaleTimeString();
		//#ifndef H5	
		return str.substring(0,str.indexOf(' '));
		//#endif
	   //#ifdef H5
	   return str;
	   // #endif
	}
	
	onBeforeUnmount(()=>{
		state.stopped = true;
		clearInterval(state.timer);
	});
	
	function start(){
		state.stopped = false;
		state.date = new Date();
	}
	function stop(){
		state.stopped = true;
	}
	
	defineExpose({
		start,stop
	});
</script>

<style>

</style>