<template>
	<view class="k-swiper" :style="state.style" ref="swiper">
		<view @touchstart="start" @touchmove="move" @touchend="end" :style="state.scrollStyle"
		class="scroll">
		</view>
	</view>
</template>

<script setup>
	import {ref,reactive,onMounted,nextTick} from "vue";
    import { delayToRun } from "../module/Common";
	
	const pros = defineProps({ 
		backgroundColor:String,
		height:Number,
		width:Number,
	});
	const swiper = ref(null);
	const emits = defineEmits();
	const state = reactive({
		style:{
			width:"80%",
			height:"40px",
		    borderRadius:"50px",
		},
		//#ifdef H5
		scrollStyle:{
			left:"",
			height:"110%",
			width:""
		},
		//#endif
		//#ifndef H5
		scrollStyle:"",
		scrollBaseStyle:""
		//#endif
        lastXPos:0,
		canMove:false,
		startX:null
	}); 
	
	const backgroundColor = ref(pros.backgroundColor);
	const width = ref(pros.width);
	const height = ref(pros.height);
	
	function scrollWidth(){
		return (height.value*1.1)/2;
	}
	
	onMounted(function(){
		if(backgroundColor.value==undefined)
		   backgroundColor.value = "rgba(0,0,0,.5)";
		if(width.value==undefined)
		   width.value = "80%"
		else
		   state.style.width = width.value + "px";
		if(height.value==undefined)
		   height.value = "40";
		state.style.backgroundColor = backgroundColor.value;
		state.style.height = height.value + "px";
		//#ifdef H5
		state.scrollStyle.width = `${height.value*1.1}px`;
		nextTick(()=>{
			width.value = swiper.value.$el.clientWidth;
		});
		//#endif
		//#ifndef H5
		state.scrollBaseStyle = `height:${height.value*1.1}px;width:${height.value*1.1}`;
		state.scrollStyle = state.scrollBaseStyle;
		//#endif
	});
	
	function start(e){
		state.canMove = true;
		state.startX = e.touches[0].pageX;
	}
	
	function move(e){
		const point = e.touches[0];
		state.lastXPos = point.pageX - state.startX;
		if(state.canMove)
		{
			//#ifdef H5
			if(state.lastXPos>=0&&state.lastXPos<width.value - height.value)
			    state.scrollStyle.left = state.lastXPos + "px";
			if(state.lastXPos<0&&(state.startX+state.lastXPos)>0)
				state.scrollStyle.left = (state.startX+state.lastXPos-height.value) + "px";
			//#endif
			//#ifndef H5
			if(state.lastXPos>=0&&state.lastXPos<width.value - height.value)
			     state.scrollStyle = `${state.scrollBaseStyle};-webkit-transform: translate(${state.lastXPos}px,-50%);height:100%`;
			if(state.lastXPos<0&&(state.startX+state.lastXPos)>0)
			      state.scrollStyle = `${state.scrollBaseStyle};
				  -webkit-transform: translate(${state.startX+state.lastXPos-height.value}px,-50%);height:100%`;
			//#endif
		}
		
		
	}
	
	function end(e){
		const event = {};
		if(state.lastXPos<0.4*width.value)
		   {
			   //#ifdef H5
			   state.scrollStyle.left = 0;
			   //#endif
			   //#ifndef H5
			    state.scrollStyle = `${state.scrollBaseStyle};-webkit-transform: translate(0,-50%);height:100%`; 
			   //#endif 
			   event.finished = false;
		   }
		 else{
			 //#ifdef H5
			 state.scrollStyle.left = width.value - height.value + "px";
			 //#endif
			 //#ifndef H5
			  state.scrollStyle = `${state.scrollBaseStyle};-webkit-transform: translate(${width.value-height.value/2}px,-50%);height:100%`; 
			 //#endif 
			  event.finished = true;
		 }  
		emits("finish",event);
		state.canMove = false;
	}
	
	
</script>

<style>
   .k-swiper{
	   position: relative; 
	   margin-top: 12px;
	   overflow: unset;
	   display: flex;
	   justify-content: center;
   }
   
   .k-swiper .scroll{
	   position: absolute;
	   border-radius: 50%;
	   left:0;
	   top:50%;
	   /*#ifdef H5*/ 
	   transform: translateY(-50%);
	   transition:left 30ms;
	   /*#endif*/
	   /*#ifndef H5*/
	   -webkit-transform:translateY(-50%);
	   transition:-webkit-transform 30ms;
	   /*#endif*/
	   background-color: black;
   }
</style>