package SelfSchedule.Service;

import SelfSchedule.Common.Constants;
import SelfSchedule.Utils.DateUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {
    @Value("${resource.img.path}")
    private String imgPath;
    @Value("${resource.download.path}")
    private String downloadPath;
    @Value("${resource.feedback.path}")
    private String feedbackFilePath;

    private final Integer bufferSize = 2048;

    public String uploadImage(MultipartFile image){
        String newFileName = null;
        try {
            InputStream stream = image.getInputStream();
            String fileName = image.getOriginalFilename();
            String suffix = fileName.substring(fileName.lastIndexOf('.'));
            newFileName = UUID.randomUUID() + suffix;
            FileOutputStream output = new FileOutputStream(imgPath+newFileName);
            int len;
            byte[] buffer = new byte[bufferSize];
            while((len=stream.read(buffer))>0)
                output.write(buffer,0,len);
            output.close();
            stream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return newFileName;
    }

    public void removeImage(String imgName){
        try {
            Files.delete(Paths.get(imgPath+imgName));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public byte[] toDownload(String fileName){
        try {
            FileInputStream stream = new FileInputStream(downloadPath+fileName);
            byte[] res = stream.readAllBytes();
            stream.close();
            return res;
        }
        catch (Exception ex){
            ex.printStackTrace();
        }
        return null;
    }

    public void writeFeedbackFile(String email,String content){
       try {
          String fileName = String.format("%s%s_%s.txt",feedbackFilePath,
                  DateUtil.fileNameFormatString(Constants.Now()),email);
          FileOutputStream stream = new FileOutputStream(fileName);
          OutputStreamWriter writer = new OutputStreamWriter(stream);
          writer.write(content);
          writer.close();
          stream.close();
       }
       catch (Exception ex){
           ex.printStackTrace();
       }
    }
}
