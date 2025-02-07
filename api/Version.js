import { Get, Post } from "../module/Request"
import { auth } from "./User"

export const appInfo = {
	name:"KList",
	icon:"app.png",
	code:"ICP13412594123GD"
}

export function GetCurrentVersion(userId,successCallback){
	Get(`/Api/Version/GetCurrentVersion/${userId}`,auth,successCallback);
}

export function GetLatestVersion(successCallback){
	Get("/Api/Version/GetLatestVersion",auth,successCallback);
}

export function ResetCurrentVersion(userId,version,successCallback){
	Post(`/Api/Version/ResetCurrentVersion/${userId}`,auth,version,successCallback);
}