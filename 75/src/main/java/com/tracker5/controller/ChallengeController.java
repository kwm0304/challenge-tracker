package com.tracker5.controller;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;
import com.tracker5.entity.Challenge;
import com.tracker5.exception.AppException;
import com.tracker5.repository.ChallengeRepository;
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

    @Autowired
    private ChallengeRepository challengeRepository;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Challenge> createChallenge(@AuthenticationPrincipal UserDetailsImpl currentUser) {
        Challenge newChallenge = challengeService.createChallenge(currentUser.getId());
        return new ResponseEntity<>(newChallenge, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}/images")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<List<byte[]>> getAllChecklistImagesForUser(@PathVariable Long userId) {
        System.out.println("Received userId: " + userId);
        List<byte[]> checklistImages = challengeService.getAllChecklistImagesForChallenge(userId);
        return ResponseEntity.ok(checklistImages);
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
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Challenge> endChallenge(@PathVariable(name = "challengeId") Long challengeId) {
        Challenge challengeToEnd = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new AppException("Challenge not found", HttpStatus.NOT_FOUND));
        Challenge endedChallenge = challengeService.endChallenge(challengeId, challengeToEnd);
        return new ResponseEntity<>(endedChallenge, HttpStatus.OK);
    }

    @GetMapping("/id")
    public Long getChallengeId(@AuthenticationPrincipal UserDetailsImpl user) {
        Optional<Long> activeChallengeId = userService.getActiveChallenge(user.getId());
        if (activeChallengeId.isPresent()) {
            return activeChallengeId.get();
        } else {
            throw new AppException("Challenge not found", HttpStatus.NOT_FOUND);
        }
    }
}
