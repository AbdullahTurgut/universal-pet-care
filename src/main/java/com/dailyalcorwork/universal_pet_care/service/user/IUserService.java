package com.dailyalcorwork.universal_pet_care.service.user;

import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.request.RegistrationRequest;
import com.dailyalcorwork.universal_pet_care.request.UserUpdateRequest;

public interface IUserService {

    User register(RegistrationRequest request);

    User update(Long userId, UserUpdateRequest request);
}
