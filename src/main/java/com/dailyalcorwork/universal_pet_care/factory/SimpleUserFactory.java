package com.dailyalcorwork.universal_pet_care.factory;

import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.request.RegistrationRequest;

public class SimpleUserFactory implements UserFactory {
    @Override
    public User createUser(RegistrationRequest registrationRequest) {
        return null;
    }
}
