package com.tracker5.mappers;

import com.tracker5.dto.ChallengeDto;
import com.tracker5.dto.ChecklistDto;
import com.tracker5.dto.UserDto;
import com.tracker5.entity.Challenge;
import com.tracker5.entity.Checklist;
import com.tracker5.entity.User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        ChallengeDto activeChallengeDto = user.getChallenges().stream()
                .filter(Challenge::isActive).findFirst()
                .map(this::toChallengeDto)
                .orElse(null);
        int dayNumber = 0;
        if (activeChallengeDto != null) {
            dayNumber = activeChallengeDto.getDayNumber();
        }

        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getRoles(), dayNumber);
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
                checklist.getNoAlcohol(), checklist.getTakePicture());
    }
}
