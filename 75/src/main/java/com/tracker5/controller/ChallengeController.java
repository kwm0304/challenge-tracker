package com.tracker5.controller;

import com.tracker5.entity.Challenge;
import com.tracker5.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/challenge")
public class ChallengeController {
    @Autowired
    private ChallengeService challengeService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Challenge> createChallenge(@PathVariable(name = "userId") Long userId) {
        Challenge newChallenge = challengeService.createChallenge(userId);
        return new ResponseEntity<>(newChallenge, HttpStatus.CREATED);
    }
}
