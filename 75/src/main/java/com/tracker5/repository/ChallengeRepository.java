package com.tracker5.repository;

import com.tracker5.dto.ChallengeDto;
import com.tracker5.entity.Challenge;
import com.tracker5.entity.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    @Query("SELECT c.startDate as startDate, c.endDate as endDate, c.dayNumber as dayNumber " +
    "FROM Challenge c WHERE c.user.id = :userId AND c.active = true")
    Optional<ChallengeDto> findActiveChallengeByUserId(Long userId);

} 
