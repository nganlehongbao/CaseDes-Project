import axios from "./axiosConfig";
export const getProductById = async (id) => {
  try {
    const response = await axios.get("/products/" + id);
    const productInfo = response.data;
    console.log(productInfo);
    return productInfo;
  } catch (error) {
    throw error;
  }
};

export const getProductList = async () => {
    try {
      const response = await axios.get("/products");
      const products = response.data;
      console.log(products);
      return products;
    } catch (error) {
      throw error;
    }
  };
