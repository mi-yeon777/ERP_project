import { useProducts } from "@/hooks/useProducts";

function ProductCard({ product }) {
  const { title, price, rating, img } = product;
  return (
    <div className="bg-stone-100 border p-4 rounded-lg shadow">
      <div>
        <img src={img} className="w-[100px] h-[100px]" />
      </div>
      <div className="font-bold">{title}</div>
      <div>{price}</div>
      <div>{rating}점</div>
    </div>
  );
}

export default function ProductList() {
  const { products, isPending } = useProducts();

  if (isPending) return <div>로딩중</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">ALL</h1>
      <div className="grid grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
