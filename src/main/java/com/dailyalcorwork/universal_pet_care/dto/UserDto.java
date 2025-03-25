package com.dailyalcorwork.universal_pet_care.dto;

import lombok.Data;

@Data
public class UserDto {

    // Veritabanındaki tüm verilerden ise frontendden dtodaki verilere ulasabilecegiz.
    private Long id;
    private String firstName;
    private String lastName;
    private String gender;
    private String phoneNumber;
    private String email;
    //private String password; // password not be show
    private String userType;
    private boolean isEnable;

    // @Transient -> hibernate bizim için bu sutunu kaydetmeyecek dbye.bu veterinere ait
    private String specialization;
}
