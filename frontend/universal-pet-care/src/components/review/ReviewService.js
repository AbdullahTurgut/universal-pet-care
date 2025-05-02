import { api } from "../utils/api";

export async function addReview(veterinarianId, reviewerId, reviewData) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await api.post(
      `/reviews/submit-review?reviewerId=${reviewerId}&veterinarianId=${veterinarianId}`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
