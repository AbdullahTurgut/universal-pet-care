package com.dailyalcorwork.universal_pet_care.controller;

import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.Photo;
import com.dailyalcorwork.universal_pet_care.response.ApiResponse;
import com.dailyalcorwork.universal_pet_care.service.photo.IPhotoService;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
import com.dailyalcorwork.universal_pet_care.utils.UrlMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Optional;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping(UrlMapping.PHOTOS)
@RequiredArgsConstructor
public class PhotoController {
    private final IPhotoService photoService;

    @PostMapping(UrlMapping.UPLOAD_PHOTO)
    public ResponseEntity<ApiResponse> uploadPhoto(@RequestParam("file") MultipartFile file,
                                                   @RequestParam("userId") Long userId) throws SQLException, IOException {
        try {
            Photo photo = photoService.savePhoto(file, userId);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.CREATE_SUCCESS, null));
        } catch (IOException | SQLException e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(FeedBackMessage.SERVER_ERROR, null));
        }
    }

    @PutMapping(UrlMapping.UPDATE_PHOTO)
    public ResponseEntity<ApiResponse> updatePhoto(@PathVariable Long photoId, byte[] photoBytes) {
        try {
            Photo photo = photoService.updatePhoto(photoId, photoBytes);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.UPDATE_SUCCESS, photo));
        } catch (ResourceNotFoundException | SQLException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(FeedBackMessage.RESOURCE_NOT_FOUND, null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(FeedBackMessage.SERVER_ERROR, null));
        }
    }

    @DeleteMapping(UrlMapping.DELETE_PHOTO)
    public ResponseEntity<ApiResponse> deletePhoto(@PathVariable Long photoId) {
        try {
            photoService.deletePhoto(photoId);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.DELETE_SUCCESS, null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(FeedBackMessage.RESOURCE_NOT_FOUND, null));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR).body(new ApiResponse(FeedBackMessage.SERVER_ERROR, null));
        }
    }


    @GetMapping(UrlMapping.GET_PHOTO_BY_ID)
    public ResponseEntity<ApiResponse> getPhotoById(@PathVariable Long photoId) {
        try {
            Optional<Photo> photo = photoService.getPhotoById(photoId);
            return ResponseEntity.ok(new ApiResponse(FeedBackMessage.RESOURCE_FOUND, photo));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(FeedBackMessage.RESOURCE_NOT_FOUND, null));
        }
    }
}
