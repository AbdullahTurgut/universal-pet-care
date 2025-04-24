package com.dailyalcorwork.universal_pet_care.service.patient;

import com.dailyalcorwork.universal_pet_care.dto.UserDto;

import java.util.List;

public interface IPatientService {
    List<UserDto> getAllPatientsWithDetails();
}
