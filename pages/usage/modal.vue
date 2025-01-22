<template>
	<view id="modal">
		<habit-reminder-modal ref="modal" @close="closing"></habit-reminder-modal>
	</view>
</template>

<script  setup>
	import {ref,onMounted, nextTick,onUnmounted} from "vue";
    import { ModalDataKey } from "../../module/KShowModal";
	import { FinishHabit } from "../../api/Habit";
	import { onlyDate } from "../../module/Common";
	
	
	onMounted(()=>{
		var options = uni.getStorageSync(ModalDataKey);
		if(options==''||options==null)
		    options = null;
		nextTick(()=>{
			if(options!=null)
			   options.success =res=> notifyHabitCallback({habitId:options.habitId},res);
			modal.value.show(options);
		}); 
	});
	
	function notifyHabitCallback(reminder, res) {
		if (res.cancel) {
			return;
		}
		if (res.confirm) {
			const today = new Date();
			FinishHabit({
				habitId: reminder.habitId,
				finished: true,
				finishTime: today,
				day: onlyDate(today)
			});
		}
	}
	
	
	const modal = ref(null);
	
	function closing(){
		uni.removeStorage({
			key:ModalDataKey,
			success:res=>{
				uni.navigateBack({
					delta:1,
					animationType:"none"
				});
			}
		});
	}
	
	onUnmounted(()=>{
		const options = uni.getStorageSync(ModalDataKey);
		if(options!=''||options!=null)
		   uni.removeStorageSync(ModalDataKey);
	});
</script>

<style>

</style>
