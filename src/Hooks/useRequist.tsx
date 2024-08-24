import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useRequist() {
  let response = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/products"),
    select: (data) => data.data.data,
    // staleTime: 10000,
    // refetchInterval: 10000,
    // refetchIntervalInBackground: true,
    // retry: 1,
    // gcTime: 10000,
    // retryDelay: 1000,
  });

  return response;
}
