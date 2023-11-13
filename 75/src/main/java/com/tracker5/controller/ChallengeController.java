package com.tracker5.controller;

import com.tracker5.entity.Challenge;
import com.tracker5.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/challenge")
public class ChallengeController {
    @Autowired
    private ChallengeService challengeService;

    @PostMapping("/{userId}")
    public ResponseEntity<Challenge> createChallenge(@PathVariable(name = "userId") Long userId) {
        Challenge newChallenge = challengeService.createChallenge(userId);
        return new ResponseEntity<>(newChallenge, HttpStatus.CREATED);
    }
}
