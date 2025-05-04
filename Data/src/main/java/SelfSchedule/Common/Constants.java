package SelfSchedule.Common;

import java.time.Duration;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Stream;

public final class Constants {
    private Constants(){}
    public static final String JwtUserClaim = "UserId";
    public static final String JwtTokenSign = "token";
    public static final String DefaultAvatar = "default.png";
    public static final String DefaultThumb = "habit.png";
    public static final String DefaultLabelIcon = "label.png";
    public static final String DefaultListIcon = "list.png";
    public static final String CheckCodeTitle = "验证码";
    public static final String Quadrant = "quadrant";
    public static final String TokenExpireSign = "TokenExpire";
    public static final String EmailError = "EmailError";
    public static final String Error = "error";
    public static final int None = 0;
    public static final int EOF = -1;
    public static final Integer Week = 7;
    public static final int NormalState = 1;
    public static final int AbNormalState = 0;
    public static final String[] DefaultGroupNames = {"早晨","上午","中午","下午","晚上","其他"};
    public static final ValueText[] DefaultThumbs = new ValueText[]{
            new ValueText("锻炼进行时！","exercise.png"),new ValueText("休闲，忙碌之余的放松","leisure.png"),
            new ValueText("游戏，happy gaming！", "game.png"),new ValueText("学习让人快乐","study.png"),
            new ValueText("感受音乐之美！","music.png"),new ValueText("背单词！","word-recite.png"),
            new ValueText("阅读使人受益","reading.png"),new ValueText("健康生活，水果必不可少！","fruit.png"),
            new ValueText("多吃蔬菜，获得健康！", "vegetable.png")
    };
    public static final Duration TokenExpire = Duration.ofDays(Week);
    public static final Duration CheckCodeExpire = Duration.ofMinutes(5);
    public static final Duration CheckCodeGetExpire = Duration.ofMinutes(1);
    public static final Duration CachingExpire = Duration.ofMinutes(3);
    public static final Duration AdminTokenExpire = Duration.ofDays(15);
    public static final Duration MonthExpire = Duration.ofDays(30);
    public static Date now(){
        return new Date();
    }
    public static boolean isDefaultThumb(String thumbName){
        Stream<ValueText> stream = Arrays.stream(DefaultThumbs);
        Optional<ValueText> optional = stream.filter(v->v.getValue().equals(thumbName)).findFirst();
        stream.close();
        return !optional.isEmpty() || DefaultThumb.equals(thumbName);
    }
}
