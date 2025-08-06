interface IconHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const IconHeader = ({ className, children }: IconHeaderProps) => {
  return (
    <div
      className={`cursor-pointer duration-200 hover:opacity-60 ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default IconHeader;
