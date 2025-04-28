package com.dailyalcorwork.universal_pet_care.repository;

import com.dailyalcorwork.universal_pet_care.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String roleName);
}
