package com.dailyalcorwork.universal_pet_care.service.patient;

import com.dailyalcorwork.universal_pet_care.dto.EntityConverter;
import com.dailyalcorwork.universal_pet_care.dto.UserDto;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.service.photo.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService implements IPatientService {

    private final UserRepository userRepository;
    private final EntityConverter<User, UserDto> entityConverter;
    private final PhotoService photoService;

    @Override
    public List<UserDto> getAllPatientsWithDetails() {
        List<User> patients = userRepository.findAllByUserType("PATIENT");
        return patients
                .stream()
                .map(this::mapPatientToUserDto)
                .toList();
    }

    private UserDto mapPatientToUserDto(User user) {
        UserDto userDto = entityConverter.mapEntityToDto(user, UserDto.class);
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
}
