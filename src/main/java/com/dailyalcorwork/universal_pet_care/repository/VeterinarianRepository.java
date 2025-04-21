package com.dailyalcorwork.universal_pet_care.repository;

import com.dailyalcorwork.universal_pet_care.model.Veterinarian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VeterinarianRepository extends JpaRepository<Veterinarian, Long> {
    List<Veterinarian> findBySpecialization(String specialization);

    boolean existsBySpecialization(String specialization);

    @Query("SELECT DISTINCT v.specialization FROM Veterinarian v")
    List<String> getDistinctSpecialization();

    @Query("SELECT v.specialization as specialization, COUNT(v) as count FROM Veterinarian v GROUP BY v.specialization")
    List<Object[]> countVetsBySpecialization();
}
