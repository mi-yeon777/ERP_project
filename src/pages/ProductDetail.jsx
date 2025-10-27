import { useProducts } from "@/hooks/useProducts"; // ✅ 커스텀 훅 - 상품 데이터를 불러오는 로직
import { useState } from "react"; // ✅ 리액트 상태 관리 훅
import { useParams } from "react-router-dom"; //_3 ✅ URL 경로의 파라미터(id 등)를 읽어오는 훅

export default function ProductDetail() {
  // 🧩 useParams: URL에서 동적 파라미터(id 등)를 가져옴
  // 예: /product/5 → id = "5"
  const { id } = useParams();

  // 🧩 useProducts: 상품 정보를 가져오는 커스텀 훅 (비동기 데이터 요청)
  const { product, isPending } = useProducts({ id });

  //_3
  // 🧩 useState: 컴포넌트 내에서 변경 가능한 상태 정의
  // size: 사용자가 선택한 신발 사이즈
  // count: 구매 수량
  const [size, setSize] = useState(230);
  const [count, setCount] = useState(1);

  // 🧩 장바구니 버튼 클릭 시 실행되는 함수
  const handleAddCart = () => {
    // 장바구니에 저장할 데이터 구성
    const data = { id, size, count };

    // 로컬스토리지 키 이름 정의
    const cartKey = "cart";

    // localStorage에 문자열 형태로 저장
    localStorage.setItem(cartKey, JSON.stringify(data));

    // 저장된 값 불러오기 (문자열)
    const str = localStorage.getItem(cartKey);

    // JSON 문자열 → 객체로 변환
    const obj = JSON.parse(str);

    // 콘솔에 확인용 출력
    console.log("obj", obj);
  };

  if (isPending) return <div>로딩중...</div>;

  //_3 🧩 실제 상품 상세 정보 렌더링
  return (
    <div className="p-6">
      {/* 상품 이미지 영역 */}
      <div className="grid grid-cols-2 gap-8">
        <img
          src={product?.img}
          alt={product?.title}
          className="rounded-xl shadow-md"
        />
      </div>

      {/* 상품 상세 정보 영역 */}
      <div className="mt-4">
        <div className="text-2xl font-bold">{product?.title}</div>
        <div className="text-lg text-gray-700 mt-2">{product?.price}원</div>
        <div className="mt-3 text-sm">count : {count}</div>
        <div className="text-sm">size : {size}</div>

        {/* 장바구니 추가 버튼 */}
        <div className="mt-5">
          <button
            onClick={handleAddCart}
            className="border px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
          >
            장바구니 넣기
          </button>
        </div>
      </div>
    </div>
    //<div>상세페이지 {JSON.stringify(product)}</div>; //상품 객체를 문자열로 변환해 디버깅용으로 표시 가능(초반 서버데이터조회용으로 씀)
  );
}
