import { TaskState } from "../module/Common";
import { Get,Patch,Post,Put } from "../module/Request";
import { auth} from "./User";


export function CreateTask(task,successCallback){
	 Put("/Api/Task/CreateTask",auth,task,successCallback);
	 uni.removeStorageSync(TaskReminderKey);
}

export function GetTaskReminders(taskId,successCallback){
	Get(`/Api/Task/GetTaskReminders/${taskId}`,auth,successCallback);
}

export function GetTasks(pageOption,userId,time,successCallback){
	Get(`/Api/Task/GetTasks/${userId}?page=${pageOption.current}&pageSize=${pageOption.size}&time=${time.getTime()}`
	,auth,successCallback);
}

export function CancelTask(task,mode,successCallback){
	Post(`/Api/Task/CancelTask?mode=${mode}`,auth,task,successCallback);
}


export function AddReminder(reminder,mode,successCallback){
	Put(`/Api/Task/AddReminder?mode=${mode}`,auth,reminder,successCallback);
}

export function RemoveReminder(reminder,mode,successCallback){
	Put(`/Api/Task/RemoveReminder?mode=${mode}`,auth,reminder,successCallback);
}

export function ChangeRepeatRule(rule,mode,successCallback){
	Patch(`/Api/Task/ChangeRepeatRule?mode=${mode}`,auth,rule,successCallback);
}

export function UpdateTask(newTask,mode,successCallback){
	Post(`/Api/Task/UpdateTask?mode=${mode}`,auth,newTask,successCallback);
}

export function FinishOrNot(taskId,state,successCallback){
	Patch(`/Api/Task/FinishOrNot/${taskId}?state=${state}`,auth,{},successCallback);
}

export function GetCurrentTaskReminders(userId,currentTime,successCallback){
	Get(`/Api/Task/GetCurrentTaskReminders/${userId}?currentTime=${currentTime.getTime()}`,auth,successCallback);
}

export	function FreshReminderTiming(taskId,taskBeginTime,successCallback){
	Post(`/Api/Task/FreshReminderTiming/${taskId}?taskBeginTime=${taskBeginTime.getTime()}`,auth,{},successCallback);
}

export function FinishTask(taskId){
	FinishOrNot(taskId,TaskState.finished,response=>{
		if(!response.data.succeeded){
			uni.showToast({
				title:response.data.message,
				icon:"none"
			});
			return;
		}
		const route = "/pages/index"
		uni.reLaunch({
			url: route
		});
	});
}

