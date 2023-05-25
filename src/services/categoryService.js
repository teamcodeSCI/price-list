import { useQuery } from '@tanstack/react-query';
import { categoryFn } from '../apis/category';

export const useCategory = ({ brandId }) => {
  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isSuccess: isSuccessCategory,
  } = useQuery({
    queryKey: ['category', brandId],
    queryFn: () => categoryFn(brandId),
    staleTime: Infinity,
  });
  return { dataCategory, isLoadingCategory, isSuccessCategory };
};
