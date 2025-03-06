import api from "../api";

export const login = async (credentials) => {
  try {
    const response = await api.post(
      import.meta.env.VITE_API_LOGIN,
      credentials
    );
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const registerParent = async (userData) => {
  try {
    const response = await api.post(
      import.meta.env.VITE_API_REGISTER_PARENT,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const registerInstitution = async (userData) => {
  try {
    const response = await api.post(
      import.meta.env.VITE_API_REGISTER_INSTITUTION,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const decodeJwt = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await api.post(
    import.meta.env.VITE_API_DECODE_TOKEN,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.data;
};
