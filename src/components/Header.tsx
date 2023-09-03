import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

interface HeaderProps extends React.HTMLProps<HTMLDivElement> {
  header_Component: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ header_Component, ...props }) => {
  const navigate = useNavigate();
  return (
    <header
      className="fixed w-full shadow-md p-5 py-4 flex items-center justify-between z-10 bg-white"
      {...props}
    >
      {header_Component}
      <HomeIcon
        className="text-[#4A4A4A] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
    </header>
  );
};

export default Header;
