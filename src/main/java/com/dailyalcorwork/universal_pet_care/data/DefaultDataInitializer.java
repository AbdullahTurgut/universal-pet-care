package com.dailyalcorwork.universal_pet_care.data;

import com.dailyalcorwork.universal_pet_care.model.Admin;
import com.dailyalcorwork.universal_pet_care.model.Patient;
import com.dailyalcorwork.universal_pet_care.model.Role;
import com.dailyalcorwork.universal_pet_care.model.Veterinarian;
import com.dailyalcorwork.universal_pet_care.repository.*;
import com.dailyalcorwork.universal_pet_care.service.role.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DefaultDataInitializer implements ApplicationListener<ApplicationReadyEvent> {
    private final UserRepository userRepository;
    private final VeterinarianRepository veterinarianRepository;
    private final PatientRepository patientRepository;
    private final RoleRepository roleRepository;
    private final IRoleService roleService;

    private final PasswordEncoder passwordEncoder;
    private final AdminRepository adminRepository;

    public void onApplicationEvent(ApplicationReadyEvent event) {
        Set<String> defaultRoles = Set.of("ROLE_ADMIN", "ROLE_PATIENT", "ROLE_VET");
        //createDefaultRoleIfNotExists(defaultRoles);

//        createDefaultAdminIfNotExists();
//        createDefaultVetIfNotExists();
//        createDefaultPatientIfNotExists();
    }

    private void createDefaultVetIfNotExists() {
        Role vetRole = roleService.getRoleByName("ROLE_VET");
        for (int i = 1; i <= 10; i++) {
            String defaultEmail = "vet" + i + "@gmail.com";
            if (userRepository.existsByEmail(defaultEmail)) {
                continue;
            }

            Veterinarian vet = new Veterinarian();
            vet.setFirstName("Vet");
            vet.setLastName("Number" + i);
            vet.setGender("Not Specified");
            vet.setPhoneNumber("1234567890");
            vet.setEmail(defaultEmail);
            vet.setPassword(passwordEncoder.encode("password" + i));
            vet.setUserType("VET");
            vet.setSpecialization("Dermatologist");
            vet.setRoles(new HashSet<>(Collections.singleton(vetRole)));
            vet.setEnable(true);
            veterinarianRepository.save(vet);
            //theVet.setEnable(true);
            System.out.println("Default vet user" + i + "created successfully");
        }
    }

    private void createDefaultPatientIfNotExists() {
        Role patientRole = roleService.getRoleByName("ROLE_PATIENT");
        for (int i = 1; i <= 10; i++) {
            String defaultEmail = "pat" + i + "@gmail.com";
            if (userRepository.existsByEmail(defaultEmail)) {
                continue;
            }
            Patient patient = new Patient();
            patient.setFirstName("PAt");
            patient.setLastName("Number" + i);
            patient.setGender("Not Specified");
            patient.setPhoneNumber("1234567890");
            patient.setEmail(defaultEmail);
            patient.setPassword(passwordEncoder.encode("password" + i));
            patient.setUserType("PATIENT");
            patient.setRoles(new HashSet<>(Collections.singleton(patientRole)));
            patient.setEnable(true);
            patientRepository.save(patient);
            //thePatient.setEnable(true);
            System.out.println("Default patient user" + i + "created successfully");
        }
    }

    private void createDefaultAdminIfNotExists() {
        Role adminRole = roleService.getRoleByName("ROLE_ADMIN");
        final String defaultAdminEmail = "admin@gmail.com";
        if (userRepository.findByEmail(defaultAdminEmail).isPresent()) {
            return;
        }
        Admin admin = new Admin();
        admin.setFirstName("AUPC");
        admin.setLastName("Admin");
        admin.setGender("Male");
        admin.setPhoneNumber("3333333");
        admin.setEmail(defaultAdminEmail);
        admin.setPassword(passwordEncoder.encode("00220044"));
        admin.setUserType("ADMIN");
        admin.setRoles(new HashSet<>(Collections.singleton(adminRole)));
        admin.setEnable(true);
        adminRepository.save(admin);
        //theAdmin.setEnable(true);
        System.out.println("Default admin user created successfully");
    }

    private void createDefaultRoleIfNotExists(Set<String> roles) {
        roles.stream()
                .filter(role -> roleRepository.findByName(role) == null)
                .map(Role::new).forEach(roleRepository::save);

    }
}
