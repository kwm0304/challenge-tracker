package com.tracker5.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "checklist", indexes = {
@Index(name = "idx_checklist_date", columnList = "date")
})
public class Checklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
//              FORM VALUES
    @Column(columnDefinition = "BOOLEAN")
    private Boolean workoutOne;
    @Column(columnDefinition = "BOOLEAN")
    private Boolean workoutTwo;
    @Column(columnDefinition = "BOOLEAN")
    private Boolean readTenPages;
    @Column(columnDefinition = "BOOLEAN")
    private Boolean drinkWater;
    @Column(columnDefinition = "BOOLEAN")
    private Boolean noCheatMeals;
    @Column(columnDefinition = "BOOLEAN")
    private Boolean noAlcohol;
    @Column(columnDefinition = "BOOLEAN")
    private Boolean takePicture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    @JsonIgnore
    private Challenge challenge;

    private String imageId;
    @Column(columnDefinition = "BOOLEAN")
    private Boolean submitted;
}
