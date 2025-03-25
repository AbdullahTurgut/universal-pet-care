package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.dto.EntityConverter;
import com.dailyalcorwork.universal_pet_care.dto.UserDto;
import com.dailyalcorwork.universal_pet_care.exception.UserAlreadyExistsException;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.request.RegistrationRequest;
import com.dailyalcorwork.universal_pet_care.response.ApiResponse;
import com.dailyalcorwork.universal_pet_care.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final EntityConverter<User, UserDto> entityConverter;

    // Dto ile beraber User geri döndürmek yerine ApiResponse döndürecegiz
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addUser(@RequestBody RegistrationRequest request) {
        try {
            User theUser = userService.add(request);
            UserDto registeredUser = entityConverter.mapEntityToDto(theUser, UserDto.class);
            return ResponseEntity.ok(new ApiResponse("User registered successfully", registeredUser));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.ok(new ApiResponse(e.getMessage(), null));
        }
    }
   /* @PostMapping("/add")
    public User addUser(@RequestBody RegistrationRequest request) {
        return userService.add(request);
    }*/
}
