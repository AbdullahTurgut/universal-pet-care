package com.dailyalcorwork.universal_pet_care.service.photo;

import com.dailyalcorwork.universal_pet_care.exception.ResourceNotFoundException;
import com.dailyalcorwork.universal_pet_care.model.Photo;
import com.dailyalcorwork.universal_pet_care.model.User;
import com.dailyalcorwork.universal_pet_care.repository.PhotoRepository;
import com.dailyalcorwork.universal_pet_care.repository.UserRepository;
import com.dailyalcorwork.universal_pet_care.utils.FeedBackMessage;
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
        return photoRepository.findById(photoId);
    }

    @Override
    public void deletePhoto(Long photoId) {
        photoRepository.findById(photoId)
                .ifPresentOrElse(photoRepository::delete, () -> {
                    throw new ResourceNotFoundException(FeedBackMessage.RESOURCE_NOT_FOUND);
                });
    }

    @Override
    public Photo updatePhoto(Long photoId, byte[] imageData) throws SQLException {
        Optional<Photo> thePhoto = getPhotoById(photoId);
        if (thePhoto.isPresent()) {
            Photo photo = thePhoto.get();
            photo.setImage(new SerialBlob(imageData));
            return photoRepository.save(photo);
        }
        throw new ResourceNotFoundException(FeedBackMessage.RESOURCE_NOT_FOUND);
    }

    @Override
    public byte[] getImageData(Long photoId) throws SQLException {
        Optional<Photo> thePhoto = getPhotoById(photoId);
        if (thePhoto.isPresent()) {
            Blob photoBlob = thePhoto.get().getImage();
            int bloblength = (int) photoBlob.length();
            return new byte[bloblength];
        }
        return null;
    }
}
