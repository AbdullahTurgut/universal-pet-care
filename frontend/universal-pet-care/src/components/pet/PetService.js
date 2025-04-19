import { api } from "../utils/api";

export async function getPetTypes() {
  try {
    const result = await api.get("/pets/get-types");
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function getPetColors() {
  try {
    const result = await api.get("/pets/get-pet-colors");
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function getPetBreeds(petType) {
  try {
    const result = await api.get(`/pets/get-pet-breeds?petType=${petType}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export const updatePet = async (petId, updatedPet) => {
  try {
    const response = await api.put(`/pets/${petId}/update`, updatedPet);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePet = async (petId) => {
  try {
    const response = await api.delete(`/pets/${petId}/delete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
