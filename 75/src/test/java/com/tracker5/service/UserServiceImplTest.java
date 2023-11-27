package com.tracker5.service;

import com.tracker5.dto.SignUpDto;
import com.tracker5.controller.AuthenticationController;
import com.tracker5.entity.User;
import com.tracker5.repository.UserRepository;
import com.tracker5.s3.S3Buckets;
import com.tracker5.s3.S3Service;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.*;

import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@ExtendWith(MockitoExtension.class)
@TestPropertySource(locations = "classpath:application-test.properties")
@ActiveProfiles("test")
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private S3Service s3Service;
    @Mock
    private S3Buckets s3Buckets;
    @InjectMocks
    private UserServiceImpl underTest;

    @BeforeEach
    void setUp() {
        underTest = new UserServiceImpl(userRepository, passwordEncoder);
    }

    @Test
    void getAllUsers() {
        List<User> userList = List.of(
                new User("DietMountainDew", "dietmtdew@email.com", "Password123", "USER"),
                new User("UserName1", "user1@example.com", "Password123", "USER"),
                new User("UserName2", "user2@example.com", "Password123", "USER"),
                new User("UserName3", "user3@example.com", "Password123", "USER"),
                new User("UserName4", "user4@example.com", "Password123", "USER"),
                new User("UserName5", "user5@example.com", "Password123", "USER"),
                new User("UserName6", "user6@example.com", "Password123", "USER"),
                new User("UserName7", "user7@example.com", "Password123", "USER"),
                new User("UserName8", "user8@example.com", "Password123", "USER"),
                new User("UserName9", "user9@example.com", "Password123", "USER"));

        when(userRepository.findAll()).thenReturn(userList);

        List<User> result = underTest.getAllUsers();

        assertEquals(userList, result);

        verify(userRepository, times(1)).findAll();
    }

    @Test
    void getUserByUsername() {
    }

    @Test
    void hasUserWithUsername() {
    }

    @Test
    void hasUserWithEmail() {
    }

    @Test
    void validateAndGetUserByUsername() {
    }

    @Test
    void saveUser() {
        String email = "iphone@email.com";

        SignUpDto request = new SignUpDto("Username123", "password", email);
        User expectedUser = new User();
        String passwordHash = "¢5554ml;f;lsd";

        expectedUser.setUsername(request.getUsername());
        expectedUser.setPassword(request.getPassword());
        expectedUser.setEmail(request.getEmail());

        when(passwordEncoder.encode(request.getPassword())).thenReturn(passwordHash);
        when(userRepository.save(any(User.class))).thenReturn(expectedUser);

        User savedUser = underTest.saveUser(mapSignUpDtoToUser(request));

        assertNotNull(savedUser);
        System.out.println("Saved user" + savedUser);
        assertEquals(expectedUser.getUsername(), savedUser.getUsername());
        assertEquals(expectedUser.getPassword(), savedUser.getPassword());
        assertEquals(expectedUser.getEmail(), savedUser.getEmail());

        verify(passwordEncoder, times(1)).encode(request.getPassword());
        verify(userRepository, times(1)).save(any(User.class));
    }

    private User mapSignUpDtoToUser(SignUpDto signUpDto) {
        User user = new User();
        Long id = 500L;
        LocalDateTime now = LocalDateTime.now();
        user.setId(id);
        user.setUsername(signUpDto.getUsername());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
        user.setEmail(signUpDto.getEmail());
        user.setRoles("USER");
        user.setCreatedDate(now);
        return user;
    }

    @Test
    void deleteUser() {
    }

    @Test
    void findByUsername() {
    }

    @Test
    void getActiveChallenge() {
    }

    @Test
    void updateUser() {
    }
}