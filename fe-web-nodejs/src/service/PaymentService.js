import axios from "./axiosConfig";
export const create_payment = async (amount,bankCode)=>{
    try {
        const response = await axios.post("/order/create_payment_url", { amount, bankCode })
        return response;
      } catch (error) {
        throw error;
      }
} 