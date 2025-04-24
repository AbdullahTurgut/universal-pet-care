package com.dailyalcorwork.universal_pet_care.service.veterinarian;

import com.dailyalcorwork.universal_pet_care.dto.EntityConverter;
import com.dailyalcorwork.universal_pet_care.dto.UserDto;
import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.Appointment;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.model.Veterinarian;
import com.dailyalcorwork.universal_pet_care.repository.AppointmentRepository;
import com.dailyalcorwork.universal_pet_care.repository.ReviewRepository;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.repository.VeterinarianRepository;
import com.dailyalcorwork.universal_pet_care.service.photo.PhotoService;
import com.dailyalcorwork.universal_pet_care.service.review.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VeterinarianService implements IVeterinarianService {
    private final VeterinarianRepository veterinarianRepository;
    private final EntityConverter<User, UserDto> entityConverter;
    private final ReviewService reviewService;
    private final ReviewRepository reviewRepository;
    private final PhotoService photoService;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;


    @Override
    public List<UserDto> getAllVeterinariansWithDetails() {
        List<User> veterinarians = userRepository.findAllByUserType("VET");
        return veterinarians
                .stream()
                .map(this::mapVeterinarianToUserDto)
                .toList();
    }

    private UserDto mapVeterinarianToUserDto(User user) {
        UserDto userDto = entityConverter.mapEntityToDto(user, UserDto.class);
        double averageRating = reviewService.getAverageRatingForVet(user.getId());
        Long totalReviewer = reviewRepository.countByVeterinarianId(user.getId());
        userDto.setAverageRating(averageRating);
        userDto.setTotalReviewers(totalReviewer);
        if (user.getPhoto() != null) {
            try {
                byte[] photoBytes = photoService.getImageData(user.getPhoto().getId());
                userDto.setPhoto(photoBytes);
            } catch (SQLException e) {
                throw new RuntimeException(e.getMessage());
            }
        }
        return userDto;
    }

    // search appointment area for frontend

    @Override
    public List<UserDto> findAvailableVeterinariansForAppointment(String specialization,
                                                                  LocalDate date,
                                                                  LocalTime time) {
        List<Veterinarian> filteredVeterinarians = getAvailableVeterinarians(specialization, date, time);
        return filteredVeterinarians
                .stream()
                .map(this::mapVeterinarianToUserDto)
                .toList();
    }

    @Override
    public List<Veterinarian> getVeterinariansBySpecialization(String specialization) {
        if (!veterinarianRepository.existsBySpecialization(specialization)) {
            throw new ResourceNotFoundException("No veterinarian found with " + specialization + " in the system");
        }
        return veterinarianRepository.findBySpecialization(specialization);
    }

    private List<Veterinarian> getAvailableVeterinarians(String specialization, LocalDate date, LocalTime time) {
        List<Veterinarian> veterinarians = getVeterinariansBySpecialization(specialization);
        return veterinarians
                .stream()
                .filter(veterinarian -> isVeterinarianAvailable(veterinarian, date, time))
                .toList();
    }

    private boolean isVeterinarianAvailable(Veterinarian veterinarian,
                                            LocalDate requestedDate,
                                            LocalTime requestedTime) {
        if (requestedDate != null && requestedTime != null) {
            LocalTime requestedEndTime = requestedTime.plusHours(2);
            return appointmentRepository.findByVeterinarianAndDate(veterinarian, requestedDate)
                    .stream()
                    .noneMatch(existingAppointment -> doesAppointmentOverLap(existingAppointment, requestedTime, requestedEndTime));
        }
        return true;
    }


    private boolean doesAppointmentOverLap(Appointment existingAppointment,
                                           LocalTime requestedStartTime,
                                           LocalTime requestedEndTime) {
        LocalTime existingStartTime = existingAppointment.getTime(); // exp - 11:00
        LocalTime existingEndTime = existingStartTime.plusHours(2); // end - 13:00
        LocalTime unavailableStartTime = existingStartTime.minusHours(1); // unv-start - 10:00
        LocalTime unavailableEndTime = existingEndTime.plusMinutes(170); // unv-end - 15:50

        return !requestedStartTime.isBefore(unavailableStartTime) && !requestedEndTime.isAfter(unavailableEndTime);

    }


    // method for get and add specialization to frontend
    @Override
    public List<String> getSpecializations() {
        return veterinarianRepository.getDistinctSpecialization();
    }


    // method for aggregate vet by specialization

    @Override
    public List<Map<String, Object>> aggregatedVetsBySpecialization() {
        List<Object[]> results = veterinarianRepository.countVetsBySpecialization();
        return results.stream()
                .map(result -> Map.of("specialization", result[0], "count", result[1]))
                .collect(Collectors.toList());
    }
}
