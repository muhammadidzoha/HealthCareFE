import api from "../../api";

export const getAllCategory = async (accessToken) => {
  try {
    const response = await api.get(import.meta.env.VITE_API_GET_CATEGORY, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
