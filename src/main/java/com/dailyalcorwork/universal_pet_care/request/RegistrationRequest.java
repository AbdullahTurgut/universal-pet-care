package com.dailyalcorwork.universal_pet_care.request;

import lombok.Data;

@Data
public class RegistrationRequest {

    private Long id;
    private String firstName;
    private String lastName;
    private String gender;
    private String phoneNumber;
    private String email;
    private String password;
    private String userType;
    private boolean isEnable;
    private String specialization;
}
