package com.dailyalcorwork.universal_pet_care.service.review;

import com.dailyalcorwork.universal_pet_care.enums.AppointmentStatus;
import com.dailyalcorwork.universal_pet_care.exception.AlreadyExistsException;
import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.Review;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.repository.AppointmentRepository;
import com.dailyalcorwork.universal_pet_care.repository.ReviewRepository;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {
    private final ReviewRepository reviewRepository;
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;

    @Override
    public Review saveReview(Review review, Long reviewerId, Long veterinarianId) {
        // 1. Check if the reviewer is same as the doctor being reviewed
        // esitlik halinde veteriner kendini yorumlamis gibi olur.
        if (veterinarianId.equals(reviewerId)) {
            throw new IllegalArgumentException(FeedBackMessage.VET_CANNOT_REVIEW_THEMSELVES);
        }

        // 2. Check if the reviewer has previously submitted a review for this doctor.
        Optional<Review> existingReview = reviewRepository.findByVeterinarianIdAndPatientId(veterinarianId, reviewerId);
        if (existingReview.isPresent()) {
            throw new AlreadyExistsException(FeedBackMessage.ALREADY_REVIEWED);
        }

        // 3. Check if the reviewer has gotten a completed appointment with this doctor.
        boolean hadCompletedAppointments = appointmentRepository
                .existsByVeterinarianIdAndPatientIdAndStatus(veterinarianId, reviewerId, AppointmentStatus.COMPLETED);
        if (!hadCompletedAppointments) {
            throw new IllegalStateException(FeedBackMessage.NOT_ALLOWED);
        }

        // 4. Get the veterinarian from the database
        User vet = userRepository.findById(veterinarianId).orElseThrow(() -> new ResourceNotFoundException(FeedBackMessage.VET_OR_PATIENT_NOT_FOUND));

        // 5. Get the patient from the database
        User user = userRepository.findById(reviewerId).orElseThrow(() -> new ResourceNotFoundException(FeedBackMessage.RESOURCE_NOT_FOUND));

        // Set both to the review
        review.setVeterinarian(vet);
        review.setPatient(vet);
        // Save the review
        return reviewRepository.save(review);
    }

    @Transactional
    @Override
    public double getAverageRatingForVet(Long veterinarianId) {
        List<Review> reviews = reviewRepository.findByVeterinarianId(veterinarianId);
        return reviews.isEmpty() ? 0 : reviews
                .stream()
                .mapToInt(Review::getStars)
                .average()
                .orElse(0.0);
    }

    @Override
    public void updateReview(Long reviewerId, Review review) {
        reviewRepository.findById(reviewerId)
                .ifPresentOrElse(existingReview -> {
                    existingReview.setStars(review.getStars());
                    existingReview.setFeedback(review.getFeedback());
                    reviewRepository.save(existingReview);
                }, () -> {
                    throw new ResourceNotFoundException(FeedBackMessage.RESOURCE_NOT_FOUND);
                });
    }

    @Override
    public Page<Review> findAllReviewsByUserId(Long userId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return reviewRepository.findAllByUserId(userId, pageRequest);
    }
}
