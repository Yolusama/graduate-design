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
		notifyHabit,
		notifyTask,
		onlyDate
	} from './module/Common';
	import {
		FinishHabit
	} from './api/Habit';
	const timeOpt = ref({
		timer: 0,
		expire: 1000 * 60 * 3
	});

	const notifyOpt = ref({
		trTimer: 0,
		hrTimer: 0,
		expire: 1000,
		key_TR: "task-reminders",
		key_HR: "habit-reminders"
	});


	onMounted(() => {
		const user = uni.getStorageSync("user");
		timeOpt.value.timer = setInterval(() => {
			Get("/Api/Common/Heartbeat");
		}, timeOpt.value.expire);

		notifyOpt.value.trTimer = setInterval(watchReminders, notifyOpt.value.expire, notifyOpt.value.key_TR);
		notifyOpt.value.hrTimer = setInterval(watchReminders,notifyOpt.value.expire,notifyOpt.value.key_HR));
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
		if (reminders == "" || reminders == null) {
			const current = new Date();
			current.setMilliseconds(0);
			if (isTaskReminder)
				GetCurrentTaskReminders(user.uid, current, response => {
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
						if (isTaskReminder)
							reminder.timing = new Date(reminder.timing);
						if (isHabitReminder)
							reminder.time = new Date(reminder.time);
					}
				});
			if (isHabitReminder)
				GetCurrentTaskReminders()
		}
		for (let reminder of reminders) {
			const today = new Date();
			if (today.getTime() == reminder.timing.getTime() && isTaskReminder) {
				notifyTask(reminder, res => {
					if (res.confirm) {
						return;
					}
					if (res.cancel) {
						FinishTask(reminder.taskId);
					}
				});
			}
			if (today.getTime() == reminder.time.getTime() && isHabitReminder) {
				notifyHabit(reminder, res => {
					if (res.confirm) {
						return;
					}
					if (res.cancel) {
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