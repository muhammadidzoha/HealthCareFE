import { IconButton } from "@material-tailwind/react";
import { Menu, X } from "lucide-react";

const MobileMenu = ({ onClick, open }) => {
  return (
    <div onClick={onClick}>
      <IconButton
        ripple={false}
        className="block lg:hidden rounded-full border border-gray-300 transition-all"
        variant="text"
        size="sm"
      >
        {open ? <X size={14} /> : <Menu size={14} />}
      </IconButton>
    </div>
  );
};

export default MobileMenu;
