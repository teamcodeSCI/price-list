import { useQuery } from '@tanstack/react-query';
import { landingFn } from '../apis/landing';

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
