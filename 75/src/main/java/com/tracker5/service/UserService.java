package com.tracker5.service;

import com.tracker5.dto.UserUpdateRequest;
import com.tracker5.entity.Challenge;
import com.tracker5.entity.User;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserByUsername(String username);

    boolean hasUserWithUsername(String username);
    boolean hasUserWithEmail(String email);
    User validateAndGetUserByUsername(String username);
    User saveUser(User user);
    void deleteUser(User user);

    User findByUsername(String username);

    Optional<Long> getActiveChallenge(Long userId);

    void updateUser(Long userId, UserUpdateRequest updatedUser);
}
