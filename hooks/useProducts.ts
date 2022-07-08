import useSWR, { SWRConfiguration } from "swr";
import { APIProductsResponse } from "../pages/api/products";

const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<APIProductsResponse>(
    `/api${url}`,
    fetcher,
    config
  );

  return { products: data || { data: [] }, error, isLoading: !data && !error };
};
