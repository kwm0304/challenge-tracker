package com.tracker5.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Checklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;
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
    private Challenge challenge;

    @OneToOne(mappedBy = "checklist", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    private Image image;
}
