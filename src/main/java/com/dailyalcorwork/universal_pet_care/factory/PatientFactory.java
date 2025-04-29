package com.dailyalcorwork.universal_pet_care.factory;

import com.dailyalcorwork.universal_pet_care.model.Patient;
import com.dailyalcorwork.universal_pet_care.repository.PatientRepository;
import com.dailyalcorwork.universal_pet_care.request.RegistrationRequest;
import com.dailyalcorwork.universal_pet_care.service.role.IRoleService;
import com.dailyalcorwork.universal_pet_care.service.user.UserAttributesMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class PatientFactory {
    private final PatientRepository patientRepository;
    private final UserAttributesMapper userAttributesMapper;

    private final IRoleService roleService;

    public Patient createPatient(RegistrationRequest request) {
        Patient patient = new Patient();
        patient.setRoles(roleService.setUserRoles(Collections.singletonList("PATIENT")));
        userAttributesMapper.setCommonAttributes(request, patient);
        return patientRepository.save(patient);
    }
}
