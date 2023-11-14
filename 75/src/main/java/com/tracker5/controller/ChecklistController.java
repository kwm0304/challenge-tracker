package com.tracker5.controller;

import com.tracker5.entity.Checklist;
import com.tracker5.service.ChecklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/checklist")
public class ChecklistController {

    private final ChecklistService checklistService;

    @PutMapping("/{checklistId}")
    public ResponseEntity<Checklist> submitChecklist(@PathVariable Long checklistId, @RequestBody Checklist checklistDetails) {
        Checklist submittedChecklist = checklistService.updateChecklist(checklistId, checklistDetails);
        return new ResponseEntity<>(submittedChecklist, HttpStatus.OK);
    }

    @GetMapping("/current/{challengeId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Checklist> getCurrentChecklist(@PathVariable Long challengeId) {
        Checklist currentDaysChecklist = checklistService.getCurrentDayChecklist(challengeId);
        return new ResponseEntity<>(currentDaysChecklist, HttpStatus.OK);
    }

}
