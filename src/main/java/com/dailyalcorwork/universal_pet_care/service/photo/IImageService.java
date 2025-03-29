package com.dailyalcorwork.universal_pet_care.service.photo;

import com.dailyalcorwork.universal_pet_care.model.Photo;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface IImageService {

    Photo savePhoto(MultipartFile file, Long userId);

    Optional<Photo> getPhotoById(Long photoId);

    void deletePhoto(Long photoId);

    Photo updatePhoto(Long photoId, byte[] imageData);

    byte[] getImageData(Long photoId);
}
