import axios from "axios";

const API_URL = "http://localhost:5000/products";

//fetch all product
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//fetch product using current id
export const fetchProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// delete product
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log(`Product delete : ${id}`);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

// update product
export const updateProduct = async (id, data) => {
  try {
    await axios.put(`${API_URL}/${id}`, data);
    console.log(`Product update : ${id}`);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

// add product
export const addProduct = async (id, data) => {
  try {
    await axios.post(`${API_URL}`, { id, ...data });
    console.log("Successfully added");
  } catch (error) {
    console.error(error);
  }
};
