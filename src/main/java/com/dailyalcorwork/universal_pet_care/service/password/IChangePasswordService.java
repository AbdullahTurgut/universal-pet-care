package com.dailyalcorwork.universal_pet_care.service.password;

import com.dailyalcorwork.universal_pet_care.request.ChangePasswordRequest;

public interface IChangePasswordService {

    void changePassword(Long userId, ChangePasswordRequest request);
}
