package com.dailyalcorwork.universal_pet_care.service.token;

import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.model.VerificationToken;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.repository.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VerificationTokenService implements IVerificationTokenService {

    private final UserRepository userRepository;

    private final VerificationTokenRepository tokenRepository;

    @Override
    public String validateToken(String token) {
        return "";
    }

    @Override
    public void saveVerificationTokenForUser(String token, User user) {

    }

    @Override
    public VerificationToken generateNewVerificationToken(String oldToken) {
        return null;
    }

    @Override
    public Optional<VerificationToken> findByToken(String token) {
        return Optional.empty();
    }

    @Override
    public void deleteVerificationToken(Long tokenId) {

    }

    @Override
    public boolean isTokenExpired(String token) {
        return false;
    }
}
