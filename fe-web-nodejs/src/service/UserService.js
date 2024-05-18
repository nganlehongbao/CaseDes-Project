import axios from "./axiosConfig";
export const getUserById = async (userId)=>{
    try {
        const response = await axios.get("/user-detail/"+userId)
        const userIfor = response.data.user;
        return userIfor;
      } catch (error) {
        throw error;
      }
} 
export const updateUserById = async (userId,userUpdate)=>{
  try {
      const response = await axios.put("/user-detail/"+userId,userUpdate)
      const userIfor = response.data;
      return userIfor;
    } catch (error) {
      throw error;
    }
} 
export const updateUserPasswordById = async (userId,userUpdate)=>{
  try {
      const response = await axios.put("/user-detail/change-password/"+userId,userUpdate)
      const userIfor = response.data;
      return userIfor;
    } catch (error) {
      throw error;
    }
} 
