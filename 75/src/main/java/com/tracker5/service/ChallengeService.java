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
        challenge.setDayNumber(1);

        Set<Checklist> checklists = new HashSet<>();
        LocalDate currentDate = startDate;
        LocalDate endDate = startDate.plusDays(74);

        for (int i = 1; i <= 75; i++) {
            Checklist checklist = new Checklist();
            checklist.setDate(currentDate);
            checklist.setChallenge(challenge);
            checklist.setChecklistDayNumber(i);
            checklists.add(checklist);
            challenge.setDayNumber(i);
            currentDate = currentDate.plusDays(1);
        }

        challenge.setEndDate(endDate);
        challenge.setChecklists(checklists);
        challengeRepository.save(challenge);
        return challenge;
    }



    public List<Long> getAllChecklistImagesForChallenge(Long userId) {
        Long activeChallengeId = userRepository.findActiveChallengeByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Checklist> checklists = checklistRepository.findSubmittedChecklistWithImageByChallengeId(activeChallengeId);
        System.out.println("Checklist with ids:" + checklists);
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
        if (checklist.getWorkoutOne() != null && checklist.getWorkoutOne()) count++;
        if (checklist.getWorkoutTwo() != null && checklist.getWorkoutTwo()) count++;
        if (checklist.getDrinkWater() != null && checklist.getDrinkWater()) count++;
        if (checklist.getTakePicture() != null && checklist.getTakePicture()) count++;
        if (checklist.getNoAlcohol() != null && !checklist.getNoAlcohol()) count++;
        if (checklist.getNoCheatMeals() != null && !checklist.getNoCheatMeals()) count++;
        if (checklist.getReadTenPages() != null && !checklist.getReadTenPages()) count++;
        return count;
    }


    public Challenge endChallenge(Long challengeId, Challenge challenge) {
        Challenge existingChallenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new AppException("Challenge not found", HttpStatus.NOT_FOUND));
        updateChallengeFields(existingChallenge, challenge);
        User user = existingChallenge.getUser();
        user.setHasActiveChallenge(false);
        userRepository.save(user);
        return challengeRepository.save(existingChallenge);
    }

    public void updateChallengeFields(Challenge existingChallenge, Challenge challengeDetails) {
        LocalDate today = LocalDate.now();
        existingChallenge.setEndDate(today);
        existingChallenge.setActive(false);
    }
}
