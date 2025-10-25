import { useProducts } from "@/hooks/useProducts";
import { useParams } from "react-router-dom";

export default function ProdcutDetail() {
  const { id } = useParams();
  const { product, isPending } = useProducts({ id });

  if (isPending) return <div>로딩중</div>;
  return <div>상세페이지 {JSON.stringify(product)}</div>;
}
