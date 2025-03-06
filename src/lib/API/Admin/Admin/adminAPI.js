import api from "../../api";

export const getAllUsers = async (accessToken) => {
  try {
    const response = await api.get(import.meta.env.VITE_API_GET_USERS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
