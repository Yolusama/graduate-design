import { Get } from "../module/Request"
import { auth } from "./User"

export function GetData(userId,labelId,successCallback){
	Get(`/Api/Index/GetData/${userId}/${labelId}`,auth,successCallback);
}

export function GetLabels(userId,successCallback){
	Get(`/Api/Index/GetLabels/${userId}`,auth,successCallback);
}