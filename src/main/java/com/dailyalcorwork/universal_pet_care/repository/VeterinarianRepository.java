package com.dailyalcorwork.universal_pet_care.repository;

import com.dailyalcorwork.universal_pet_care.model.Veterinarian;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VeterinarianRepository extends JpaRepository<Veterinarian, Long> {
    List<Veterinarian> findBySpecialization(String specialization);

    boolean existsBySpecialization(String specialization);
}
