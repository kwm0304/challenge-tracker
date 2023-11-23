package com.tracker5.service;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;
import com.tracker5.dto.ChallengeDto;
import com.tracker5.entity.Challenge;
import com.tracker5.entity.Checklist;
import com.tracker5.entity.User;
import com.tracker5.repository.ChallengeRepository;
import com.tracker5.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

        Challenge challenge = challengeRepository.findById(activeChallengeId)
                .orElseThrow(() -> new ResourceNotFoundException("Challenge not found"));

        return challenge.getChecklists().stream()
                .filter(checklist -> checklist.getSubmitted() != null && checklist.getSubmitted())
                .filter(checklist -> checklist.getImageId() != null && !checklist.getImageId().isBlank())
                .map(Checklist::getId)
                .collect(Collectors.toList());
    }
}
