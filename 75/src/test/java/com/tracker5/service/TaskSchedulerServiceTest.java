package com.tracker5.service;

import com.tracker5.entity.Checklist;
import com.tracker5.entity.User;
import com.tracker5.repository.ChallengeRepository;
import com.tracker5.repository.ChecklistRepository;
import com.tracker5.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class TaskSchedulerServiceTest {
    @InjectMocks
    private TaskSchedulerService taskSchedulerService;

    @Mock
    private ChallengeRepository challengeRepository;

    @Mock
    private EmailService emailService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ChecklistRepository checklistRepository;

    @Captor
    private ArgumentCaptor<String> nameCaptor;

    @Captor
    private ArgumentCaptor<String> emailCaptor;

    @Captor
    private ArgumentCaptor<String[]> taskCaptor;

    @Test
    void sendReminders() {
        LocalDate today = LocalDate.now();
        User user = new User();
        Checklist checklist = new Checklist();
        checklist.setWorkoutOne(false);
        checklist.setWorkoutTwo(false);
        checklist.setReadTenPages(true);
        checklist.setNoCheatMeals(true);
        checklist.setDrinkWater(true);
        checklist.setNoAlcohol(true);
        checklist.setTakePicture(true);

        when(userRepository.findAll()).thenReturn(Collections.singletonList(user));
        when(checklistRepository.findByDateAndChallengeId(today, user.getId())).thenReturn(Optional.of(checklist));

        taskSchedulerService.sendReminders();

        verify(emailService).sendReminder(nameCaptor.capture(), emailCaptor.capture(), taskCaptor.capture());

        assertEquals(user.getUsername(), nameCaptor.getValue());
        assertEquals(user.getEmail(), emailCaptor.getValue());

        List<String> capturedTasks = Arrays.asList(taskCaptor.getValue());
        System.out.println(capturedTasks);
        assertTrue(capturedTasks.contains("Workout 1"));
        assertTrue(capturedTasks.contains("Workout 2"));
    }
}