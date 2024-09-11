// 封装axios
import axios from 'axios'

const httpInstance = axios.create({
  baseURL: '',
  timeout: 50000
})

// 拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // // 从localStorage中获取token
    // const token = localStorage.getItem("token");
    // // 如果token存在，则在请求头中添加Authorization字段
    // if (token) {
    //   const tokenOBJ = JSON.parse(token?token:"");
    //   console.log(token);
    //   config.headers.Authorization = `${tokenOBJ}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log("This is a erro")
    return Promise.reject(error)
  }
)

export { httpInstance }
