import useSWR, { SWRConfiguration } from "swr";
import { APIProductsResponse } from "../pages/api/products";

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<APIProductsResponse>(
    `/api${url}`,
    null,
    config
  );

  return { data: data || { data: [] }, error, isLoading: !data && !error };
};
