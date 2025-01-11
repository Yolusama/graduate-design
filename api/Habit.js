import { Delete, Get, Patch, Post, Put } from "../module/Request";
import { auth, formDataAuth } from "./User";

export function GetDefaultThumbs(successCallback){
	Get("/Api/Common/GetDefaultThumbs",auth,successCallback);
}

export function GetHabitGroups(userId,successCallback){
	Get(`/Api/Habit/GetHabitGroups/${userId}`,auth,successCallback);
}

export function GetHabits(pageOption,userId,time,successCallback){
	Get(`/Api/Habit/GetHabits/${userId}?page=${pageOption.current}&pageSize=${pageOption.size}&time=${time}`,
	auth,successCallback);
}

export function CreateHabit(habit,successCallback){
	Put("/Api/Habit/CreateHabit",auth,habit,successCallback);
}

export function UpdateHabit(habit,successCallback){
	Patch("/Api/Habit/UpdateHabit",auth,habit,successCallback);
}

export function CreateGroup(userId,groupName,successCallback){
	Post(`/Api/Habit/CreateGroup/${userId}?groupName=${groupName}`,auth,{},successCallback);
}

export function RemoveGroup(groupId,userId,code,successCallback){
	Delete(`/Api/Habit/RemoveGroup/${userId}/${groupId}?code=${code}`,auth,successCallback);
}

export function UploadThumb(thumb,habitId,originalFileName,successCallback){
	const data = new FormData();
	data.append("habitId",habitId);
	data.append("thumb",thumb);
	data.append("originalFileName",originalFileName);
	Post("/Api/Habit/UploadThumb",formDataAuth,data,successCallback);
}

export function FinishOrNot(record,successCallback){
	Patch("/Api/Habit/FinishOrNot",auth,record,successCallback);
}

export function GetHabitReminders(habitId,successCallback){
	Get(`/Api/Habit/GetHabitReminders/${habitId}`,auth,successCallback);
}

export function RemoveHabit(habitId,successCallback){
	Delete(`/Api/Habit/RemoveHabit/${habitId}`,successCallback);
}

export function DayInFrequency(habitId,day,habitBeginDate,successCallback){
	Post(`/Api/Habit/DayInFrequency/${habitId}?day=${day}&habitBeginDate=${habitBeginDate}`,auth,{},successCallback);
}

export function GetHabitRecords(habitId,successCallback){
	Get(`/Api/Habit/GetHabitRecords/${habitId}`,auth,successCallback);
}