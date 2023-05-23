import { useQuery } from '@tanstack/react-query';
import { userFn } from '../apis/user';

export const useGetUser = (token) => {
  const {
    data: dataUser,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
  } = useQuery({ queryKey: ['user', token], queryFn: () => userFn(token), staleTime: Infinity });
  return { dataUser, isLoadingUser, isSuccessUser };
};
