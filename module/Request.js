class GlobalRequest
{
	constructor(baseUrl,timeout)
	{
		this.baseUrl = baseUrl;
		this.timeout = timeout;
	}
	
	request(url,methodType,headers,body,successCallback,failCallback){
		const option = {
			url:this.baseUrl + url,
			method:methodType,
			header:headers,
			timeout:this.timeout,
			success:successCallback,
			fail:failCallback
		};
		if(body!=null)
		  option.data = body;
		return uni.request(option);
	}
	
	get(url,headers,successCallback,failCallback){
		return this.request(url,"GET",headers,null,successCallback,failCallback);
	}
	
	post(url,headers,data,successCallback,failCallback){
		return this.request(url,"POST",headers,data,successCallback,failCallback);
	}
	
	put(url,headers,data,successCallback,failCallback){
		return this.request(url,"PUT",headers,data,successCallback,failCallback);
	}
	
	patch(url,headers,data,successCallback,failCallback){
		return this.request(url,"PATCH",headers,data,successCallback,failCallback);
	}
	
	delete(url,headers,successCallback,failCallback)
	{
		return this.request(url,"DELETE",headers,null,successCallback,failCallback);
	}
	
	uploadFile(url,file,headers,formData,successCallback,failCallback){
		return uni.uploadFile({
			url:this.baseUrl+url,
			filePath:file,
			name:"file",
			header:headers,
			timeout:this.timeout,
			formData:formData,
			success:successCallback,
			fail:failCallback
		});
	}
}
const timeout = 1000*60*3;
//#ifndef H5
const request = new GlobalRequest("http://192.168.43.71:5225",timeout);
//#endif
//#ifdef H5
const request = new GlobalRequest("http://localhost:5225",timeout);
//#endif

const defaultFailBack = res=>console.log(res);
/*const defaultFailBack = res =>{
	    uni.showToast({
	    	title:res.errMsg,
			icon:"none"
	    });
}*/

export function imgSrc(source){
	return `${request.baseUrl}/img/${source}`;
}

export function Request(url,methodType,headers,body,successCallback,failCallback=defaultFailBack)
{
	return request.request(url,methodType,headers,body,successCallback,failCallback=defaultFailBack);
}

export function Get(url,headers,successCallback,failCallback=defaultFailBack){
	return request.get(url,headers,successCallback,failCallback!=undefined?failCallback:null);
}

export function Post(url,headers,data,successCallback,failCallback=defaultFailBack){
	return request.post(url,headers,data,successCallback,failCallback!=undefined?failCallback:null);
}

export function Put(url,headers,data,successCallback,failCallback=defaultFailBack){
	return request.put(url,headers,data,successCallback,failCallback!=undefined?failCallback:null);
}

export function Patch(url,headers,data,successCallback,failCallback=defaultFailBack){
	return request.patch(url,headers,data,successCallback,failCallback!=undefined?failCallback:null);
}

export function Delete(url,headers,successCallback,failCallback=defaultFailBack){
	return request.delete(url,headers,successCallback,failCallback!=undefined?failCallback:null);
}

export function UploadFile(url,file,headers,formData,successCallback,failCallback=defaultFailBack){
	return request.uploadFile(url,file,headers,formData,successCallback,failCallback!=undefined?failCallback:null);
}