import { Get } from "../module/Request"
import { auth } from "./User"

export const appInfo = {
	name:"KList",
	icon:"app.png",
	code:"ICP13412594123GD"
}

export function GetCurrentVersion(successCallback){
	Get("/Api/Version/GetCurrentVersion",auth,successCallback);
}