package com.tracker5.controller;

import com.tracker5.entity.Checklist;
import com.tracker5.security.UserDetailsImpl;
import com.tracker5.service.ChecklistService;
import com.tracker5.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/checklist")
public class ChecklistController {

    private final ChecklistService checklistService;
    private final UserService userService;

    @PutMapping("/current/{checklistId}")
    public ResponseEntity<Checklist> submitChecklist(@PathVariable Long checklistId, @RequestBody Checklist checklistDetails) {
        Checklist submittedChecklist = checklistService.updateChecklist(checklistId, checklistDetails);
        return new ResponseEntity<>(submittedChecklist, HttpStatus.OK);
    }

    @GetMapping("/current")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Checklist> getCurrentChecklist(@AuthenticationPrincipal UserDetailsImpl currentUser) {
        Optional<Long> activeChallengeId = userService.getActiveChallenge(currentUser.getId());

        if (activeChallengeId.isPresent()) {
            Checklist currentChecklist = checklistService.getCurrentDayChecklist(activeChallengeId.get());
            return new  ResponseEntity<>(currentChecklist, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
