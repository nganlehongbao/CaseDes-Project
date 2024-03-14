import axios from "./axiosConfig";
import Cookies from "js-cookie";
export const setAuthToken = ({ token,info, userId }) => {
  Cookies.set("token", token)
  Cookies.set("userId", JSON.stringify(userId))
  Cookies.set("info", JSON.stringify(info))
};
export const logout = async () => {
  axios.get("/users/logout");
  Cookies.remove("token")
  Cookies.remove("userId")
  Cookies.remove("info")
  delete axios.defaults.headers.common["Authorization"];
  window.location.href = `/`;
};

export const postLogin = async (LoginDTO) => {
  try {
    console.log(LoginDTO);
    const response = await axios.post("/users/login", LoginDTO);

    const { token,info ,userId } = response.data;
    setAuthToken({ token,info, userId });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return userId;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
};

export const postRegist = async (RegistDTO) => {
  try {
    const response = await axios.post("/users/register", RegistDTO);
    console.log("Response:", response.data);

    const { token,info ,userId } = response.data;
    setAuthToken({ token,info, userId });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  } catch (error) {
    console.error("Axios Error:", error);
    console.log("Error Response:", error.response?.data);
    throw error;
  }
};
export const initiateGoogleLogin = () => {
  window.location.href = "http://localhost:5000/auth/google";
};
export const initiateFacebookLogin = () => {
  window.location.href = "http://localhost:5000/auth/facebook";
};
