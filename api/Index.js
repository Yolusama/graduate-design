import { Delete, Get, Patch, Post, UploadFile } from "../module/Request"
import { FinishOrNot } from "./Task";
import { auth, formDataAuth } from "./User"

export function GetData(userId,labelId,time,successCallback){
	Get(`/Api/Index/GetData/${userId}/${labelId}?time=${time}`,auth,successCallback);
}

export function GetLabels(userId,successCallback){
	Get(`/Api/Index/GetLabels/${userId}`,auth,successCallback);
}

export function CreateLabel(label,file,successCallback){
	UploadFile("/Api/Index/CreateLabel",file,formDataAuth,label,successCallback);
}

export function UpdateLabel(label,file,successCallback){
	UploadFile("/Api/Index/UpdateLabel",file,formDataAuth,label,successCallback);
}

export function CheckLabelNameExists(labelName,userId,successCallback){
	Get(`/Api/Index/CheckLabelNameExists/${userId}?labelName=${labelName}`,auth,successCallback);
}

export function RemoveLabel(labelId,successCallback){
	Delete(`/Api/Index/RemoveLabel/${labelId}`,auth,successCallback);
}

export function HideOrShowLabel(labelId,display,successCallback){
	Patch(`/Api/Index/HideOrShowLabel/${labelId}?display=${display}`,auth,{},successCallback);
}

export function FinishTaskOrNot(taskId,state,successCallback){
	FinishOrNot(taskId,state,successCallback);
}

export function CreateOrGetLabel(labelName,userId,successCallback){
	Post(`/Api/Index/CreateOrGetLabel/${userId}?labelName=${labelName}`,auth,{},successCallback);
}

export function GetHiddenLabels(userId,successCallback){
	Get(`/Api/Index/GetHiddenLabels/${userId}`,auth,successCallback);
}

export function CheckYesterdayTask(userId,yesterday,successCallback){
	Post(`/Api/Index/CheckYesterdayTask/${userId}?yesterday=${yesterday.getTime()}`,auth,{},successCallback);
}

export const IdOfLableNamed = 4;