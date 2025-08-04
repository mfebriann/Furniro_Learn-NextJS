import Link from "next/link";
import Image from "next/image";
import Favicon from "@/app/favicon.ico";
import Menu from "./Menu";

const Header = () => {
  return (
    <header className="sticky top-0 container mx-auto bg-white px-3 py-7">
      <div className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-x-1">
          <Image
            src={Favicon}
            alt="Furniro Logo"
            width={40}
            height={30}
            className="h-6 w-9 sm:h-7 sm:w-11"
          />
          <span className="font-montserrat text-2xl font-bold sm:text-3xl">
            Furniro
          </span>
        </Link>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
