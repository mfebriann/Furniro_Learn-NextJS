import Item from "./atoms/Item";

const MenuItem: React.FC<{ isMenuOpen: boolean }> = ({ isMenuOpen }) => {
  return (
    <nav
      className={`border-primary shadow-primary flex w-40 flex-col rounded-lg border bg-white ${isMenuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} overflow-hidden shadow-sm transition-all duration-150 ease-in-out`}
    >
      <Item label="Home" link="/" />
      <Item label="Shop" link="/shop" />
      <Item label="About" link="/about" />
      <Item label="Contact" link="/contact" />
    </nav>
  );
};

export default MenuItem;
