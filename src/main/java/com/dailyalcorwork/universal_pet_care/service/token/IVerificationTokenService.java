package com.dailyalcorwork.universal_pet_care.service.token;

import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.model.VerificationToken;

import java.util.Optional;

public interface IVerificationTokenService {

    String validateToken(String token);

    void saveVerificationTokenForUser(String token, User user);

    VerificationToken generateNewVerificationToken(String oldToken);

    Optional<VerificationToken> findByToken(String token);

    void deleteVerificationToken(Long tokenId);

    boolean isTokenExpired(String token);
}
