"use client";
import Link from "next/link";
import { useCloseMenu } from "@/app/stores/menuStore";

type ItemType = {
  label: string;
  link: string;
};

const Item: React.FC<ItemType> = ({ label, link }) => {
  const closeMenu = useCloseMenu();

  return (
    <Link
      className="px-4 py-2 font-medium hover:bg-gray-100"
      onClick={closeMenu}
      href={link}
    >
      {label}
    </Link>
  );
};

export default Item;
