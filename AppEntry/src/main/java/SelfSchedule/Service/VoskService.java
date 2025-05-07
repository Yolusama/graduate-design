package SelfSchedule.Service;

import SelfSchedule.Common.Constants;
import SelfSchedule.Functional.WavStandardization;
import SelfSchedule.Functional.VoskRecognizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
public class VoskService {
    @Value("${vosk.path}")
    private String voskPath;
    @Value("${vosk.ffmpegSupport}")
    private String ffmpegPath;

    public String convert(MultipartFile file){
        try {
            InputStream stream = file.getInputStream();
            String randomName = UUID.randomUUID().toString();
            Path tempFile = Path.of(String.format("%s.wav",randomName));
            Files.copy(stream,tempFile);
            File outputTemp = WavStandardization.standardize(ffmpegPath,randomName,tempFile.toFile());
            CompletableFuture<String> future = VoskRecognizer.recognize(outputTemp,voskPath);
            String res = future.get();
            stream.close();
            Files.delete(tempFile);
            outputTemp.delete();
            return res;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Constants.Error;
    }
}
