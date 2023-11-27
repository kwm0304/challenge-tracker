package com.tracker5.service;


import com.tracker5.entity.Checklist;
import com.tracker5.entity.User;
import com.tracker5.repository.ChallengeRepository;
import com.tracker5.repository.ChecklistRepository;
import com.tracker5.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@EnableScheduling
public class TaskSchedulerService {

    @Autowired
    private ChallengeRepository challengeRepository;
    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Scheduled(cron = "0 0 21 * * *")
    public void sendReminders() {
        LocalDate today = LocalDate.now();
        List<User> users = userRepository.findAll();
        for (User user : users) {
            Optional<Checklist> optionalChecklist = checklistRepository.findByDateAndChallengeId(today, user.getId());
            if (optionalChecklist.isPresent()) {
                Checklist checklist = optionalChecklist.get();
                List<String> incompleteTasks = getIncompleteTasks(checklist);
                if (!incompleteTasks.isEmpty()) {
                    String[] tasksArray = incompleteTasks.toArray(new String[0]);
                    emailService.sendReminder(user.getUsername(), user.getEmail(), tasksArray);
                }
            }
        }
    }

    private List<String> getIncompleteTasks(Checklist checklist) {
        List<String> incompleteTasks = new ArrayList<>();
        if (!checklist.getWorkoutOne()) incompleteTasks.add("Workout 1");
        if (!checklist.getWorkoutTwo()) incompleteTasks.add("Workout 2");
        if (!checklist.getNoCheatMeals()) incompleteTasks.add("No cheat meals");
        if (!checklist.getNoAlcohol()) incompleteTasks.add("No alcohol");
        if (!checklist.getReadTenPages()) incompleteTasks.add("Read ten pages");
        if (!checklist.getTakePicture()) incompleteTasks.add("Take picture");
        if (!checklist.getDrinkWater()) incompleteTasks.add("Drink a gallon of water");

        return incompleteTasks;
    }
}
