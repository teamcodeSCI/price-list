import { useQuery } from '@tanstack/react-query';
import { brandFn } from '../apis/brand';

export const useBrand = () => {
  const {
    data: dataBrand,
    isLoading: isLoadingBrand,
    isSuccess: isSuccessBrand,
  } = useQuery({ queryKey: ['brand'], queryFn: () => brandFn(), staleTime: Infinity });

  return { dataBrand, isLoadingBrand, isSuccessBrand };
};
