<script setup>
	import {
		onMounted,
		onBeforeUnmount,
		ref
	} from 'vue';
	import {
		Get, audioSrc
	} from './module/Request';
	import {
		FinishTask,
		GetCurrentTaskReminders
	} from './api/Task';
	import {
		CurrentAudioKey,
		HabitReminderKey,
		TaskReminderKey,
		getDateStr,
		notifyHabit,
		notifyHabitWithModal,
		notifyTask,
		notifyTaskWithModal,
		playNotifyAudio,
	} from './module/Common';
	import {
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
		//#ifdef APP-PLUS
		uni.onAppHide(function() {
			isBackGround.value = true;
		});

		uni.onAppShow(function() {
			isBackGround.value = false;
		});


		/* uni.onPushMessage(res=>{
			console.log(res);
			 const page = getCurrentPages()[0];
			 uni.reLaunch({
			 	url:'/'+page.route
			 });
		   });*/
		plus.push.addEventListener("click", msg => {
			//点击通知信息回到应用需要手机设置后台弹窗权限
			const reminder = msg.payload;
			uni.reLaunch({
				url: reminder.route,
				success: res => {
					plus.push.remove(msg);
					playAudio();
					if (reminder.isTaskReminder)
						notifyTaskWithModal(reminder, notifyTaskCallback);
					else if(reminder.isHabitReminder)
						notifyHabitWithModal(reminder);
				}
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
		});
		//#endif
	}); 

	onBeforeUnmount(() => {
		clearInterval(timeOpt.value.timer);
		clearInterval(notifyOpt.value.trTimer);
		clearInterval(notifyOpt.value.hrTimer);
		//#ifdef APP-PLUS
		//uni.offPushMessage();
		//#endif
	});

	function watchReminders(key) {
		const user = uni.getStorageSync("user");
		if(user==""||user==null)return;
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
			for (let reminder of reminders) {
				const today = new Date();
				today.setMilliseconds(0);
				reminder.timing = new Date(reminder.timing);
				if (!reminder.worked && today.getTime() == reminder.timing.getTime()) {
					//#ifdef H5
					notifyTask(reminder, notifyTaskCallback,playAudio);
					//#endif
					//#ifdef APP-PLUS
					notifyTask(isBackGround.value, reminder, notifyTaskCallback,playAudio);
					//#endif
				}
			}
		}
		if (isHabitReminder) {
			for (let reminder of reminders) {
				const today = new Date();
				today.setMilliseconds(0);
				const reminderTime = new Date(`${getDateStr(today)} ${reminder.time}`);
				if (!reminder.worked && (today.getTime() >= reminderTime.getTime() &&
						today.getTime() < new Date(reminderTime).setMinutes(reminderTime.getMinutes() + 1))) {
					reminder.worked = true;
					uni.setStorage({
						key:notifyOpt.value.key_HR,
						data:reminders,
						success:res=>{ 
							//#ifdef H5
							if(state.audio.value!=0) playNotifyAudio(audioSrc(state.audio.fileName));
							notifyHabit(reminder,playAudio);
							//#endif
							//#ifdef APP-PLUS
							notifyHabit(isBackGround.value, reminder,playAudio);
							//#endif
						} 
					});
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
		for (let reminder of reminders) {
			reminder.worked = false;
			reminder.isTaskReminder = isTaskReminder;
			reminder.isHabitReminder = isHabitReminder;
		}
		if (isTaskReminder)
			uni.setStorageSync(notifyOpt.value.key_TR, reminders);
		if (isHabitReminder)
			uni.setStorageSync(notifyOpt.value.key_HR, reminders);
	}

	function notifyTaskCallback(reminder, res) {
		if (res.confirm) {
			return;
		}
		if (res.cancel) {
			reminder.worked = true;
			FinishTask(reminder.taskId);
		}
	}
	
	function playAudio(){
		const audio = uni.getStorageSync(CurrentAudioKey);
		if(audio.value==0)return;
		playNotifyAudio(audioSrc(audio.fileName));
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
	
	.quadrant-1 {
		color: red;
	}
	
	.quadrant-2 {
		color: rgb(255, 195, 0);
	}
	
	.quadrant-3 {
		color: blue;
	}
	
	.quadrant-4 {
		color: springgreen;
	}
	/*每个页面公共css */
</style>