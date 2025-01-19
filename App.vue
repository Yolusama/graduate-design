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
		notifyHabit,
		notifyTask,
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


	onMounted(() => {
		const user = uni.getStorageSync("user");
		timeOpt.value.timer = setInterval(() => {
			Get("/Api/Common/Heartbeat");
		}, timeOpt.value.expire);
		if (user == '' || user == null) return;
		notifyOpt.value.userId = user.uid;
		notifyOpt.value.trTimer = setInterval(watchReminders, notifyOpt.value.expire, notifyOpt.value.key_TR);
		notifyOpt.value.hrTimer = setInterval(watchReminders, notifyOpt.value.expire, notifyOpt.value.key_HR);
	});

	onBeforeUnmount(() => {
		clearInterval(timeOpt.value.timer);
		clearInterval(notifyOpt.value.trTimer);
		clearInterval(notifyOpt.value.hrTimer);
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
				if (today.getTime() == reminder.timing.getTime()) {
					notifyTask(reminder, res => {
						if (res.confirm) {
							return;
						}
						if (res.cancel) {
							reminder.worked = true;
							FinishTask(reminder.taskId);
						}
					});
				}
			}
			if (isHabitReminder) {
				for (let reminder of reminders.filter(r=>!r.worked)) {
					const today = new Date();
					today.setMilliseconds(0);
					const reminderTime = new Date(
						`${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${reminder.time}`);
					if (reminderTime.getTime != today.getTime()) continue;
					notifyHabit(reminder, res => {
						if (res.confirm) {
							return;
						}
						if (res.cancel) {
							reminder.worked = true;
							FinishHabit({
								finished: true,
								finishTime: today,
								day: onlyDate(today)
							});
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
		for(let reminder of reminders)
		  reminder.worked = false;
		if (isTaskReminder)
			uni.setStorageSync(notifyOpt.value.key_TR, reminders);
		if (isHabitReminder)
			uni.setStorageSync(notifyOpt.value.key_HR, reminders);
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