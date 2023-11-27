package com.tracker5.service;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;
import com.tracker5.entity.Checklist;
import com.tracker5.repository.ChallengeRepository;
import com.tracker5.repository.ChecklistRepository;
import com.tracker5.s3.S3Buckets;
import com.tracker5.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@EnableScheduling
public class ChecklistService {

    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final ChecklistRepository checklistRepository;
    @Autowired
    private ChallengeRepository challengeRepository;
    @Value("${aws.region}")
    private String awsRegion;
    //get checklist
    public Checklist getCurrentDayChecklist(Long challengeId) {
        LocalDate today = LocalDate.now();
        SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");

        return checklistRepository.findByDateAndChallengeId(today, challengeId)
                .orElseThrow(() -> new ResourceNotFoundException("Checklist for current date not found"));
    }

    public void uploadChecklistImage(Long checklistId, MultipartFile file) throws IOException {
        //see if checklist exists
        if (!doesChecklistExist(checklistId)) {
            throw new ResourceNotFoundException("No checklist exists with that id");
        }
        String imageId = UUID.randomUUID().toString();

        String key = "checklist-images/%s/%s".formatted(checklistId, imageId);
        try {
            s3Service.putObject(s3Buckets.getChecklist(), key, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }

        checklistRepository.updateChecklistImageId(imageId, checklistId);
    }

    private boolean doesChecklistExist(Long checklistId) {
        return checklistRepository.existsById(checklistId);
    }

    public Checklist updateChecklist(Long checklistId, Checklist checklistDetails) {
        Checklist existingChecklist = checklistRepository.findById(checklistId)
                .orElseThrow(() -> new ResourceNotFoundException("Checklist not found"));
        updateFields(existingChecklist, checklistDetails);

        return checklistRepository.save(existingChecklist);
    }

    public void updateFields(Checklist existingChecklist, Checklist checklistDetails) {
        existingChecklist.setWorkoutOne(checklistDetails.getWorkoutOne());
        existingChecklist.setWorkoutTwo(checklistDetails.getWorkoutTwo());
        existingChecklist.setDrinkWater(checklistDetails.getDrinkWater());
        existingChecklist.setReadTenPages(checklistDetails.getReadTenPages());
        existingChecklist.setTakePicture(checklistDetails.getTakePicture());
        existingChecklist.setNoAlcohol(checklistDetails.getNoAlcohol());
        existingChecklist.setNoCheatMeals(checklistDetails.getNoCheatMeals());
        existingChecklist.setSubmitted(checklistDetails.getSubmitted());
    }

    public byte[] getChecklistImage(Long checklistId) {
        Checklist checklist = checklistRepository.findById(checklistId)
                .orElseThrow(() -> new ResourceNotFoundException("Checklist not found"));

        if (checklist.getImageId() == null || checklist.getImageId().isBlank()) {
            throw new ResourceNotFoundException("Image not found");
        }
        String id = checklist.getImageId();
        System.out.println(id);

        byte[] checklistImage = s3Service.getObject(
                s3Buckets.getChecklist(),
                "checklist-images/%s/%s".formatted(checklistId, id)
        );
        return checklistImage;
    }

    @Scheduled(cron = "0 59 23 * * *")
    public void autoSubmitChecklist() {
        LocalDate today = LocalDate.now();
        List<Checklist> unsubmittedChecklists = checklistRepository.findByDateAndSubmitted(today, false);

        for (Checklist checklist : unsubmittedChecklists) {
            checklist.setSubmitted(true);
            updateChecklist(checklist.getId(), checklist);
        }
    }





}
