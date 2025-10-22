# 각 컴포넌트의 역할


useProducts.js : 데이터를 가져오는 "커스텀 훅(Custom Hook)"


ㄴ> MgrProduct, MrgStore.jsx : 그 데이터를 보여주는 컴포넌트


# 서버 연결
* scrape 폴더의 generic-scrape.mjs : 웹 스크래핑용 소스


백엔드(Node.js)가 MySQL과 연동 : 서버가 DB와 연결

React가 백엔드에서 JSON 데이터를 받아옴 : 클라이 언트가 데이터를 요청


# ERP2


* MgrProduct.jsx, table.jsx


tanstack query(이건 서버데이터 가져오기/캐싱/관리, shadcn table은 ui)에서 참조 코딩


product서버실행 서버데이터 조회해보고(4000포트) 화면에뜬 데이터 http://localhost:4000/api/products를 fetch지정


npm i@tanstack/react-quer 명령어 설치


# ERP2_1

* mjrStore.jsx

store용 서버연결 선행


MgrProduct.jsx소스 참고& 4000포트에서 조회된 데이터나, 서버의 stores.json소스 보고 속성명데로
수정 및 추가


# ERP2_2


* useProducts.js 커스텀 훅이란?


“제품 목록을 불러오는 기능”을 재사용 가능한 훅으로 만든 거

```
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

```


문법요소/	의미
export function useProducts()	커스텀 훅 정의


useQuery({...})	TanStack Query로 데이터 요청


queryKey	캐시 키 (데이터 식별용)


queryFn	실제 데이터를 가져오는 함수


data: products	구조분해 + 이름 변경


return {...}	훅에서 값 반환


# ERP2_3


GlobalLayout:All링크 추가,ProductCard: id변수 추가, 


App.jsx: { path: "products/detail/:id", element: <ProdcutDetail /> }, 추가


* ProductDetail.jsx

  
ALL Link클릭시 list데이터 보이고, 상세보기는 텍스트만 리턴한상태.

id는 제품식별자 1,2,3...

product데이터를 담는 변수(상세페이지에 뿌리는 용도)

```
import { useProducts } from "@/hooks/useProducts";
import { useParams } from "react-router-dom";

export default function ProdcutDetail() {
  const { id } = useParams();
  const { product, isPending } = useProducts({ id });

  if (isPending) return <div>로딩중</div>;
  return <div>상세페이지 {JSON.stringify(product)}</div>;
}

```



