import { api } from "../utils/api";

export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`/auth/verify-your-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
