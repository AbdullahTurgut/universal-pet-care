package com.dailyalcorwork.universal_pet_care.service.photo;

import com.dailyalcorwork.universal_pet_care.model.Photo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Optional;

public interface IPhotoService {

    Photo savePhoto(MultipartFile file, Long userId) throws IOException, SQLException;

    Optional<Photo> getPhotoById(Long id);

    void deletePhoto(Long id, Long userId);

    Photo updatePhoto(Long id, MultipartFile file) throws SQLException, IOException;

    byte[] getImageData(Long id) throws SQLException;
}
