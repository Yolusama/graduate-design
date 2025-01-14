import { Get, Post } from "../module/Request";
import { auth } from "./User";

export function UpdateTask(task,successCallback){
	Post("/Api/FourQuadrants/UpdateTask",auth,task,successCallback);
}

export function GetTasks(userId,time,successCallback){
	Get(`/Api/FourQuadrants/GetTasks/${userId}?time=${time.getTime()}`,auth,successCallBack);
}