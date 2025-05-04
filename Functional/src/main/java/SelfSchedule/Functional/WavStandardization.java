package SelfSchedule.Functional;


import java.io.File;
import java.io.FileInputStream;

public class WavStandardization {
  public static File standardize(String ffmpegPath,String randomName, File wavFile){
     try {
         File outputFile = new File(String.format("%s_temp.wav",randomName));
         Process process = new ProcessBuilder(
                 ffmpegPath,
                 "-i", wavFile.getAbsolutePath(),
                 "-acodec", "pcm_s16le",
                 "-ac", "1",
                 "-ar", "16000",
                 outputFile.getAbsolutePath()
         ).start();
         process.waitFor();
         return outputFile;
     }
     catch (Exception ex){
         ex.printStackTrace();
         return null;
     }
  }
}
