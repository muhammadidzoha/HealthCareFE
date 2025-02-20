import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 70) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  return (
    <div>
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="w-[25px]" />
        <div className="leading-none font-semibold">
          <h1>Jalinan</h1>
          <h1>Anak Sehat</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
