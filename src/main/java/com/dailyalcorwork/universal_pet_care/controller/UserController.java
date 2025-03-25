package com.dailyalcorwork.universal_pet_care.controller;

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

    // Dto ile beraber User geri döndürmek yerine ApiResponse döndürecegiz
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addUser(@RequestBody RegistrationRequest request){
        try{
            User theUser = userService.add(request);

        }
    }
   /* @PostMapping("/add")
    public User addUser(@RequestBody RegistrationRequest request) {
        return userService.add(request);
    }*/
}
