package com.tracker5.mappers;

import com.tracker5.dto.UserDto;
import com.tracker5.entity.User;

public interface UserMapper {
    UserDto toUserDto(User user);
}
