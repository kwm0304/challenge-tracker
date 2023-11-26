package com.tracker5.repository;

import com.tracker5.entity.Challenge;
import com.tracker5.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    @Query("SELECT c.id FROM User u JOIN u.challenges c WHERE u.id = :userId AND c.active = true")
    Optional<Long> findActiveChallengeByUserId(@Param("userId") Long userId);


}
