import { useMutation } from '@tanstack/react-query';
import axios from 'axios'; // Assuming you are using Axios for HTTP requests

const UpdateProfile = async (data: any) => {
  // Update the API endpoint to http://localhost:1337/api/auth/local/register
  const apiUrl = 'http://localhost:1337/api/user-profiles/14?populate=*';

  // const dataa={
  //   username:"bvbb",
  //   email:"bgfh@gmail.com",
  //   password:"1234568",
  //   role:"Public",
  //   Type:"Company"
  // }

  // Use Axios to make a POST request
  return await axios.put(apiUrl, data);
};

const useProfileUpdateMutation = (successHandler: any, errorHandler: any) => {
  return useMutation({
    mutationFn: async (data: any) => await UpdateProfile(data),
    onSuccess: (data) => successHandler(),
    onError: (error) => errorHandler(error)
  });
};

export default useProfileUpdateMutation;
