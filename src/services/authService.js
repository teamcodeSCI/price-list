import { useMutation } from '@tanstack/react-query';
import { loginFn, registerFn } from '../apis/auth';

export const useRegister = () => {
  const {
    mutate: mutateRegister,
    isLoading: isLoadingRegister,
    isSuccess: isSuccessRegister,
  } = useMutation({
    mutationFn: (body) => registerFn(body),
  });
  return { mutateRegister, isLoadingRegister, isSuccessRegister };
};
export const useLogin = () => {
  const {
    mutate: mutateLogin,
    isLoading: isLoadingLogin,
    isSuccess: isSuccessLogin,
  } = useMutation({ mutationFn: (body) => loginFn(body) });
  return { mutateLogin, isLoadingLogin, isSuccessLogin };
};
