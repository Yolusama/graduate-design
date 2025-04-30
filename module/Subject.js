export function SubjectStyle(backColor, textColor,iconColor,barColor,introColor,fabColor) {
	this.backColor = backColor;
	this.textColor = textColor;
	this.iconColor = iconColor;
	this.barColor = barColor;
	this.introColor = introColor;
	this.fabColor = fabColor;
}


export const subjects = {
	"default": new SubjectStyle("aliceblue", "#000","rgb(0,75,235)","rgb(0,125,245)","gray","#007AFF"),
	"light": new SubjectStyle("#ffd","#111","rgb(0,75,235)","rgb(0,75,225)","gray","orange"),
	"darkblue": new SubjectStyle("darkblue","#122","rgb(0,75,125)","rgb(0,125,235)","gray","darkblue"),
	"azure":new SubjectStyle("azure","#112","rgb(0,75,125)","rgb(0,105,235)","gray","darkcyan"),
	"lightcyan": new SubjectStyle("lightcyan","#fff","rgb(0,75,125)","rgb(0,105,235)","gray","cyan"),
	"beryl" : new SubjectStyle("rgb(72,209,204)","#fff","rgb(0,75,125)","rgb(0,105,235)","gray","palegreen"),
	"pink" :  new SubjectStyle("pink","#fff","rgb(0,75,125)","rgb(0,105,235)","gray","deeppink"),
	"violet": new SubjectStyle("violet","#fff","rgb(0,75,125)","rgb(0,105,235)","gray","deepskyblue"),
}

export const SubjectKey = "CurrentSubject";

export function getSubject() {
	const subject = uni.getStorageSync(SubjectKey);
	if (subject == "" || subject == null)
		return subjects["default"];
	return subject.value;
}