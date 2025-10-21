//ERP2_2 fetch는 hooks_ useProducts.js로 이동
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useProducts } from "@/hooks/useProducts";

export default function MgrProduct() {
  const { products, isPending } = useProducts();

  if (isPending) return <div>로딩중</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">MgrProduct</h1>
      <div>
        <Table>
          <TableHeader>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sizes</TableHead>
          </TableHeader>
          <TableBody>
            {products?.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell className="font-bold">{p.title}</TableCell>
                <TableCell>{p.price}원</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell className="text-xs text-stone-500">
                  {p.sizes.join(" ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

//ERP2~2_1
// import {
//   Table,
//   TableHeader,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";
// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";

// export default function MgrProduct() {
//   //const [products, setProducts] = useState([]);

//   async function fetchProducts() {
//     const res = await fetch("http://localhost:4000/api/products");
//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     return res.json();
//   }

//   const {
//     data: products, // null => []
//     isLoading,
//     // isError,
//     // error,
//     // refetch,
//   } = useQuery({
//     queryKey: ["products"],
//     queryFn: fetchProducts,
//   });

//   return (
//     <div>
//       <h1 className="text-2xl font-bold">MgrProduct</h1>

//       <div>
//         <Table>
//           <TableHeader>
//             <TableHead>ID</TableHead>
//             <TableHead>Title</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Category</TableHead>
//             <TableHead>Sizes</TableHead>
//           </TableHeader>
//           <TableBody>
//             {products?.map((p) => (
//               <TableRow key={p.id}>
//                 <TableCell>{p.id}</TableCell>
//                 <TableCell className="font-bold">{p.title}</TableCell>
//                 <TableCell>{p.price}원</TableCell>
//                 <TableCell>{p.category}</TableCell>
//                 <TableCell className="text-xs text-stone-500">
//                   {p.sizes.join(" ")}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
