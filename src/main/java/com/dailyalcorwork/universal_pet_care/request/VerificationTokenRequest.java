package com.dailyalcorwork.universal_pet_care.request;

import com.dailyalcorwork.universal_pet_care.model.User;
import lombok.Data;

import java.util.Date;

@Data
public class VerificationTokenRequest {

    private String token;
    private Date expirationTime;
    private User user;
}
