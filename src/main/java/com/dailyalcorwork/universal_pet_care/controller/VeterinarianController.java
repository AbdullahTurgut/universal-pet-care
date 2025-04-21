package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.dto.UserDto;
import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
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
import java.util.Map;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
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
        try {
            List<UserDto> availableVeterinarians = veterinarianService.findAvailableVeterinariansForAppointment(specialization, date, time);
            if (availableVeterinarians.isEmpty()) {
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(FeedBackMessage.NO_VETERINARIANS_AVAILABLE, null));
            }
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.RESOURCE_FOUND, availableVeterinarians));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // get mapping for specialization to frontend side
    @GetMapping(UrlMapping.GET_VETERINARIAN_SPECIALIZATIONS)
    public ResponseEntity<ApiResponse> getAllSpecialization() {
        try {
            List<String> specializations = veterinarianService.getSpecializations();
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.RESOURCE_FOUND, specializations));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // end point for aggregate vets by specialization
    @GetMapping(UrlMapping.VET_AGGREGATE_BY_SPECIALIZATION)
    public ResponseEntity<List<Map<String, Object>>> aggregateVetsBySpecialization() {
        List<Map<String, Object>> aggregatedVets = veterinarianService.aggregatedVetsBySpecialization();
        return ResponseEntity.ok(aggregatedVets);
    }
}
