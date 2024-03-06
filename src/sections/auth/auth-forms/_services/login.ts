import axios from 'axios';
// import { loginFormData } from "../_schemas/login";

export const checkLogin = async (data: any) => {
  console.log('data:');
  console.log(data);
  return axios
    .post('http://localhost:1337/api/auth/local', {
      identifier: '656569891@gmail.com',
      password: '123456789'
    })
    .then((response: any) => {
      console.log('respose:::');
      console.log(response);
      return response.data;
    })
    .catch((error: any) => {
      return error.response;
    });
};
