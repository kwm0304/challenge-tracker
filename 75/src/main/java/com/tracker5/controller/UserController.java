package com.tracker5.controller;

import com.tracker5.dto.ChallengeDto;
import com.tracker5.dto.UserDto;
import com.tracker5.dto.UserUpdateRequest;
import com.tracker5.entity.User;
import com.tracker5.mappers.UserMapper;
import com.tracker5.repository.UserRepository;
import com.tracker5.security.UserDetailsImpl;
import com.tracker5.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    @GetMapping("/profile")
    public UserDto getCurrentUser(@AuthenticationPrincipal UserDetailsImpl currentUser) {
        return userMapper.toUserDto(userService.validateAndGetUserByUsername(currentUser.getUsername()));
    }

    @PutMapping("/update/{userId}")
    public void updateUser(@RequestBody UserUpdateRequest updatedUser, @PathVariable("userId") Long userId) {
        userService.updateUser(userId, updatedUser);
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable(name = "userId") Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User userToBeDeleted = optionalUser.get();
            userService.deleteUser(userToBeDeleted);
            return ResponseEntity.ok(1);
        }
        return ResponseEntity.ok(0);
    }
}
