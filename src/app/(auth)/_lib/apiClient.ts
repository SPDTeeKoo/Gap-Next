import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      //request.headers = {};
      request.headers.Authorization = `Bearer ${session?.user?.jwt}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    /* (error) => {
      console.log(`error`, error);
      return 
    } */
  );

  return instance;
};

export default ApiClient();
