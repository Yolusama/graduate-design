package SelfSchedule.Common;

public class ValueText {
    private String text;
    private Object value;

    public ValueText(){}
    public ValueText(String text,Object value){
        this.text = text;
        this.value = value;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }
}
