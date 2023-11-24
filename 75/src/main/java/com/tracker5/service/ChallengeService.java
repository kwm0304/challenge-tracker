package com.tracker5.service;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;
import com.tracker5.dto.ChallengeDto;
import com.tracker5.entity.Challenge;
import com.tracker5.entity.Checklist;
import com.tracker5.entity.User;
import com.tracker5.exception.AppException;
import com.tracker5.repository.ChallengeRepository;
import com.tracker5.repository.ChecklistRepository;
import com.tracker5.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ChallengeService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    public ChallengeDto getProfileDetails(Long userId) {
        return challengeRepository.findActiveChallengeByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Active challenge not found for user"));
    }

    public Challenge createChallenge(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User not found"));
        Challenge challenge = new Challenge();
        challenge.setUser(user);
        user.setHasActiveChallenge(true);

        LocalDate startDate = LocalDate.now();
        challenge.setStartDate(startDate);
        challenge.setActive(true);

        Set<Checklist> checklists = new HashSet<>();
        LocalDate endDate = startDate.plusDays(74);

        IntStream.range(0,75).forEach(i -> {
            Checklist checklist = new Checklist();
            checklist.setDate(startDate.plusDays(i));
            checklist.setChallenge(challenge);
            checklists.add(checklist);
        });

        challenge.setEndDate(endDate);
        challenge.setChecklists(checklists);
        challengeRepository.save(challenge);
        return challenge;
    }

    public Long getCurrentChallengeIdForUser(Long userId) {
        return challengeRepository.findActiveChallengeByUserId(userId)
                .map(ChallengeDto::getId)
                .orElse(null);
    }

    public List<Long> getAllChecklistImagesForChallenge(Long userId) {
        Long activeChallengeId = userRepository.findActiveChallengeByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Checklist> checklists = checklistRepository.findSubmittedChecklistWithImageByChallengeId(activeChallengeId);

        return checklists.stream()
                .map(Checklist::getId)
                .collect(Collectors.toList());
    }

    public List<Long> getFirstAndLastImages(Long challengeId) {
        List<Checklist> submittedChecklists = checklistRepository
                .findSubmittedChecklistWithImageByChallengeId(challengeId)
                .stream()
                .sorted(Comparator.comparing(Checklist::getDate))
                .toList();

        if (submittedChecklists.isEmpty()) {
            throw new AppException("No images found for this challenge", HttpStatus.OK);
            }
            List<Long> checklistIds = new ArrayList<>();
            checklistIds.add(submittedChecklists.get(0).getId()); //first image
            if (submittedChecklists.size() > 1) {
                checklistIds.add(submittedChecklists.get(submittedChecklists.size() - 1).getId()); //last image
            }
            return checklistIds;
    }

    public int getTotalCompletedTaskForChallenge(Long challengeId) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new AppException("Challenge not found", HttpStatus.NOT_FOUND));

        int numberCompleted = 0;
        for (Checklist checklist : challenge.getChecklists()) {
            numberCompleted += countCompletedTasks(checklist);
        }
        return numberCompleted;
    }

    private int countCompletedTasks(Checklist checklist) {
        int count = 0;
        if (checklist.getWorkoutOne()) count++;
        if (checklist.getWorkoutTwo()) count++;
        if (checklist.getDrinkWater()) count++;
        if (checklist.getTakePicture() || !checklist.getImageId().isEmpty()) count++;
        if (checklist.getNoAlcohol()) count++;
        if (checklist.getNoCheatMeals()) count++;
        if (checklist.getReadTenPages()) count++;
        return count;
    }


}
