package SelfSchedule.Functional;

import org.vosk.Model;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class VoskModel {
    private static final Map<String, Model> modelPool = new ConcurrentHashMap<>();

    public static Model getModel(String modelPath){
        return modelPool.computeIfAbsent(modelPath, path -> {
            try {
                return new Model(path);
            } catch (IOException e) {
                throw new RuntimeException("加载模型失败: " + path, e);
            }
        });
    }

    public static void releaseModel(String modelPath) {
        Model model = modelPool.remove(modelPath);
        if (model != null) {
            model.close();
        }
    }
}
