import { copy } from "../module/Common";
import { Get, UploadFile } from "../module/Request"
import { auth, formDataAuth } from "./User"

export function GetData(userId,labelId,time,successCallback){
	Get(`/Api/Index/GetData/${userId}/${labelId}?time=${time}`,auth,successCallback);
}

export function GetLabels(userId,successCallback){
	Get(`/Api/Index/GetLabels/${userId}`,auth,successCallback);
}

export function CreateLabel(label,file,successCallback){
	const data = {};
	data.labelName = label.name;
	copy(label,data);
	UploadFile("/Api/Index/CreateLabel",file,formDataAuth,data,successCallback);
}

export function UpdateLabel(label,file,successCallback){
	const data = {};
	data.labelName = label.name;
	copy(label,data);
	UploadFile("/Api/Index/UpdateLabel",file,formDataAuth,data,successCallback);
}

export function CheckLabelNameExists(labelName,successCallback){
	Get(`/Api/Index/CheckLabelNameExists?labelName=${labelName}`,auth,successCallback);
}

export const IdOfLableNamed = 4;