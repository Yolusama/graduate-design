import { authorization, Get } from "./Api";

export function GetFinishedTaskCount(userId,successCallback){
    Get(`/Task/GetFinishedTaskCount/${userId}`,authorization(),successCallback);
}

export function GetFinishedTaskCounts(userId,mode,time,successCallback){
    Get(`/Task/GetFinishedTaskCounts/${userId}?mode=${mode}&today=${time}`,authorization(),successCallback);
}