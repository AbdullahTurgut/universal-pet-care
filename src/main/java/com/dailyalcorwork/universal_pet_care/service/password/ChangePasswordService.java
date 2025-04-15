package com.dailyalcorwork.universal_pet_care.service.password;

import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.request.ChangePasswordRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@RequiredArgsConstructor
@Service
public class ChangePasswordService implements IChangePasswordService {

    private final UserRepository userRepository;

    @Override
    public void changePassword(Long userId, ChangePasswordRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (Objects.equals(request.getCurrentPassword(), "")
                || Objects.equals(request.getNewPassword(), "")) {
            throw new IllegalArgumentException("All fields are required");
        }

        if (!Objects.equals(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password does not match");
        }

        if (!Objects.equals(request.getNewPassword(), request.getConfirmNewPassword())) {
            throw new IllegalArgumentException("Password confirmation miss-match");
        }

        user.setPassword(request.getNewPassword());
        userRepository.save(user);
    }
}
