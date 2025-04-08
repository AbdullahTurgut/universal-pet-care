import { api } from "../utils/api";

export async function getVeterinarians() {
  try {
    const result = await api.get("/veterinarians/get-all-veterinarians");
    return result.data;
  } catch (error) {
    throw error;
  }
}
