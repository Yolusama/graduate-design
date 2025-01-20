<!--#ifdef APP-PLUS-->
<template>
	<uni-popup type="top" ref="popup" @change="closePopup" >
		<view>
			<view>
			<image src="./static/icon.png" style="height: 30px;width:30px"></image>
			<text>{{reminder.title}}</text>
			</view>
		</view>
	</uni-popup>
</template>
<!--#endif-->
<script setup>
	import {
		onMounted,
		onBeforeUnmount,
		ref
	} from 'vue';
	import {
		Get
	} from './module/Request';
	import {
		FinishTask,
		GetCurrentTaskReminders
	} from './api/Task';
	import {
		HabitReminderKey,
		TaskReminderKey,
		delayToRun,
		notifyHabit,
		notifyTask,
		notifyTaskWithModal,
		onlyDate
	} from './module/Common';
	import {
		FinishHabit,
		GetCurrentHabitReminders
	} from './api/Habit';
	const timeOpt = ref({
		timer: 0,
		expire: 1000 * 60 * 3
	});

	const notifyOpt = ref({
		trTimer: 0,
		hrTimer: 0,
		expire: 1000,
		key_TR: TaskReminderKey,
		key_HR: HabitReminderKey,
		userId: ""
	});
	
	//#ifdef APP-PLUS
	const currentReminder = ref(null);
	const isBackGround = ref(false);
	//#endif
    

	onMounted(() => {
		const user = uni.getStorageSync("user");
		timeOpt.value.timer = setInterval(() => {
			Get("/Api/Common/Heartbeat");
		}, timeOpt.value.expire);
		if (user == '' || user == null) return;
		notifyOpt.value.userId = user.uid;
		notifyOpt.value.trTimer = setInterval(watchReminders, notifyOpt.value.expire, notifyOpt.value.key_TR);
		notifyOpt.value.hrTimer = setInterval(watchReminders, notifyOpt.value.expire, notifyOpt.value.key_HR);
		
		uni.onAppHide(function(){
			isBackGround.value = true;
		});
		
		uni.onAppShow(function(){
			isBackGround.value = false;
		});
		
		//#ifdef APP-PLUS
		 /* uni.onPushMessage(res=>{
			console.log(res);
			 const page = getCurrentPages()[0];
			 uni.reLaunch({
			 	url:'/'+page.route
			 });
		   });*/
		   plus.push.addEventListener("click",msg=>{
			   //点击通知信息回到应用需要时间设置后台弹窗权限
			   const reminder = msg.payload;
			   if(isBackGround.value)
				delayToRun(()=>uni.reLaunch({
			    	url:reminder.route,
					success:res=>{
						plus.push.remove(msg);
						if(reminder.isTaskReminder)
						   notifyTaskWithModal(reminder,notifyTaskCallback);
					}
			    }),notifyOpt.value.expire);
				else
				 notifyTaskWithModal(reminder,notifyTaskCallback);
		   });
		   plus.push.addEventListener("receive", function(msg) {   
		   		var platform = uni.getSystemInfoSync().platform;
		   		if(platform == "ios"){
		   			//ios平台应用在前台时,不能收到通知消息,只能走透传,在创建一条本地消息
		   			if (msg.type == "receive"){// 这里判断触发的来源，否则一直推送。
		   				var content = JSON.parse(msg.content); 
		   				plus.push.createMessage(content.content, JSON.stringify(msg.payload), { title: content.title });
		   			}
		   		}else if (platform == 'android'){
		   			plus.push.createMessage(msg.content, JSON.stringify(msg.payload), { title: msg.title });
		   			
		   		}
		   	}, false); 
             
		//#endif
	});

	onBeforeUnmount(() => {
		clearInterval(timeOpt.value.timer);
		clearInterval(notifyOpt.value.trTimer);
		clearInterval(notifyOpt.value.hrTimer);
		//#ifdef APP-PLUS
		uni.offPushMessage();
		//#endif
	});

	function watchReminders(key) {
		const reminders = uni.getStorageSync(key);
		const isTaskReminder = key == notifyOpt.value.key_TR;
		const isHabitReminder = key == notifyOpt.value.key_HR;
		if (reminders === "" || reminders == null) {
			const current = new Date();
			current.setMilliseconds(0);
			if (isHabitReminder) {
				current.setHours(0);
				current.setMinutes(0);
				current.setSeconds(0);
			}
			if (isTaskReminder)
				GetCurrentTaskReminders(notifyOpt.value.userId, current, response => getRemindersCallback(response,
					reminders,
					true, false));
			if (isHabitReminder)
				GetCurrentHabitReminders(notifyOpt.value.userId, current, response => getRemindersCallback(response,
					reminders, false, true));
		}
		if (isTaskReminder) {
			for (let reminder of reminders.filter(r=>!r.worked)) {
				const today = new Date();
				today.setMilliseconds(0);
				reminder.timing = new Date(reminder.timing);
				if (today.getTime() == reminder.timing.getTime())
					notifyTask(reminder,notifyTaskCallback);
			}
			if (isHabitReminder) {
				for (let reminder of reminders.filter(r=>!r.worked)) {
					const today = new Date();
					today.setMilliseconds(0);
					const reminderTime = new Date(
						`${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${reminder.time}`);
					if (!reminder.worked||(reminderTime.getTime < today.getTime()||
					reminderTime.getTime()>=new Date(today).setMinutes(today.getMinutes()+1)))
					    continue;
					notifyHabit(reminder,notifyHabitCallback);
				}
			}
		}
	}

	function getRemindersCallback(response, reminders, isTaskReminder, isHabitReminder) {
		const res = response.data;
		if (!res.succeeded) {
			uni.showToast({
				title: res.message,
				icon: "none"
			});
			return;
		}
		reminders = res.data;
		for(let reminder of reminders)
		  {
			  reminder.worked = false;
			  //#ifdef APP-PLUS
			  reminder.isTaskReminder = isTaskReminder;
			  reminder.isHabitReminder = isHabitReminder;
			  //#endif
		  }
		if (isTaskReminder)
			uni.setStorageSync(notifyOpt.value.key_TR, reminders);
		if (isHabitReminder)
			uni.setStorageSync(notifyOpt.value.key_HR, reminders);
	}
	
	function notifyTaskCallback(reminder,res){
		if (res.confirm) {
			return;
		}
		if (res.cancel) {
			reminder.worked = true;
			FinishTask(reminder.taskId);
		}
	}
	
	function notifyHabitCallback(reminder,res){
		if (res.confirm) {
			return;
		}
		if (res.cancel) {
			reminder.worked = true;
			FinishHabit({
				habitId:reminder.habitId,
				finished: true,
				finishTime: today,
				day: onlyDate(today)
			});
		}
	}
</script>

<style>
	#app {
		position: relative;
	}

	.center {
		display: flex;
		align-items: center;
	}

	/*每个页面公共css */
</style>