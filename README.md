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


