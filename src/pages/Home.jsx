import { useProducts } from "@/hooks/useProducts";
export default function Home() {
  const { aaa } = useProducts();
  return <h1 className="text-2xl font-bold">Home</h1>;
}
