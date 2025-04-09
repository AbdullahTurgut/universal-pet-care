package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.dto.UserDto;
import com.dailyalcorwork.universal_pet_care.response.ApiResponse;
import com.dailyalcorwork.universal_pet_care.service.veterinarian.IVeterinarianService;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import com.dailyalcorwork.universal_pet_care.utils.UrlMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping(UrlMapping.VETERINARIANS)
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class VeterinarianController {
    private final IVeterinarianService veterinarianService;

    @GetMapping(UrlMapping.GET_ALL_VETERINARIANS)
    public ResponseEntity<ApiResponse> getAllVeterinarians() {
        List<UserDto> allVeterinarians = veterinarianService.getAllVeterinariansWithDetails();
        return ResponseEntity.ok(new ApiResponse(FeedBackMessage.RESOURCE_FOUND, allVeterinarians));
    }

    @GetMapping(UrlMapping.SEARCH_VETERINARIAN_FOR_APPOINTMENT)
    public ResponseEntity<ApiResponse> searchVeterinariansForAppointment(@RequestParam(required = false) LocalDate date,
                                                                         @RequestParam(required = false) LocalTime time,
                                                                         @RequestParam String specialization) {
        List<UserDto> availableVeterinarians = veterinarianService.findAvailableVeterinariansForAppointment(specialization, date, time);
        if (availableVeterinarians.isEmpty()) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(FeedBackMessage.NO_VETERINARIANS_AVAILABLE, null));
        }
        return ResponseEntity.ok(new ApiResponse(FeedBackMessage.RESOURCE_FOUND, availableVeterinarians));
    }
}
