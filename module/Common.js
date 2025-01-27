import { KShowModal } from "./KShowModal";

export function loading(title, func, expire) {
	uni.showLoading({
		title: title,
		duration: expire
	});
	const timer = setTimeout(() => {
		func();
		clearTimeout(timer);
		uni.hideLoading();
	}, expire);

}

export function delayToRun(func, expire) {
	const timer = setTimeout(() => {
		func();
		clearTimeout(timer);
	}, expire);
}

export function invalidEvent(event) {
	event.stopPropagation();
	event.preventDefault();
}

export const CalendarDisplayWay = {
	week: 1,
	month: 2,
	day: 3,
	year: 4
};

export function monthDays(year, month) {
	switch (month) {
		case 1:
			return 31;
		case 2:
			if (year % 4 == 0 && year % 400 != 0) return 29;
			else return 28;
		case 3:
			return 31;
		case 4:
			return 30;
		case 5:
			return 31;
		case 6:
			return 30;
		case 7:
		case 8:
			return 31;
		case 9:
			return 30;
		case 10:
			return 31;
		case 11:
			return 30;
		case 12:
			return 31;
	}
}

export function dateEquals(date1, date2) {
	return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() &&
		date1.getDate() == date2.getDate();
}

export function timeWithoutSeconds(date) {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const hourStr = hours > 9 ? hours : '0' + hours;
	const minuteStr = minutes > 9 ? minutes : '0' + minutes;
	return `${hourStr}:${minuteStr}`;
}

export function ValueText(value, text) {
	this.value = value;
	this.text = text;
}

export const priority = [new ValueText(1, "重要且紧急"),
	new ValueText(2, "重要但不紧急"), new ValueText(3, "不重要但紧急"), new ValueText(4, "不重要也不紧急")
];

export const frequency = [new ValueText(0, "不重复"), new ValueText(1, "每天"),
	new ValueText(2, "每周"), new ValueText(3, "每月"), new ValueText(4, "每年")
];

export class PageOption {
	constructor(current, size, total) {
		this.current = current;
		this.size = size;
		this.total = total;
		this.data = [];
	}
	count() {
		return Math.ceil(this.total / this.size);
	}
}

export class ReminderInfo {
	constructor(mode, value, timing) {
		this.mode = mode;
		this.value = value;
		this.timing = timing;
	}

	static getModeValueText(reminder) {
		switch (reminder.mode) {
			case 1:
				return `${reminder.value==0?"准时":reminder.value+"分钟前"}`;
			case 2:
				return `${reminder.value}小时前`;
			case 3:
				return `${reminder.value}天前`;
			case 4:
				return `${reminder.value}周前`;
			case 5:
				return `${reminder.value}月前`;
		}
	}

	static getInstance(mode, value, beginTime) {
		const date = new Date(beginTime);
		switch (mode) {
			case 1:
				date.setMinutes(date.getMinutes() - value);
				break;
			case 2:
				date.setHours(date.getHours() - value);
				break;
			case 3:
				date.setDate(date.getDate() - value);
				break;
			case 4:
				date.setDate(date.getDate() - value * 7);
				break;
			case 5:
				date.setMonth(date.getMonth() - value);
				break;
		}
		return new ReminderInfo(mode, value, date);
	}
}

class KeyValueText extends ValueText {
	constructor(key, value, text) {
		super(value, text);
		this.key = key;
	}
}

export const weekdays = [
	new KeyValueText("sunday", 0, "星期日"), new KeyValueText("monday", 1, "星期一"),
	new KeyValueText("tuesday", 2, "星期二"), new KeyValueText("wednesday", 3, "星期三"),
	new KeyValueText("thursday", 4, "星期四"), new KeyValueText("friday", 5, "星期五"),
	new KeyValueText("saturday", 6, "星期六")
];

export const customDef = [
	new ValueText(0, "一直"), new ValueText(1, "截止到"), new ValueText(2, "重复次数")
];

export function getDateStr(date = new Date()) {
	return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
}

export function getDateTimeStr(date = new Date(), thisYear) {
	if (date.getFullYear() == thisYear)
		return `${date.getMonth()+1}月${date.getDate()}日 ${weekdays[date.getDay()].text} ${timeWithoutSeconds(date)}`;
	else
		return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日 ${weekdays[date.getDay()].text} ${timeWithoutSeconds(date)}`;
}

export function copy(src, to) {
	for (let pro in src) {
		to[pro] = src[pro];
	}
}

export function remindModeValues(mode) {
	const data = [];
	switch (mode) {
		case 1:
			for (let i = 0; i <= 60; i++)
				data.push(i);
			break;
		case 2:
			for (let i = 1; i <= 24; i++)
				data.push(i);
			break;
		case 3:
			for (let i = 1; i <= 31; i++)
				data.push(i);
			break;
		case 4:
			for (let i = 1; i <= 52; i++)
				data.push(i);
			break;
		case 5:
			for (let i = 1; i <= 36; i++)
				data.push(i);
			break;
	}
	return data;
}

export function weekDaySign(day) {
	switch (day) {
		case 0:
			return "周日";
		case 1:
			return "周一";
		case 2:
			return "周二";
		case 3:
			return "周三";
		case 4:
			return "周四";
		case 5:
			return "周五";
		case 6:
			return "周六";
	}
}

export function getRuleText(task) {
	if (task.period == null || task.period == 0)
		return "不重复";
	var res = "";
	if (task.custom == null) {
		const period = task.period;
		const innerStr = period == 1 ? "" : period;
		switch (task.periodUnit) {
			case 1:
				res += `每${innerStr}天`;
				break;
			case 2:
				res += `每${innerStr}周`;
				break;
			case 3:
				res += `每${innerStr}个月`;
				break;
			case 4:
				res += `每${innerStr}年`;
				break;
		}
	} else {
		for (let pro in task.custom) {
			res += `${weekDaySign(task.custom[pro])},`;
		}
		res = res.substring(0, res.length - 1);
	}
	if (task.count != null) {
		res += `;重复${task.count}次`;
	}
	if (task.deadline != null) {
		res += `;截止到${getDateStr(task.deadline)}`;
	}
	return res;
}

export const TaskState = {
	finished: 1,
	unfinished: 2,
	cancelled: 3,
	abondoned: 4
}

export function onlyDate(date) {
	const res = new Date(date);
	res.setHours(0);
	res.setMinutes(0);
	res.setSeconds(0);
	res.setMilliseconds(0);
	return res;
}
export function dateGE(date1, date2) {
	return onlyDate(date1).getTime() >= onlyDate(date2).getTime();
}

export const persistDays = [
	new KeyValueText(-1, 0, "永远"), new KeyValueText(7, 1, "7天"), new KeyValueText(30, 2, "30天"), new KeyValueText(
		100, 3, "100天"),
	new KeyValueText(180, 4, "180天"), new KeyValueText(365, 5, "365天")
];

export class HabitReminder {
	constructor(time, habitId) {
		this.reminderId = null;
		this.time = time;
		this.habitId = habitId;
		this.toDelete = false;
	}
}

export const ADayMillseconds = 1000 * 60 * 60 * 24;

export class DragQuadantOption {
	constructor(leftBound, rightBound, itemMoved) {
		this.leftBound = leftBound;
		this.rightBound = rightBound;
		this.itemMoved = itemMoved;
	}
}

export function buildElById(ref) {
	const id = '#' + ref.attributes.id;
	uni.createSelectorQuery()
		.select(id).boundingClientRect()
		.exec(res => {
			const bound = res[0];
			const el = {
				offsetLeft: bound.left,
				offsetTop: bound.top,
				offsetHeight: bound.height,
				offsetWidth: bound.width
			}
			ref.$el = el;
		});
}

export function getElBound(selector, callback) {
	uni.createSelectorQuery()
		.select(selector).boundingClientRect()
		.exec(callback);
}

export function notifyTaskWithModal(reminder, finishCallback) {
	uni.showModal({
		title: `任务：${reminder.taskTitle}        --${priority[reminder.taskPriority-1].text}`,
		content: reminder.taskDescription,
		confirmText: "关闭",
		cancelText: "完成",
		cancelColor: "rgb(0,75,235)",
		success: res => finishCallback(reminder, res)
	});
}

export function notifyHabitWithModal(reminder) {
	KShowModal({
		title: `习惯：${reminder.habitName},完成提醒`,
		content:reminder.habitDescription,
		thumb:reminder.habitThumb,
        habitId:reminder.habitId
	});
	
}

//#ifdef APP-PLUS
export function notifyTask(isbackGround,reminder, finishCallback) {
	if(!isbackGround){
		notifyTaskWithModal(reminder,finishCallback);
		return;
	}
	const payload = {};
	copy(reminder, payload);
	payload.timing = payload.timing.getTime();
	payload.route = "/pages/task";
	plus.push.createMessage(reminder.taskDescription, payload, {
		title: `任务：${reminder.taskTitle}        --${priority[reminder.taskPriority-1].text}`,
		when: new Date()
	});
	/* uni.createPushMessage({
	   	title:`任务：${reminder.taskTitle}        --${priority[reminder.taskPriority-1].text}`,
		content:reminder.taskDescription,
		sound:"system",
		icon:"../static/icon.png",
		payload:payload,
		when:new Date(),
		success:res=>finishCallback(res)
	   });*/
}

//#endif


//#ifdef H5
export function notifyTask(reminder, finishCallback) {
	notifyTaskWithModal(reminder, finishCallback);
}
//#endif

//#ifdef APP-PLUS
export function notifyHabit(isBackground,reminder){
	if(!isBackground){
		notifyHabitWithModal(reminder);
		return;
	}
	const payload = {};
	copy(reminder, payload);
	payload.route = "/pages/habit";
	plus.push.createMessage(reminder.habitDescription, payload, {
		title: `习惯：${reminder.habitName}`,
		when: new Date()
	});
	/*uni.createPushMessage({
	   	title:reminder.habitName,
	   	content:reminder.habitDescription,
	   	sound:"system",
		payload:reminder,
		icon:"../static/icon.png",
		when:new Date(),
		
		success:res=>finishCallback(res)
	   });*/
}

//#endif 

//#ifdef H5
export function notifyHabit(reminder) {
	notifyHabitWithModal(reminder);
}
//#endif

export const TaskReminderKey = "task-reminders";
export const HabitReminderKey = "habit-reminders";
export const DefaultListIcon = "list.png";
export const DefaultLabelIcon = "label.png";

export function isBaseDayLabel(labelId){
	return labelId==1||labelId==2||labelId==3;
}