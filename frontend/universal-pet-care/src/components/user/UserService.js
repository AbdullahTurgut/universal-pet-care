import { api } from "../utils/api";

export async function getUserById(userId) {
  try {
    // backend API call to fetch user data by ID
    const result = await api.get(`/users/user/${userId}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(user) {
  try {
    const result = await api.post("/users/register", user);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function changeUserPassword(
  userId,
  currentPassword,
  newPassword,
  confirmNewPassword
) {
  try {
    const requestData = {
      currentPassword,
      newPassword,
      confirmNewPassword,
    };
    const result = await api.put(
      `/users/user/${userId}/change-password`,
      requestData
    );
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(userId, updatedUserData) {
  try {
    const response = await api.put(
      `/users/update-user/${userId}`,
      updatedUserData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
