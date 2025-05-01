package com.dailyalcorwork.universal_pet_care.service.password;

import com.dailyalcorwork.universal_pet_care.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PasswordResetService implements IPasswordResetService {


    @Override
    public Optional<User> findUserByPasswordResetToken(String token) {
        return Optional.empty();
    }

    @Override
    public void passwordResetRequest(String email) {

    }

    @Override
    public String resetPassword(String password, User user) {
        return "";
    }
}
