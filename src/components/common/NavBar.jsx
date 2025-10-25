//ERP3_1 <1>NavBar.jsx추가
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

function NavItem({ item }) {
  const { title, url } = item;
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        cn(
          "px-2 font-bold hover:text-purple-500 transition-color duration-300 ease-in-out rounded",
          isActive && "text-purple-500 text-lg bg-purple-100 "
        )
      }
      end
    >
      {title}
    </NavLink>
  );
}

export function NavBar({ navItems = [] }) {
  return (
    <nav className="flex items-center space-x-2">
      {navItems.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </nav>
  );
}
