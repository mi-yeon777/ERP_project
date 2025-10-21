import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  const {
    data: products,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/products");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
  });

  return { products, isPending, isError, error, refetch };
}
