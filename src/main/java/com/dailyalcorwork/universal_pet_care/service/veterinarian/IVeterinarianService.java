package com.dailyalcorwork.universal_pet_care.service.veterinarian;

import com.dailyalcorwork.universal_pet_care.dto.UserDto;

import java.util.List;

public interface IVeterinarianService {
    List<UserDto> getAllVeterinariansWithDetails();
}
