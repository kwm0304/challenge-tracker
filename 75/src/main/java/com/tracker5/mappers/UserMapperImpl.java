package com.tracker5.mappers;

import com.tracker5.dto.ChallengeDto;
import com.tracker5.dto.ChecklistDto;
import com.tracker5.dto.UserDto;
import com.tracker5.entity.Challenge;
import com.tracker5.entity.Checklist;
import com.tracker5.entity.User;
import com.tracker5.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Set;

@Service
public class UserMapperImpl implements UserMapper {
    @Autowired
    private ChallengeService challengeService;

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        ChallengeDto activeChallengeDto = user.getChallenges().stream()
                .filter(Challenge::isActive).findFirst()
                .map(this::toChallengeDto)
                .orElse(null);
        int dayNumber = 1;
        int numberCompleted = 0;
        if (activeChallengeDto != null) {
            dayNumber = activeChallengeDto.getDayNumber();
            numberCompleted = challengeService.getTotalCompletedTaskForChallenge(activeChallengeDto.getId());
        }

        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getRoles(), dayNumber, numberCompleted);
    }

    private ChallengeDto toChallengeDto(Challenge challenge) {
        if (challenge == null) {
            return null;
        }
        ChecklistDto todaysChecklistDto = getTodaysCheclist(challenge.getChecklists());
        return new ChallengeDto(challenge.getId(), challenge.getStartDate(), challenge.getEndDate(), challenge.getDayNumber(), todaysChecklistDto);
    }

    private ChecklistDto getTodaysCheclist(Set<Checklist> checklists) {
        LocalDate today = LocalDate.now();
        return checklists.stream()
                .filter(checklist -> checklist.getDate().equals(today))
                .findFirst()
                .map(this::toChecklistDto)
                .orElse(null);
    }

    private LocalDate toLocalDate(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    private ChecklistDto toChecklistDto(Checklist checklist) {
        if (checklist == null) {
            return null;
        }
        return new ChecklistDto(checklist.getId(), checklist.getDate(), checklist.getWorkoutOne(),
        checklist.getWorkoutTwo(), checklist.getReadTenPages(), checklist.getDrinkWater(), checklist.getNoCheatMeals(),
                checklist.getNoAlcohol(), checklist.getTakePicture(), checklist.getChecklistDayNumber());
    }
}
