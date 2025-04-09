package com.dailyalcorwork.universal_pet_care.service.veterinarian;

import com.dailyalcorwork.universal_pet_care.dto.UserDto;
import com.dailyalcorwork.universal_pet_care.model.Veterinarian;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface IVeterinarianService {
    List<UserDto> getAllVeterinariansWithDetails();

    List<UserDto> findAvailableVeterinariansForAppointment(String specialization,
                                                           LocalDate date,
                                                           LocalTime time);

    List<Veterinarian> getVeterinariansBySpecialization(String specialization);
}
