//Allows React to communicate with express API
import axios from "axios";

//Create Axios instance with backend URL
const api = axios.create({baseURL : "http://localhost:5000/api"});

//Axios interceptor. An interceptor runs before an Axios request is sent. 
//we use it to automatically attach the JWT.
api.interceptors.request.use((config) =>
{
  try 
  {
    //getting token
    const token = localStorage.getItem("token");

    if(token)
    {
      //adding Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    //return request. this allows Axios to continue with the modified request.
    return config;
  } 
  catch (error) 
  {
    return Promise.reject(error);
  }
});

export default api;