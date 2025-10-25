import { useQuery } from "@tanstack/react-query"; // 서버 데이터 fetching과 상태 관리에 사용하는 훅
import { useMemo } from "react"; // 값의 재계산을 방지하여 성능 최적화를 위한 훅
// ERP3_2. useMemo값을 기억(memoize)해서 불필요한 재계산을 막는 최적화 훅

// _2 필터: 카테고리, 신규상품, 베스트상품 등에 따라 데이터를 필터링
function filterByCategory(data = [], category = "") {
  const c = category.toLowerCase(); // category를 소문자로 변환해 비교
  if (!c || c === "all") return data; // 카테고리가 없거나 'all'이면 전체 반환
  if (c === "new") {
    return data.filter((p) => p?.isNew === true); // isNew가 true인 상품만 반환
  }
  if (c === "best") {
    return data.filter((p) => p?.isBest === true); // isBest가 true인 상품만 반환
  }
  return data.filter((p) => p?.category === c); // 나머지 일반 카테고리 필터
}

// useProducts 훅: 상품 데이터 가져오기 + 선택적 필터링(id, category)
export function useProducts(options = {}) {
  const { id, category } = options || {}; // _2. category추가: 전달받은 옵션에서 id, category 추출

  // react-query useQuery를 사용해 서버에서 데이터 fetch
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["products"], // 캐싱 키. 동일 키면 react-query가 데이터를 재사용
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/products"); // 서버에서 상품 데이터 요청
      if (!res.ok) throw new Error(`HTTP ${res.status}`); // 실패 시 에러 던짐
      return res.json(); // JSON 데이터 반환
    },
  });

  // _2 useMemo, 카테고리추가: category에 따라 필터링된 products를 메모이제이션
  const products = useMemo(() => {
    if (!data) return []; // 데이터가 없으면 빈 배열 반환
    return filterByCategory(data, category || "all"); // 카테고리 필터 적용
  }, [data, category]); // data나 category가 바뀔 때만 재계산

  // 단일 상품 조회를 위한 useMemo: id가 있으면 해당 상품만 찾음
  const product = useMemo(() => {
    if (!id || !data) return null; // id 없거나 데이터 없으면 null
    return data.find((p) => String(p.id) === String(id)) ?? null; // id 일치하는 상품 반환
  }, [data, id]); // data 또는 id가 바뀌면 재계산

  // 최종 반환: 필터링된 상품 리스트, 단일 상품, fetch 상태, 에러, refetch 함수
  return { products, product, isPending, isError, error, refetch };
}
