package com.dailyalcorwork.universal_pet_care.service.password;

import com.dailyalcorwork.universal_pet_care.model.User;

import java.util.Optional;

public interface IPasswordResetService {

    Optional<User> findUserByPasswordResetToken(String token);

    void passwordResetRequest(String email);

    String resetPassword(String password, User user);
}
