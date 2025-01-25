import { copy } from "../module/Common";
import { Get, UploadFile } from "../module/Request"
import { auth, formDataAuth } from "./User"

export function GetData(userId,labelId,time,successCallback){
	Get(`/Api/Index/GetData/${userId}/${labelId}?time=${time}`,auth,successCallback);
}

export function GetLabels(userId,successCallback){
	Get(`/Api/Index/GetLabels/${userId}`,auth,successCallback);
}

export function createLabel(label,file,successCallback){
	UploadFile("/Api/Index/CreateLabel",file,formDataAuth,label,successCallback);
}

export function updateLabel(label,file,successCallback){
	UploadFile("/Api/Index/UpdateLabel",file,formDataAuth,label,successCallback);
}

export const IdOfLableNamed = 4;