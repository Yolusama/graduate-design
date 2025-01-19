import { Get, Patch, Post } from "../module/Request";
import { auth } from "./User";
import { TaskReminderKey } from "../module/Common";

export function UpdateTask(task,successCallback){
	Post("/Api/FourQuadrants/UpdateTask",auth,task,successCallback);
	uni.removeStorageSync(TaskReminderKey);
}

export function GetTasks(userId,time,successCallback){
	Get(`/Api/FourQuadrants/GetTasks/${userId}?time=${time.getTime()}`,auth,successCallback);
	uni.removeStorageSync(TaskReminderKey);
}

export function ChangePriority(task,successCallback){
	Patch("/Api/FourQuadrants/ChangePriority",auth,task,successCallback);
}