import { Delete, Get, Patch, Post, Put, UploadFile } from "../module/Request"
import { FinishOrNot } from "./Task";
import { auth, formDataAuth } from "./User"

export function GetData(userId,labelId,time,successCallback){
	Get(`/Api/Index/GetData/${userId}/${labelId}?time=${time}`,auth,successCallback);
}

export function GetLabels(userId,successCallback){
	Get(`/Api/Index/GetLabels/${userId}`,auth,successCallback);
}

export function CreateLabel(label,file,successCallback){
	Put("/Api/Index/CreateLabel",auth,label,successCallback);
}

export function UpdateLabel(labelId,labelName,successCallback){
	Patch(`/Api/Index/UpdateLabel/${labelId}?labelName=${labelName}`,auth,{},successCallback);
}

export function UploadLabelIcon(label,file,successCallback){
	UploadFile("/Api/Index/UploadLabelIcon",file,formDataAuth,label,successCallback);
}

export function CheckLabelNameExists(labelName,userId,successCallback){
	Get(`/Api/Index/CheckLabelNameExists/${userId}?labelName=${labelName}`,auth,successCallback);
}

export function RemoveLabel(labelId,successCallback){
	Delete(`/Api/Index/RemoveLabel/${labelId}`,auth,successCallback);
}

export function HideOrShowLabel(userId,labelId,display,successCallback){
	Patch(`/Api/Index/HideOrShowLabel/${userId}/${labelId}?display=${display}`,auth,{},successCallback);
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

export function RemoveOrRecoverTask(taskId,isRemove,successCallback){
	Patch(`/Api/Index/RemoveOrRecoverTask/${taskId}?isRemove=${isRemove}`,auth,{},successCallback);
}

export function RemoveOrRecoverHabit(habitId,isRemove,successCallback){
	Patch(`/Api/Index/RemoveOrRecoverHabit/${habitId}?isRemove=${isRemove}`,auth,{},successCallback);
}

export function GetNotifyAudios(successCallback){
	Get("/Api/Common/GetNotifyAudios",auth,successCallback);
}

export function CheckContinuousDays(userId,yesterday,successCallback){
	Post(`/Api/Index/CheckContinuousDays/${userId}?yesterday=${yesterday.getTime()}`,auth,{},successCallback);
}

export function TakeTaskLabelsFor(userId,taskId,listId,labelIds,isUpdate,successCallback){
	Post(`/Api/Index/TakeTaskLabelsFor/${userId}/${taskId}/${listId}?isUpdate=${isUpdate}`,auth,{
		data:labelIds
	},successCallback);
}

export function GetTaskLabels(userId,taskId,successCallback){
	Get(`/Api/Index/GetTaskLabels/${userId}/${taskId}`,auth,successCallback);
}

export function CreateList(userId,listName,successCallback){
	Put(`/Api/Index/CreateList/${userId}?listName=${listName}`,auth,{},successCallback);
}

export const IdOfLableNamed = 4;
export const IdOfBin = 8; 