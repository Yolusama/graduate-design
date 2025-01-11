import { Get,Patch,Post,Put } from "../module/Request";
import { auth} from "./User";


export function CreateTask(task,successCallback){
	 Put("/Api/Task/CreateTask",auth,task,successCallback);
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

export function GetRepeatRule(taskId,successCallback){
	Get(`/Api/Task/GetRepeatRule/${taskId}`,auth,successCallback);
}
