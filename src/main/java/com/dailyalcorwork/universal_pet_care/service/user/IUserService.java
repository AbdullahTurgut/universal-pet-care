package com.dailyalcorwork.universal_pet_care.service.user;

import com.dailyalcorwork.universal_pet_care.dto.UserDto;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.request.RegistrationRequest;
import com.dailyalcorwork.universal_pet_care.request.UserUpdateRequest;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface IUserService {

    User register(RegistrationRequest request);

    User update(Long userId, UserUpdateRequest request);

    User findById(Long userId);

    void delete(Long userId);

    List<UserDto> getAllUsers();

    UserDto getUserWithDetails(Long userId) throws SQLException;

    long countVeterinarians();

    long countPatients();

    long countAllUsers();

    // for mapping the users by month
    Map<String, Map<String, Long>> aggregateUsersByMonthAndType();

    // for mapping user accounts chart to frontend
    Map<String, Map<String, Long>> aggregateUsersByEnableStatusAndType();
}
