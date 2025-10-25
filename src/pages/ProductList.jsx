//_1 <2> ProductCard 함수 컴포넌트_features폴더로 분리
import { useProducts } from "@/hooks/useProducts"; // 💡 커스텀 훅 - 상품 데이터 불러오는 로직 담당
import { Link } from "react-router-dom"; // 💡 페이지 이동용 컴포넌트
import ProductCard from "@/components/features/ProductCard"; //추가 임포트 (💡 분리된 상품 카드 컴포넌트)
import { useParams } from "react-router-dom"; //ERP3_2 (💡 URL 파라미터에서 category 추출)
import { useState } from "react"; // _3 (💡 리액트 훅: 컴포넌트 내부 상태 관리)
import { cn } from "@/lib/utils"; // 💡 조건부 클래스 결합 유틸 함수 (ex: 조건 true면 class 추가)

//
// function ProductCard({ product }) {
//   const { id, title, price, rating, img } = product;
//   return (
//     <Link to={`/products/detail/${id}`}>
//       <div className="bg-stone-100 border p-4 rounded-lg shadow">
//         <div>
//           <img src={img} className="w-[100px] h-[100px]" />
//         </div>
//         <div className="font-bold">{title}</div>
//         <div>{price}</div>
//         <div>{rating}점</div>
//       </div>
//     </Link>
//   );
// }

//_3 사이즈필터 추가
function SizeFilter({ filteredSizes = [], setFilteredSizes }) {
  // 💡 사이즈 필터용 컴포넌트 (상품 필터링 UI)
  // 💡 부모(ProductList)에서 전달받은 상태(filteredSizes)와 업데이트 함수(setFilteredSizes)를 props로 받음

  const sizes = [225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280];
  // 💡 표시할 사이즈 배열 정의

  const handleToggle = (size) => {
    console.log("size", size);
    //(prev) => 의 prev는 setFilteredSizes에 넘기는 함수의 매개변수
    //(prev) => {...}이전 상태를 받아 새 상태를 계산하는 함수
    //setFilteredSizes: 상태 업데이트 함수

    // 💡 선택한 사이즈를 토글(선택 ↔ 해제)
    setFilteredSizes((prev) => {
      const next = new Set(prev); // 💡 Set 사용: 중복 방지
      next.has(size) ? next.delete(size) : next.add(size); // 💡 클릭 시 선택 상태 토글
      console.log("next", next);
      return [...next]; //업데이트 후 새로운 상태값을 React에 돌려줌 (Set → 배열로 변환)
    });
  };

  return (
    <div>
      <div className="font-bold border-b border-black py-2 mb-2">Size</div>
      <div className="flex flex-wrap gap-2">
        {/*const sizes =[]값 맵 순회하며 뿌려줌*/}
        {/* 💡 사이즈 배열을 map으로 순회하며 버튼 렌더링 */}
        {sizes.map((s) => (
          <div
            key={s}
            onClick={() => handleToggle(s)} // 💡 클릭 시 해당 사이즈 토글
            className={cn(
              "border px-2 py-1 border-stone-300", // 기본 스타일
              filteredSizes?.includes(s) && "bg-purple-200" // 💡 선택된 경우 배경색 변경
            )}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

//_2 카테고리 변수 파라미터 추가
export default function ProductList() {
  const { category } = useParams(); // 💡 URL의 /products/:category 에서 category 추출
  const [filteredSizes, setFilteredSizes] = useState([]); //_3 (💡 선택된 사이즈 상태 관리)
  const { products, isPending } = useProducts({ category, filteredSizes }); //_3 filteredSizes
  // 💡 useProducts 훅을 호출해 상품 데이터 로딩
  // 💡 category와 filteredSizes를 인자로 전달하여 필터링된 상품 목록을 가져옴

  if (isPending) return <div>로딩중</div>; // 💡 데이터 로딩 상태 표시

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {category ? category.toUpperCase() : "ALL"} {/*_3. toUpperCase*/}
        {/* 💡 URL 파라미터가 있으면 대문자로 표시, 없으면 ALL */}
      </h1>

      {/* _3. 모바일에도 맞을 수 있도록 css적용 상품 목록 그리드*/}
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 mb-8">
        {/* _3. 사이즈필터 */}
        {/* 💡 좌측 필터 영역 */}
        <SizeFilter
          filteredSizes={filteredSizes}
          setFilteredSizes={setFilteredSizes}
        />

        {/* 💡 우측 상품 목록 영역 */}
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 💡 불러온 products 배열을 map으로 렌더링 */}
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
              // 💡 각 상품 데이터는 ProductCard에 전달되어 개별 카드로 표시됨
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
