package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.dto.EntityConverter;
import com.dailyalcorwork.universal_pet_care.dto.UserDto;
import com.dailyalcorwork.universal_pet_care.event.RegistrationCompleteEvent;
import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.exception.UserAlreadyExistsException;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.request.ChangePasswordRequest;
import com.dailyalcorwork.universal_pet_care.request.RegistrationRequest;
import com.dailyalcorwork.universal_pet_care.request.UserUpdateRequest;
import com.dailyalcorwork.universal_pet_care.response.ApiResponse;
import com.dailyalcorwork.universal_pet_care.service.password.IChangePasswordService;
import com.dailyalcorwork.universal_pet_care.service.user.UserService;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import com.dailyalcorwork.universal_pet_care.utils.UrlMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(UrlMapping.USERS)
public class UserController {

    private final UserService userService;
    private final EntityConverter<User, UserDto> entityConverter;
    private final IChangePasswordService changePasswordService;

    private final ApplicationEventPublisher publisher;

    //---------------- REGISTER ----------------
    // Dto ile beraber User geri döndürmek yerine ApiResponse döndürecegiz
    @PostMapping(UrlMapping.REGISTER_USER)
    public ResponseEntity<ApiResponse> register(@RequestBody RegistrationRequest request) {
        try {
            User theUser = userService.register(request);
            publisher.publishEvent(new RegistrationCompleteEvent(theUser));
            UserDto registeredUser = entityConverter.mapEntityToDto(theUser, UserDto.class);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.CREATE_USER_SUCCESS, registeredUser));
        } catch (UserAlreadyExistsException e) {
            // burda db de email olsa bile htpp status 200 olarak ok geri döndürüyor
            // onu düzeltmek için
            //return ResponseEntity.ok(new ApiResponse(e.getMessage(), null)); yerine
            return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    //---------------- UPDATE USER ------------------------

    @PutMapping(UrlMapping.UPDATE_USER)
    public ResponseEntity<ApiResponse> update(@PathVariable Long userId,
                                              @RequestBody UserUpdateRequest request) {
        try {
            User theUser = userService.update(userId, request);
            UserDto updatedUser = entityConverter.mapEntityToDto(theUser, UserDto.class);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.UPDATE_USER_SUCCESS, updatedUser));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }

    }

    //----------------GET ONE USER ------------------------

    @GetMapping(UrlMapping.GET_USER_BY_ID)
    public ResponseEntity<ApiResponse> findById(@PathVariable Long userId) {
        try {
            UserDto userDto = userService.getUserWithDetails(userId);
            // status yerine .ok() kullanmalıyız
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.USER_FOUND, userDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // -----------------DELETE ----------------
    @DeleteMapping(UrlMapping.DELETE_USER_BY_ID)
    public ResponseEntity<ApiResponse> deleteById(@PathVariable Long userId) {
        try {
            userService.delete(userId);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.DELETE_USER_SUCCESS, null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // ----------------- GET ALL ----------------

    @GetMapping(UrlMapping.GET_ALL_USERS)
    public ResponseEntity<ApiResponse> getAllUsers() {
        List<UserDto> theUsers = userService.getAllUsers();
        return ResponseEntity.ok(new ApiResponse(FeedBackMessage.USERS_FOUND, theUsers));
    }

    // changing user password above there
    @PutMapping(UrlMapping.CHANGE_PASSWORD)
    public ResponseEntity<ApiResponse> changeUserPassword(@PathVariable Long userId,
                                                          @RequestBody ChangePasswordRequest request) {
        try {
            changePasswordService.changePassword(userId, request);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.PASSWORD_UPDATE_SUCCESS, null));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }


    // count of users and vets and patients
    @GetMapping(UrlMapping.COUNT_ALL_VETS)
    public long countVeterinarians() {
        return userService.countVeterinarians();
    }

    @GetMapping(UrlMapping.COUNT_ALL_PATIENTS)
    public long countPatients() {
        return userService.countPatients();
    }

    @GetMapping(UrlMapping.COUNT_ALL_USERS)
    public long countUsers() {
        return userService.countAllUsers();
    }

    // Aggregate User by month
    @GetMapping(UrlMapping.AGGREGATE_USERS)
    public ResponseEntity<ApiResponse> aggregateUsersByMonthAndType() {
        try {
            Map<String, Map<String, Long>> aggregateUsers = userService.aggregateUsersByMonthAndType();
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.USER_FOUND, aggregateUsers));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    // Aggregate users account chart to frontend
    @GetMapping("/account/aggregated-by-status")
    public ResponseEntity<ApiResponse> aggregateUsersByEnableStatusAndType() {
        try {
            Map<String, Map<String, Long>> aggregatedUsers = userService.aggregateUsersByEnableStatusAndType();
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.USER_FOUND, aggregatedUsers));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }


    // end point for "lock and unlock Vet"
    @PutMapping("/account/{userId}/lock-user-account")
    public ResponseEntity<ApiResponse> lockUserAccount(@PathVariable("userId") Long userId) {
        try {
            userService.lockUserAccount(userId);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.LOCKED_USER_ACCOUNT, null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PutMapping("/account/{userId}/unlock-user-account")
    public ResponseEntity<ApiResponse> unlockUserAccount(@PathVariable("userId") Long userId) {
        try {
            userService.unlockUserAccount(userId);
            return ResponseEntity.ok(new ApiResponse("User account unlocked successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), null));
        }
    }

   /* @PostMapping("/add")
    public User addUser(@RequestBody RegistrationRequest request) {
        return userService.add(request);
    }*/


}
