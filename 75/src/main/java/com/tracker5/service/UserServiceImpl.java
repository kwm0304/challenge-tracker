package com.tracker5.service;

import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException;
import com.tracker5.dto.UserUpdateRequest;
import com.tracker5.entity.Challenge;
import com.tracker5.entity.User;
import com.tracker5.exception.AppException;
import com.tracker5.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean hasUserWithUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User validateAndGetUserByUsername(String username) {
        return getUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public Optional<Long> getActiveChallenge(Long userId) {
        return userRepository.findActiveChallengeByUserId(userId);
    }

    @Override
    public void updateUser(Long userId, UserUpdateRequest updatedUser) throws UsernameNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        boolean changes = false;

        if (updatedUser.email() != null && !updatedUser.email().equals(user.getEmail())) {
            if (userRepository.existsByEmail(updatedUser.email())) {
                throw new AppException("Email already in use", HttpStatus.BAD_REQUEST);
            }
            user.setEmail(updatedUser.email());
            changes = true;
        }

        if (!changes) {
            throw new ResourceNotFoundException("No changes found");
        }
        userRepository.save(user);
    }


}
