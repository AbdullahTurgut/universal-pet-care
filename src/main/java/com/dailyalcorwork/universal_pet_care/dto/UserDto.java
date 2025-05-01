package com.dailyalcorwork.universal_pet_care.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
public class UserDto {

    // Veritabanındaki tüm verilerden ise frontendden dtodaki verilere ulasabilecegiz.
    private Long id;
    private String firstName;
    private String lastName;
    private String gender;
    private String phoneNumber;
    private String email;
    //private String password; // password not 
    private String userType;
    private boolean isEnable;

    // @Transient -> hibernate bizim için bu sutunu kaydetmeyecek dbye.bu veterinere ait
    private String specialization;

    private LocalDate createdAt;
    private List<AppointmentDto> appointments;
    private List<ReviewDto> reviews;
    private Long photoId;
    private byte[] photo;
    private Double averageRating;
    private Set<String> roles;
    private Long totalReviewers;
}
