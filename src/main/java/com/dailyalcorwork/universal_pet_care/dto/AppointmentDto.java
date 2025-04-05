package com.dailyalcorwork.universal_pet_care.dto;

import com.dailyalcorwork.universal_pet_care.enums.AppointmentStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class AppointmentDto {

    private Long id;
    private LocalDate date;
    private LocalTime time;
    private LocalDate createdAt;
    private String reason;
    private AppointmentStatus status;
    private String appointmentNo;
    private UserDto patient;
    private UserDto veterinarian;
    private List<PetDto> pets;
}
