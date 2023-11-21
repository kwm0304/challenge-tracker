package com.tracker5.controller;

import com.tracker5.entity.Challenge;
import com.tracker5.security.UserDetailsImpl;
import com.tracker5.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/challenge")
public class ChallengeController {
    @Autowired
    private ChallengeService challengeService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Challenge> createChallenge(@AuthenticationPrincipal UserDetailsImpl currentUser) {
        Challenge newChallenge = challengeService.createChallenge(currentUser.getId());
        return new ResponseEntity<>(newChallenge, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}/images")
    public ResponseEntity<List<String>> getAllChecklistImagesForUser(@PathVariable Long userId) {
        List<String> imageIds = challengeService.getAllChecklistImagesForChallenge(userId);
        return ResponseEntity.ok(imageIds);
    }
}
