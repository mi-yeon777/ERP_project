# ERP3
* (1) ProductCard.jsx


components폴더에 features폴더생성후 여기에


ProductCard.jsx 생성하고 

ProductList.jsx의 ProductCard  함수블럭 링크 분리해 ProductCard.jsx에 넣어 작업


* util.js

export할 function fmtComma(value) {}함수와 리턴부 작업

적용할 값을 파라미터 value에 값을넣어 ProductCard.jsx의 fmtComma에 보낸다.


# ERP3_1
GlobalLayout.jsx

경로링크 추가

네비게이션바 만들기

-NavLink

className={({ isActive }) => ""}

엑티브하게 적용하기

네비바 임포트

-네비아이템함수 작업

삼항연산자 스타일 적용에서 특정 url에서만 적용하려면end

트렌지션 색변화 천천히 딜레이시간 조절가능

-네비바 함수 추가

네비아이템 변수선언 []에 url, 타이틀 넣어 받음

* NavBar.jsx
compnents- common-features폴더에

NavBar.jsx로 분리

# ERP3_2

* useProduct.js

uesMemo임포트
```
  // _2 useMemo, 카테고리추가: category에 따라 필터링된 products를 메모이제이션
  const products = useMemo(() => {
    if (!data) return []; // 데이터가 없으면 빈 배열 반환
    return filterByCategory(data, category || "all"); // 카테고리 필터 적용
  }, [data, category]); // data나 category가 바뀔 때만 재계산

```

* ProductList.jsx
  
카테고리변수, 필터파라미터 추가, 맵함수 productCard 뿌리기


* App.jsx
 
{ path: "products/:category", element: <ProductList /> }추가

# ERP3_3
* ProductList.jsx
반응형, 모바일에도 맞출수 있도록

리스트 사이즈버튼 

필터

온클릭 핸들토글

핸들토글 함수

셋필터사이즈 함수

셋함수

배열을 객체로, 중복값만고른후, 중복값제거

const next =new Set{(1,2,3,4)}

* ProductDetail.jsx

상세보기 조회 및 장바구니에 데이터 넣기

JSON.stringify 는 문자열로 변환
