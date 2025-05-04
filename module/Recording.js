import { Recording } from "../api/Task";

export default class Recorder{
	//#ifdef APP-PLUS
	constructor(){
		this.recordManger = uni.getRecorderManager();
		this.toRecord = false;
		this.isRecording = false;
		this.afterStopFunc = null;
		this.current = 0;
		this.timer = 0;
		
		this.recordManger.onError(err=>{
			uni.showToast({
				title:err,
				icon:"none"
			});
		});
		
		this.recordManger.onStop(res=>{
			const file = res.tempFilePath;
			if(this.afterStopFunc == null || !this.toRecord)return;
			Recording(file,response=>{
				const res = JSON.parse(response.data);
				if(!res.succeeded)
					this.afterStopFunc({data:""});
				else
				    this.afterStopFunc(JSON.parse(res.data));
			});
		})
	}
	
	startRecording(callbackAfterStopping){
		this.recordManger.start({
			format:"wav"
		});
		this.timer = setInterval(()=>{
			if(this.isRecording||this.current==60){
				if(this.current==60)
				  this.stopRecording(true);  
				this.current++;
			  }
			},1000);
		this.afterStopFunc = callbackAfterStopping;
		this.isRecording = true;
	}
	
	stopRecording(toRecord=false){
		this.toRecord = toRecord;
		this.isRecording = false;
		this.recordManger.stop();
		clearInterval(this.timer);
		this.current = 0;
	}
	//#endif
	
	//#ifdef H5
	constructor(){
	   this.afterStopFunc = null;
	   this.toRecord = false;
	   this.isRecording = false;
	   this.data = [];
	   this.current = 0;
	   this.timer = 0;
	   navigator.mediaDevices.getUserMedia({audio:true})
	   .then(value=>{
	   	this.recorder = new MediaRecorder(value);
	   	
	   	this.recorder.ondataavailable = e=>{
	   		this.data.push(e.data);
	   	}
		
		this.recorder.onerror = e=>{
			uni.showToast({
				title:"出现问题！",
				icon:"exception"
			});
		}
	   	
	   	this.recorder.onstop = (e)=>{
			value.getTracks().forEach(track => track.stop());
			this.isRecording = false;
			if(this.afterStopFunc==null||!this.toRecord)return;
	        const audioBlob = new Blob(this.data, { type: "audio/wav" });
	   		const file = URL.createObjectURL(audioBlob);
		
	   		Recording(file,response=>{
				const res = JSON.parse(response.data);
	   			if(!res.succeeded)
	   				this.afterStopFunc({data:""});
	   			else
	   			    this.afterStopFunc(JSON.parse(res.data));
	   		});
	   	}
	   }).catch(err=>{
	   	uni.showToast({
	   		title:err,
	   		icon:"none"
	   	});
	   });
	}
	
	startRecording(callbackAfterStopping){
		this.recorder.start();
		this.afterStopFunc = callbackAfterStopping;
		this.isRecording = true;
		this.timer = setInterval(()=>{
			 if(this.isRecording||this.current == 60)
			   {
				   if(this.current == 60)
				      this.stopRecording(true);
				   this.current++;
			   }
			},1000);
	}
	
	stopRecording(toRecord=false){
		this.toRecord = toRecord;
		this.recorder.stop();
		this.isRecording = false;
		clearInterval(this.timer);
		this.current = 0;
	}
	//#endif
	
	getTime(){
		if(this.current==60)
		   return "01:00";
		if(this.current<10)
		   return `00:0${this.current}`;
		else
		   return `00:${this.current}`;
	}
}