package com.tracker5.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
public class ChecklistDto {
    private Long id;
    private LocalDate date;
    private Boolean workoutOne;
    private Boolean workoutTwo;
    private Boolean readTenPages;
    private Boolean drinkWater;
    private Boolean noCheatMeals;
    private Boolean noAlcohol;
    private Boolean takePicture;
    private int checklistDayNumber;
    public ChecklistDto(Long id, LocalDate date, Boolean workoutOne, Boolean workoutTwo, Boolean readTenPages, Boolean drinkWater, Boolean noCheatMeals, Boolean noAlcohol, Boolean takePicture,
                        int checklistDayNumber) {
        this.id = id;
        this.date = date;
        this.workoutOne = workoutOne;
        this.workoutTwo = workoutTwo;
        this.readTenPages = readTenPages;
        this.drinkWater = drinkWater;
        this.noCheatMeals = noCheatMeals;
        this.noAlcohol = noAlcohol;
        this.takePicture = takePicture;
        this.checklistDayNumber = checklistDayNumber;
    }
}
