import { useMutation, useQuery } from '@tanstack/react-query';
import { createLandingFn, landingFn } from '../apis/landing';

export const useLanding = ({ token, brandId }) => {
  const {
    data: dataLanding,
    isLoading: isLoadingLanding,
    isSuccess: isSuccessLanding,
  } = useQuery({
    queryKey: ['landing', brandId],
    queryFn: () => landingFn(token, brandId),
    staleTime: Infinity,
  });

  return { dataLanding, isLoadingLanding, isSuccessLanding };
};
export const useCreateLanding = (token) => {
  const {
    mutate: mutateCreateLanding,
    isLoading: isLoadingCreateLanding,
    isSuccess: isSuccessCreateLanding,
  } = useMutation({ mutationFn: (body) => createLandingFn(body, token) });
  return { mutateCreateLanding, isLoadingCreateLanding, isSuccessCreateLanding };
};
