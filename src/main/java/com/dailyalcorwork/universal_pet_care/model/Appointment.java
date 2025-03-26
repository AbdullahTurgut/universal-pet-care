package com.dailyalcorwork.universal_pet_care.model;

import java.time.LocalDate;
import java.time.LocalTime;

public class Appointment {
    private Long id;
    private String reason;
    private LocalDate date;
    private LocalTime time;
    private String appointmentNo;
    private LocalDate createdAt;
    private User patient;
    private User veterinarian;
}
