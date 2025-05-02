import { api } from "../utils/api";

export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`/auth/verify-your-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function resendVerificationToken(oldToken) {
  try {
    const response = await api.put(
      `/auth/resend-verification-token?token=${oldToken}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userRoles");
  window.location.href = "/";
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post("/auth/request-password-reset", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateToken = async (token) => {
  try {
    const result = await api.get(
      `/verification/check-expiration?token=${token}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
