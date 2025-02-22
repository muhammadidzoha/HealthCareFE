import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

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
