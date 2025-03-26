package com.dailyalcorwork.universal_pet_care.request;

import lombok.Data;

@Data
public class UserUpdateRequest {

    // burda update yaptırmayı uygun bulduğumuz verileri olacak
    private String firstName;
    private String lastName;
    private String gender;
    private String phoneNumber;
    private String specialization;
}
