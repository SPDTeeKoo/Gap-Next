import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getSingleProfile = () => {
  return axios
    // .get(`http://localhost:1337/api/user-profiles?populate=users_permissions_user&filters[users_permissions_user]=11`)
    .get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}api/user-profiles?populate=users_permissions_user&filters[users_permissions_user]=${11}`
    )
    .then((response) => {
      console.log('response.data:');
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};

const useSingleProfile = () => {
  const queryKey = ['Single profile Details'];

  return useQuery({
    queryKey: queryKey,
    queryFn: () => getSingleProfile()
  });
};

export default useSingleProfile;
