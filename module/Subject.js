export function SubjectStyle(backColor, textColor, iconColor, barColor, introColor, fabColor) {
	this.backColor = backColor;
	this.textColor = textColor;
	this.iconColor = iconColor;
	this.barColor = barColor;
	this.introColor = introColor;
	this.fabColor = fabColor;
}


export const subjects = {
	"default": new SubjectStyle("aliceblue", "#000", "rgb(0,75,235)", "rgb(0,125,245)", "gray", "#007AFF"),
	"lightwheat": new SubjectStyle("#ffd", "#111", "rgb(0,75,235)", "rgb(0,75,225)", "olive", "orange"),
	"wheat": new SubjectStyle("wheat", "#110", "rgb(0,85,195)", "rgb(0,135,225)", "gold", "yellow"),
	"darkblue": new SubjectStyle("darkblue", "#ffe", "#ffb", "rgb(0,125,235)", "darkblue", "violet"),
	"azure": new SubjectStyle("azure", "#112", "rgb(0,75,125)", "rgb(0,105,235)", "darkgray", "darkcyan"),
	"lightcyan": new SubjectStyle("lightcyan", "#fff", "rgb(0,75,125)", "rgb(0,105,235)", "darkcyan", "cyan"),
	"beryl": new SubjectStyle("rgb(72,209,204)", "#fff", "rgb(0,75,205)", "rgb(0,105,235)", "lime", "palegreen"),
	"pink": new SubjectStyle("pink", "#fff", "#3cf", "rgb(0,105,235)", "deeppink", "deeppink"),
	"violet": new SubjectStyle("violet", "#fff", "blue", "rgb(0,105,235)", "darkviolet", "deepskyblue"),
	"orangered":new SubjectStyle("orangered", "#eee", "rgb(0,75,225)", "rgb(0,105,235)", "orange", "red"),
	"midnightblue": new SubjectStyle("midnightblue", "#fff", "#ffb", "rgb(0,125,205)", "dodgerblue", "purple"),
	"aquamarine": new SubjectStyle("aquamarine", "#121", "rgb(0,125,235)", "rgb(0,125,205)", "dodgerblue", "blueviolet"),
	"chartreuse" : new SubjectStyle("chartreuse", "#ffe", "#ffb", "rgb(0,75,205)", "limegreen", "#3cf"),
	"tomato": new SubjectStyle("tomato", "#ffe", "#123", "rgb(0,125,225)", "crimson", "red"),
	"brown" : new SubjectStyle("brown", "#ffe", "cyan", "rgb(0,125,225)", "crimson", "cornflowerblue"),
	"silver": new SubjectStyle("silver", "#000", "#fff", "rgb(0,125,225)", "slategray", "cadetblue")
}
 
 
export const SubjectKey = "CurrentSubject";

export function getSubject() {
	const subject = uni.getStorageSync(SubjectKey);
	if (subject == "" || subject == null)
		return subjects["default"];
	return subject.value;
}