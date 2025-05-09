package com.dailyalcorwork.universal_pet_care.repository;

import com.dailyalcorwork.universal_pet_care.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);

    List<User> findAllByUserType(String vet);

    long countByUserType(String type);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.isEnable =:enabled WHERE u.id =:userId")
    void updateUserEnableStatus(@Param("userId") Long userId, @Param("enabled") boolean enabled);

    Optional<User> findByEmail(String email);
}
