package com.dailyalcorwork.universal_pet_care.data;

import com.dailyalcorwork.universal_pet_care.model.Patient;
import com.dailyalcorwork.universal_pet_care.model.Veterinarian;
import com.dailyalcorwork.universal_pet_care.repository.PatientRepository;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.repository.VeterinarianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DefaultDataInitializer implements ApplicationListener<ApplicationReadyEvent> {
    private final UserRepository userRepository;
    private final VeterinarianRepository veterinarianRepository;
    private final PatientRepository patientRepository;

    public void onApplicationEvent(ApplicationReadyEvent event) {
        createDefaultVetIfNotExists();
        createDefaultPatientIfNotExists();
    }

    private void createDefaultVetIfNotExists() {
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
            vet.setPassword("password" + i);
            vet.setUserType("VET");
            vet.setSpecialization("Dermatologist");
            Veterinarian theVet = veterinarianRepository.save(vet);
            theVet.setEnable(true);
            System.out.println("Default vet user" + i + "created successfully");
        }
    }

    private void createDefaultPatientIfNotExists() {
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
            patient.setPassword("password" + i);
            patient.setUserType("PATIENT");
            Patient thePatient = patientRepository.save(patient);
            thePatient.setEnable(true);
            System.out.println("Default patient user" + i + "created successfully");
        }
    }
}
