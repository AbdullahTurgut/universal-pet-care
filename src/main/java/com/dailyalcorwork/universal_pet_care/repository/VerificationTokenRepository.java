package com.dailyalcorwork.universal_pet_care.repository;

import com.dailyalcorwork.universal_pet_care.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
}
