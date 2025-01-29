import { Get,Patch,Post,Put } from "../module/Request";

export function Login(email,password,successCallback,failCallback)
{
	Post("/Api/User/Login",{},{
		email:email,
		password:password
	},successCallback,failCallback);
}

export function Register(email,password,checkCode,successCallback,failCallback)
{
	Put(`/Api/User/Register/${checkCode}`,{},{
		email: email,
		password: password
	},successCallback,failCallback);
}

export function GetCheckCode(email,length,successCallback,failCallback)
{
	Get(`/Api/User/GetCheckCode/${length}?email=${email}`,{},successCallback,failCallback)
}

export function CheckCodeLogin(email,checkCode,successCallback,failCallback)
{
	Post(`/Api/User/CheckCodeLogin/${checkCode}?email=${email}`,{},{},successCallback,failCallback);
}

export function VerifyToken(userId,token,successCallback)
{
	Post("/Api/User/VerifyToken",{},{
		userId:userId,
		token:token
	},successCallback);
}

export const user =  uni.getStorageSync("user");

export const auth = {
	"token": user.token
};
export const formDataAuth = {
	"ContentType":"multipart/form-data",
	"token": user.token
}
