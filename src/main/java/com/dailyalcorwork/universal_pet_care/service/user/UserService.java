package com.dailyalcorwork.universal_pet_care.service.user;

import com.dailyalcorwork.universal_pet_care.factory.UserFactory;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.request.RegistrationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    //private final UserRepository userRepository;
    private final UserFactory userFactory;

    public User add(RegistrationRequest request) {
        return userFactory.createUser(request);
    }
}
