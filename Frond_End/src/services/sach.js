import axios from "axios";

export const getAllSach = async ({
  search = "",
  country = "",
  category = "",
  sort = "",
}) => {
  try {
    const { data } = await axios.get(
      `/api/sach/?search=${search}&country=${country}&category=${category}&sort=${sort}`
    );
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getDetailSach = async (maSach) => {
  try {
    const { data } = await axios.get(`/api/sach/${maSach}`);

    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createSach = async () => {
  try {
    const { data } = await axios.post(`/api/sach/`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateSach = async ({ maSach, formData }) => {
  try {
    const { data } = await axios.put(`/api/sach/${maSach}`, formData);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteSach = async ({ maSach }) => {
  try {
    const { data } = await axios.delete(`/api/sach/${maSach}`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
