package com.dailyalcorwork.universal_pet_care.service.photo;

import com.dailyalcorwork.universal_pet_care.model.Photo;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.repository.PhotoRepository;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhotoService implements IPhotoService {

    private final PhotoRepository photoRepository;

    private final UserRepository userRepository;


    @Override
    public Photo savePhoto(MultipartFile file, Long userId) throws IOException, SQLException {
        Optional<User> theUser = userRepository.findById(userId);
        Photo photo = new Photo();
        if (file != null && !file.isEmpty()) {
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            photo.setImage(photoBlob);
            photo.setFileType(file.getContentType());
        }
        Photo savedPhoto = photoRepository.save(photo);
        // user optional olduğu için bir if
        theUser.ifPresent(user -> {
            user.setPhoto(savedPhoto);
        });

        return savedPhoto;
    }

    @Override
    public Optional<Photo> getPhotoById(Long photoId) {
        return Optional.empty();
    }

    @Override
    public void deletePhoto(Long photoId) {

    }

    @Override
    public Photo updatePhoto(Long photoId, byte[] imageData) {
        return null;
    }

    @Override
    public byte[] getImageData(Long photoId) {
        return new byte[0];
    }
}
