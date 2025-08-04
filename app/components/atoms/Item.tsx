import Link from "next/link";

type ItemType = {
  label: string;
  link: string;
};

const Item: React.FC<ItemType> = ({ label, link }) => {
  return (
    <Link className="px-4 py-2 font-medium hover:bg-gray-100" href={link}>
      {label}
    </Link>
  );
};

export default Item;
