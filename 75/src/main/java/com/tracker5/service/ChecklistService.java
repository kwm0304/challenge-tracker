package com.tracker5.service;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;
import com.tracker5.entity.Checklist;
import com.tracker5.entity.Image;
import com.tracker5.exception.AppException;
import com.tracker5.repository.ChecklistRepository;
import com.tracker5.s3.S3Buckets;
import com.tracker5.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@Service
public class ChecklistService {

    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final ChecklistRepository checklistRepository;
    @Value("${aws.region}")
    private String awsRegion;
    //get checklist

    //post checklist

    //update checklist

    //post image

    //get image
    public void uploadChecklistImage(Long checklistId, MultipartFile file, Long imageId) throws IOException {
        //see if checklist exists
        if (!doesChecklistExist(checklistId)) {
            throw new ResourceNotFoundException("No checklist exists with that id");
        }
        String key = "checklist-images/%s/%s".formatted(checklistId, imageId);
        try {
            s3Service.putObject(s3Buckets.getUser(), key, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }

        String imageUrl = "https://"+s3Buckets.getUser() + ".s3" + awsRegion + ".amazon.com/" + key;
        Checklist checklist = checklistRepository.findById(checklistId).orElseThrow(() ->
                new ResourceNotFoundException("Checklist not found"));
        Image image = checklist.getImage();
        if (image == null) {
            image = new Image();
            image.setChecklist(checklist);
            checklist.setImage(image);
        }
        image.setImageUrl(imageUrl);

        checklistRepository.save(checklist);
    }

    private boolean doesChecklistExist(Long checklistId) {
        return checklistRepository.existsById(checklistId);
    }
}
