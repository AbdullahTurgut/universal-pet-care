import { api } from "../utils/api";

export async function addReview(veterinarianId, reviewerId, reviewData) {
  try {
    const response = await api.post(
      `/reviews/submit-review?reviewerId=${reviewerId}&veterinarianId=${veterinarianId}`,
      reviewData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
