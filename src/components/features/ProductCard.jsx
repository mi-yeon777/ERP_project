//ERP3 시작 <1>
//입력순서 1.import
import { cn, fmtComma } from "@/lib/utils"; //유틸리티 함수
import { Link } from "react-router-dom"; // 라우터 링크 컴퍼넌트

// 2. 리액트 컴포넌트를 함수 형태로 선언
//ProductCard: 자식컴포넌트 부모로부터 받은 데이터를 props로 받음
export default function ProductCard({ product }) {
  //{ product }는 props 부모가 자식에게 내려준 props(속성)를 받는 매개변수
  //ㄴ>props.product를 구조분해해서 꺼낸 것
  //3. props 구조 분해
  const {
    id,
    title,
    price,
    sizes,
    disabledSizes,
    isNew,
    isBest,
    rating,
    img,
    category,
  } = product; //product.product 형태로 전달됨
  // product 객체에서 필요한 데이터를 꺼냅니다.
  //컴포넌트는 props로 데이터를 받기 때문에, 바로 변수로 꺼내두면 사용하기 편다.
  return (
    <Link to={`/products/detail/${id}`}>
      {" "}
      {/*4.제품클릭시 상세페이지 이동*/}
      {/*5.상위 div스타일 지정*/}
      <div
        className={cn("bg-stone-100 rounded border p-4 rounded-lg shadow", {
          "bg-rose-200": category === "women",
          "bg-blue-200": category === "men",
          "bg-green-200": category === "kids",
        })}
      >
        {/*6. 내부 구조 (내용 구성)*/}
        <div className="flex flex-col space-y-1">
          {/*상품이미지*/}
          <div className="flex justify-center">
            <img src={img} className="w-[140px] h-[140px]" />
          </div>
          {/*카테고리, 이름, 가격, fmtComma()는 숫자에 ,를 찍어주는 유틸함수*/}
          <div>[{category}]</div>
          <div className="font-bold text-lg">{title}</div>
          <div>{fmtComma(price)}원</div>
          {/*New/ Best 표시*/}
          <div className="flex space-x-2 text-xs">
            {isNew && (
              <div className="bg-red-500 px-1 rounded text-white">NEW</div>
            )}
            {isBest && (
              <div className="bg-primary px-1 rounded text-white">BEST</div>
            )}
          </div>
          {/*Hover시 사이즈 표시*/}
          {/*조건부 클래스: 특정 조건이 참이면 "line-through text-red-400"을, 거짓이면 빈 문자열을 적용*/}
          <div className="hidden group-hover:block">
            <div className="flex flex-wrap gap-1">
              {sizes.map((s) => (
                <div
                  key={s}
                  className={
                    disabledSizes?.includes(s)
                      ? "line-through text-red-400"
                      : ""
                  }
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
