import { api } from "../utils/api";

export async function registerUser(user) {
  try {
    const result = await api.post("/users/register", user);
    return result.data;
  } catch (error) {
    throw error;
  }
}
export async function getUserById(userId) {
  try {
    if (!userId) {
      //console.warn("userId daha gelmedi");
      return;
    }
    const response = await api.get(`/users/user/${userId}`);
    return response.data;
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

// count vets-patients-users
export async function countVeterinarians() {
  try {
    const response = await api.get("/users/count/veterinarians");
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function countPatients() {
  try {
    const response = await api.get("/users/count/patients");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function countAllUsers() {
  try {
    const response = await api.get("/users/count/users");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAggregatedUsers() {
  try {
    const response = await api.get("/users/aggregated-users");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getAggregatedUsersAccountByActiveStatus = async () => {
  try {
    const response = await api.get("/users/account/aggregated-by-status");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const aggregateVetBySpecialization = async () => {
  try {
    const response = await api.get("/veterinarians/get-by-specialization");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function lockUserAccount(userId) {
  try {
    const response = await api.put(
      `/users/account/${userId}/lock-user-account`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function unlockUserAccount(userId) {
  try {
    const response = await api.put(
      `/users/account/${userId}/unlock-user-account`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
