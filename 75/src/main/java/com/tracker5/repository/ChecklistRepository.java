package com.tracker5.repository;

import com.tracker5.entity.Checklist;
import jakarta.transaction.Transactional;
import org.hibernate.annotations.Check;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Repository
@Transactional
public interface ChecklistRepository extends JpaRepository<Checklist, Long> {
    Optional<Checklist> findByDateAndChallengeId(LocalDate date, Long challengeId);
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Checklist c SET c.imageId = ?1 WHERE c.id = ?2")
    void updateChecklistImageId(String imageId, Long checklistId);

}
