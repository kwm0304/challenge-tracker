package com.tracker5.controller;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;
import com.tracker5.entity.Challenge;
import com.tracker5.repository.UserRepository;
import com.tracker5.security.UserDetailsImpl;
import com.tracker5.service.ChallengeService;
import com.tracker5.service.ChecklistService;
import com.tracker5.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/challenge")
public class ChallengeController {
    @Autowired
    private ChallengeService challengeService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChecklistService checklistService;

    @Autowired
    private UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Challenge> createChallenge(@AuthenticationPrincipal UserDetailsImpl currentUser) {
        Challenge newChallenge = challengeService.createChallenge(currentUser.getId());
        return new ResponseEntity<>(newChallenge, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}/images")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<Long>> getAllChecklistImagesForUser(@PathVariable Long userId) {
        System.out.println("Received userId: " + userId);
        List<Long> checklistIds = challengeService.getAllChecklistImagesForChallenge(userId);
        return ResponseEntity.ok(checklistIds);
    }

    @GetMapping("/{userId}/images/first-last")
    public ResponseEntity<List<byte[]>> getFirstAndLastImages(@PathVariable Long userId) {
        Long challengeId = userRepository.findActiveChallengeByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        List<Long> checklistIds = challengeService.getFirstAndLastImages(challengeId);
        List<byte[]> images = checklistIds.stream()
                .map(checklistService::getChecklistImage)
                .collect(Collectors.toList());
        return ResponseEntity.ok(images);
    }

    @PutMapping("/{challengeId}/end")
    public ResponseEntity<Challenge> endChallenge(@AuthenticationPrincipal UserDetailsImpl user, @RequestBody Challenge challenge) {
        Optional<Long> challengeId = userService.getActiveChallenge(user.getId());
        Challenge endedChallenge = challengeService.endChallenge(challengeId, challenge);
        return new ResponseEntity<>(endedChallenge, HttpStatus.OK);
    }
}
