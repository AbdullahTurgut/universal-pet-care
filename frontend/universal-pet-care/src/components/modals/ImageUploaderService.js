import { api } from "../utils/api";

export async function updateUserPhoto(photoId, photoData) {
  try {
    const response = await api.put(`/photos/${photoId}/update`, photoData, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function uploadUserPhoto(userId, photoData) {
  try {
    const formData = new FormData();
    formData.append("file", photoData);
    formData.append("userId", userId);
    const response = await api.post("/photos/upload", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserPhoto(photoId, userId) {
  try {
    const response = await api.delete(
      `/photos/${photoId}/user/${userId}/delete`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// delete user photo(remove)
export async function deleteUserPhotoById(photoId, userId) {
  try {
    // backend API call to fetch user data by ID
    const result = await api.delete(`/photos/${photoId}/user/${userId}/delete`);
    return result.data;
  } catch (error) {
    throw error;
  }
}
