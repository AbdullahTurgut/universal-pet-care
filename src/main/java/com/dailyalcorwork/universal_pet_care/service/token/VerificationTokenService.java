package com.dailyalcorwork.universal_pet_care.service.token;

import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.model.VerificationToken;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.repository.VerificationTokenRepository;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import com.dailyalcorwork.universal_pet_care.utils.SystemUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VerificationTokenService implements IVerificationTokenService {

    private final UserRepository userRepository;

    private final VerificationTokenRepository tokenRepository;

    @Override
    public String validateToken(String token) {
        Optional<VerificationToken> theToken = findByToken(token);
        if (theToken.isEmpty()) {
            return FeedBackMessage.INVALID_TOKEN;
        }
        User user = theToken.get().getUser();
        if (user.isEnable()) {
            return FeedBackMessage.VERIFIED_TOKEN;
        }
        if (isTokenExpired(token)) {
            return FeedBackMessage.EXPIRED_TOKEN;
        }
        user.setEnable(true);
        userRepository.save(user);
        return FeedBackMessage.VALID_TOKEN;
    }

    @Override
    public void saveVerificationTokenForUser(String token, User user) {
        var verificationToken = new VerificationToken(token, user);
        tokenRepository.save(verificationToken);
    }

    @Override
    public VerificationToken generateNewVerificationToken(String oldToken) {
        Optional<VerificationToken> theToken = findByToken(oldToken);
        if (theToken.isPresent()) {
            var verificationToken = theToken.get();
            verificationToken.setToken(UUID.randomUUID().toString());
            verificationToken.setExpirationDate(SystemUtils.getExpirationTime());
            return tokenRepository.save(verificationToken);
        } else
            throw new IllegalArgumentException("Invalid verification token");
    }

    @Override
    public Optional<VerificationToken> findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    @Override
    public void deleteVerificationToken(Long tokenId) {
        tokenRepository.deleteById(tokenId);
    }

    @Override
    public boolean isTokenExpired(String token) {
        Optional<VerificationToken> theToken = findByToken(token);
        if (theToken.isEmpty()) {
            return true;
        }
        VerificationToken verificationToken = theToken.get();
        return verificationToken.getExpirationDate().getTime() <= Calendar.getInstance().getTime().getTime();
    }
}
