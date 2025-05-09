import { api } from "../utils/api";

export async function bookAppointment(
  senderId,
  recipientId,
  appointmentRequest
) {
  try {
    const token = localStorage.getItem("authToken");
    const result = await api.post(
      `/appointments/book-appointment?senderId=${senderId}&recipientId=${recipientId}`,
      appointmentRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("The result from here :", result);
    return result.data;
  } catch (error) {
    throw error;
  }
}
/*   `/appointments/book-appointment/${senderId}/${recipientId}` */

export const updateAppointment = async (appointmentId, appointmentData) => {
  try {
    const response = await api.put(
      `/appointments/${appointmentId}/update`,
      appointmentData
    );
    console.log("Two : ", response.data.message);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await api.put(`/appointments/${appointmentId}/cancel`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveAppointment = async (appointmentId) => {
  try {
    const response = await api.put(`/appointments/${appointmentId}/approve`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const declineAppointment = async (appointmentId) => {
  try {
    const response = await api.put(`/appointments/${appointmentId}/decline`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAppointmentById = async (appointmentId) => {
  try {
    const result = await api.get(`/appointments/${appointmentId}/appointment`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export async function countAppointments() {
  try {
    const result = await api.get("/appointments/count/appointment");
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function getAppointmentsSummary() {
  try {
    const response = await api.get(
      "/appointments/summary/appointments-summary"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
