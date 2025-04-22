package com.dailyalcorwork.universal_pet_care.repository;

import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.model.Veterinarian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    List<Veterinarian> findAllByUserType(String vet);

    long countByUserType(String type);

    @Modifying
    @Query("UPDATE User u SET u.isEnabled = :enabled WHERE u.id = :userId")
    void updateUserEnabledStatus(@Param("userId") Long userId, @Param("enabled") boolean enabled);
}
