package SelfSchedule.Functional;

import SelfSchedule.Functional.VoskModel;
import org.vosk.Recognizer;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;

import java.io.File;
import java.util.concurrent.*;

public class VoskRecognizer {
    private static final ExecutorService executor = Executors.newFixedThreadPool(4);


    public static CompletableFuture<String> recognize(File wavFile,String modelPath) {
        return CompletableFuture.supplyAsync(() -> {
            try (Recognizer recognizer = new Recognizer(VoskModel.getModel(modelPath), 16000.0f)) {
                AudioInputStream ais = AudioSystem.getAudioInputStream(wavFile);
                byte[] buffer = new byte[4096];
                StringBuilder result = new StringBuilder();

                int nbytes;
                while ((nbytes = ais.read(buffer)) >= 0) {
                    if (recognizer.acceptWaveForm(buffer, nbytes))
                        result.append(recognizer.getResult());
                }
                result.append(recognizer.getFinalResult());
                ais.close();

                return result.toString();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }, executor);
    }
}

