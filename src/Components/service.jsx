import axios from "axios";

const API_URL = "http://localhost:5000/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log(`Product delete : ${id}`);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

export const updateProduct = async (id, data) => {
  try {
    await axios.put(`${API_URL}/${id}`, data);
    console.log(`Product update : ${id}`);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

export const addProduct = async (id, data) => {
  try {
    await axios.post(`${API_URL}`, { id, ...data });
    console.log("Successfully added");
  } catch (error) {
    console.error(error);
  }
};
