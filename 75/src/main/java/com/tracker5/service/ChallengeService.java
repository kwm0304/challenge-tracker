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

import java.util.*;

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

        Date startDate = new Date();
        challenge.setStartDate(startDate);
        challenge.setActive(true);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);

        Set<Checklist> checklists = new HashSet<>();

        for (int i = 0; i < 75; i++) {
            Checklist checklist = new Checklist();
            checklist.setDate(calendar.getTime());
            checklist.setChallenge(challenge);
            checklists.add(checklist);
            calendar.add(Calendar.DAY_OF_YEAR, 1);
        }
        calendar.add(Calendar.DAY_OF_YEAR, -1);
        Date endDate = calendar.getTime();
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
}
