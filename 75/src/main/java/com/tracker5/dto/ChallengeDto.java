package com.tracker5.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class ChallengeDto {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private int dayNumber;
    private ChecklistDto todaysChecklist;

    public ChallengeDto(Long id, LocalDate startDate, LocalDate endDate, int dayNumber, ChecklistDto todaysChecklist) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.dayNumber = dayNumber;
        this.todaysChecklist = todaysChecklist;
    }
}
