import { Patch, Post, Put, UploadFile } from "../module/Request";
import { auth,formDataAuth } from "./User";

export function ChangeNickname(nickname,userId,successCallback){
	Patch(`/Api/User/ChangeUserNickname/${userId}?nickName=${nickname}`,auth,{},successCallback);
}

export function ChangeAvatar(avatar,file,userId,successCallback){
	const data = {
		avatar:avatar,
		userId:userId
	};
	UploadFile("/Api/User/ChangeAvatar",file,formDataAuth,data,successCallback);
}

export function ChangePassword(model,successCallback){
	Put("/Api/User/ChangePassword",auth,model,successCallback);
}

export function ChangeEmail(email,newEmail.checkCode,successCallback){
	Put(`/Api/User/ChangeEmail/${checkCode}?email=${email}&newEmail=${newEmail}`,auth,{},successCallback);
}

export function Logout(cancelAccount,userId,email,successCallback){
	Post(`/Api/Index/Logout/${userId}?cancelAccount=${cancelAccount}&email=${email}`,auth,{},successCallback);
}