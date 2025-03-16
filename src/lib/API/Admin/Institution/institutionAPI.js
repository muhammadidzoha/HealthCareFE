import api from "../../api";

export const getAllInstitution = async (accessToken) => {
  try {
    const response = await api.get(import.meta.env.VITE_API_INSTITUTIONS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const createInstitution = async (accessToken, data) => {
  try {
    const response = await api.post(
      import.meta.env.VITE_API_INSTITUTIONS,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const editInstitution = async (accessToken, data, id) => {
  try {
    const response = await api.put(
      import.meta.env.VITE_API_INSTITUTIONS + "/" + id,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const deleteInstitution = async (accessToken, id) => {
  try {
    const response = await api.delete(
      import.meta.env.VITE_API_INSTITUTIONS + "/" + id,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const getAllLocation = async () => {
  try {
    const response = await api.get(import.meta.env.VITE_API_GET_PROVINCES, {});
    return response.data;
  } catch (error) {
    throw error.response?.data;
  }
};
