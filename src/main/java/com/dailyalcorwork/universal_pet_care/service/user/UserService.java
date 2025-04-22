package com.dailyalcorwork.universal_pet_care.service.user;

import com.dailyalcorwork.universal_pet_care.dto.AppointmentDto;
import com.dailyalcorwork.universal_pet_care.dto.EntityConverter;
import com.dailyalcorwork.universal_pet_care.dto.ReviewDto;
import com.dailyalcorwork.universal_pet_care.dto.UserDto;
import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.factory.UserFactory;
import com.dailyalcorwork.universal_pet_care.model.Appointment;
import com.dailyalcorwork.universal_pet_care.model.Review;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.repository.AppointmentRepository;
import com.dailyalcorwork.universal_pet_care.repository.ReviewRepository;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.request.RegistrationRequest;
import com.dailyalcorwork.universal_pet_care.request.UserUpdateRequest;
import com.dailyalcorwork.universal_pet_care.service.appointment.AppointmentService;
import com.dailyalcorwork.universal_pet_care.service.photo.IPhotoService;
import com.dailyalcorwork.universal_pet_care.service.review.ReviewService;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final UserFactory userFactory;
    private final EntityConverter<User, UserDto> entityConverter;
    private final AppointmentService appointmentService;
    private final IPhotoService photoService;
    private final ReviewService reviewService;
    private final ReviewRepository reviewRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    public User register(RegistrationRequest request) {
        return userFactory.createUser(request);
    }

    @Override
    public User update(Long userId, UserUpdateRequest request) {
        User user = findById(userId);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setGender(request.getGender());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setSpecialization(request.getSpecialization());
        return userRepository.save(user);
    }

    @Override
    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public void delete(Long userId) {
        // bu methodu frontend de delete account islemini yapabilmek icin revize edecegim

//        userRepository.findById(userId).ifPresentOrElse(userRepository::delete, () -> {
//            throw new ResourceNotFoundException("User not found");
//        });
        userRepository.findById(userId).ifPresentOrElse(userToDelete -> {
            List<Review> reviews = new ArrayList<>(reviewRepository.findAllByUserId(userId));
            reviewRepository.deleteAll(reviews);
            List<Appointment> appointments = new ArrayList<>(appointmentRepository.findAllByUserId(userId));
            appointmentRepository.deleteAll(appointments);
            userRepository.deleteById(userId);
        }, () -> {
            throw new ResourceNotFoundException(FeedBackMessage.RESOURCE_NOT_FOUND);
        });
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users
                .stream()
                .map(user -> entityConverter.mapEntityToDto(user, UserDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getUserWithDetails(Long userId) throws SQLException {
        // 1. get the user
        User user = findById(userId);
        // 2. convert the user to userDto
        UserDto userDto = entityConverter.mapEntityToDto(user, UserDto.class);
        userDto.setTotalReviewers(reviewRepository.countByVeterinarianId(userId));
        // 3. get user appointments  ( users ( patient and veterinarian) )
        setUserAppointment(userDto);
        // 4. get user photo
        setUserPhoto(userDto, user);
        // 5. get user reviews  ( users ( patient and veterinarian) )
        setUserReviews(userId, userDto);

        return userDto;
    }

    // method for third one (3.)
    private void setUserAppointment(UserDto userDto) {
        List<AppointmentDto> appointments = appointmentService.getUserAppointments(userDto.getId());
        userDto.setAppointments(appointments);
    }

    // method for fourth one (4.)
    private void setUserPhoto(UserDto userDto, User user) throws SQLException {
        if (user.getPhoto() != null) {
            userDto.setPhotoId(user.getPhoto().getId());
            userDto.setPhoto(photoService.getImageData(user.getPhoto().getId()));
        }
    }

    private void setUserReviews(Long userId, UserDto userDto) {
        Page<Review> reviewPage = reviewService.findAllReviewsByUserId(userId, 0, Integer.MAX_VALUE);
        List<ReviewDto> reviewDto = reviewPage.getContent()
                .stream()
                .map(this::mapReviewToDto).toList();
        if (!reviewDto.isEmpty()) {
            double averageRating = reviewService.getAverageRatingForVet(userId);
            userDto.setAverageRating(averageRating);
        }
        userDto.setReviews(reviewDto);
    }

    private ReviewDto mapReviewToDto(Review review) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setId(review.getId());
        reviewDto.setStars(review.getStars());
        reviewDto.setFeedback(review.getFeedback());
        mapVeterinarianInfo(reviewDto, review);
        mapPatientInfo(reviewDto, review);
        return reviewDto;
    }

    private void mapVeterinarianInfo(ReviewDto reviewDto, Review review) {
        if (review.getVeterinarian() != null) {
            reviewDto.setVeterinarianId(review.getVeterinarian().getId());
            reviewDto.setVeterinarianName(review.getVeterinarian().getFirstName() + " " + review.getVeterinarian().getLastName());
            // set the veterinarian photo
            setVeterinarianPhoto(reviewDto, review);
        }
    }

    private void mapPatientInfo(ReviewDto reviewDto, Review review) {
        if (review.getPatient() != null) {
            reviewDto.setPatientId(review.getPatient().getId());
            reviewDto.setPatientName(review.getPatient().getFirstName() + " " + review.getPatient().getLastName());
            // set the patient photo
            setReviewPhoto(reviewDto, review);
        }
    }

    private void setReviewPhoto(ReviewDto reviewDto, Review review) {
        if (review.getPatient().getPhoto() != null) {
            try {
                reviewDto.setPatientImage(photoService.getImageData(review.getPatient().getPhoto().getId()));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        } else {
            reviewDto.setPatientImage(null);
        }
    }

    private void setVeterinarianPhoto(ReviewDto reviewDto, Review review) {
        if (review.getVeterinarian().getPhoto() != null) {
            try {
                reviewDto.setVeterinarianImage(photoService.getImageData(review.getVeterinarian().getPhoto().getId()));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        } else {
            reviewDto.setVeterinarianImage(null);
        }
    }


    // count of veterinarians,patients

    @Override
    public long countVeterinarians() {
        return userRepository.countByUserType("VET");
    }

    @Override
    public long countPatients() {
        return userRepository.countByUserType("PATIENT");
    }

    @Override
    public long countAllUsers() {
        return userRepository.count();
    }

    // for mapping the users by month
    @Override
    public Map<String, Map<String, Long>> aggregateUsersByMonthAndType() {
        List<User> users = userRepository.findAll();
        return users.stream().collect(Collectors.groupingBy(user -> Month.of(user.getCreatedAt().getMonthValue())
                        .getDisplayName(TextStyle.FULL, Locale.ENGLISH),
                Collectors.groupingBy(User::getUserType, Collectors.counting())));
    }

    // for mapping user accounts chart to frontend
    @Override
    public Map<String, Map<String, Long>> aggregateUsersByEnableStatusAndType() {
        List<User> users = userRepository.findAll();
        return users
                .stream()
                .collect(Collectors.groupingBy(user -> user.isEnable() ? "Enabled" : "Non-Enabled",
                        Collectors.groupingBy(User::getUserType, Collectors.counting())));
    }


    // method for frontend side - "unlock vet"

    public void lockUserAccount(Long userId) {
        userRepository.updateUserEnableStatus(userId, false);
    }

    public void unlockUserAccount(Long userId) {
        userRepository.updateUserEnableStatus(userId, true);
    }
}
