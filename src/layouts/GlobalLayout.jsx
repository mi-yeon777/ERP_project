import { Outlet, NavLink } from "react-router-dom";
import { NavBar } from "@/components/common/NavBar";

export default function GlobalLayout() {
  const navItems = [
    {
      title: "HOME",
      url: "/",
    },
    {
      title: "ALL",
      url: "/products",
    },
    {
      title: "WOMEN",
      url: "/products/women",
    },
    {
      title: "MEN",
      url: "/products/men",
    },
    {
      title: "KIDS",
      url: "/products/kids",
    },
    {
      title: "NEW",
      url: "/products/new",
    },
    {
      title: "BEST",
      url: "/products/best",
    },
    {
      title: "상품관리",
      url: "/mgr/product",
      isRight: true,
    },
    {
      title: "매장관리",
      url: "/mgr/store",
      isRight: true,
    },
  ];
  return (
    <div>
      <header className="border-b px-4 h-[44px] flex items-center">
        <NavBar navItems={navItems} />
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
