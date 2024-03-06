import { useMutation } from '@tanstack/react-query';
import axios from 'axios'; // Assuming you are using Axios for HTTP requests

const NewCompanyProfile = async (data: any) => {
  // Update the API endpoint to http://localhost:1337/api/auth/local/register
  // const apiUrl = 'http://localhost:1337/api/user-company-profiles';
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}api/user-company-profiles`;

  // const dataa={
  //   username:"bvbb",
  //   email:"bgfh@gmail.com",
  //   password:"1234568",
  //   role:"Public",
  //   Type:"Company"
  // }

  // Use Axios to make a POST request
  return await axios.post(apiUrl, data);
};

const useComanyProfileMutation = (successHandler: any, errorHandler: any) => {
  return useMutation({
    mutationFn: async (data: any) => await NewCompanyProfile(data),
    onSuccess: (data) => successHandler(),
    onError: (error) => errorHandler(error)
  });
};

export default useComanyProfileMutation;
