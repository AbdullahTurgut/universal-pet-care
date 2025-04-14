import { api } from "../utils/api";

export async function getVeterinarians() {
  try {
    const result = await api.get("/veterinarians/get-all-veterinarians");
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function findAvailableVeterinarians(searchParams) {
  try {
    const queryParams = new URLSearchParams(searchParams);

    const result = await api.get(
      `/veterinarians/search-veterinarian?${queryParams}`
    );
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function getSpecializations() {
  try {
    const result = await api.get("/veterinarians/get-specializations");
    return result.data;
  } catch (error) {
    throw error;
  }
}
