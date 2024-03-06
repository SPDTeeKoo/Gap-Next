import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getAllProfile = () => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/user-profiles?populate=*`
    )
    .then((response) => {
        console.log("response.data:")
        console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};

const useAllProfile = () => {
  const queryKey = ['User-Details'];

  return useQuery({
    queryKey: queryKey,
    queryFn: () => getAllProfile(),
  });
};

export default useAllProfile;
