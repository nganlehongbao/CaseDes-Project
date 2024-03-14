import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: 'http://localhost:5000' ,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

instance.interceptors.request.use((config) => {
    // Initialize headers if not already present
    config.headers = config.headers || {};
  
    // Lấy token từ local storage
    const authToken = Cookies.get('token');
  
    // Kiểm tra xem token có tồn tại hay không
    if (authToken) {
      // Nếu tồn tại, thêm token vào header
      config.headers['Authorization'] = `Bearer ${authToken}`;
    } else {
      // Nếu không tồn tại, bạn có thể thực hiện xử lý khác, hoặc không thêm token vào header
      console.warn('Token is missing. Do something...');
    }
  
    return config;
  });
  

export default instance;