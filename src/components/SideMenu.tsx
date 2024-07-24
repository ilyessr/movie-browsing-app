import React, { FunctionComponent, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { WIDTH_EXTEND_BUTTON } from "../env";
import useMobile from "../hooks/useMobile";

interface SideMenuProps {
  children: React.ReactNode;
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (arg: boolean) => void;
}

const SideMenu: FunctionComponent<SideMenuProps> = ({
  children,
  isSideMenuOpen,
  setIsSideMenuOpen,
}) => {
  const handleToggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <div className="z-40 fixed h-screen">
      <div
        id="side-menu"
        className={`${
          isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out fixed h-screen w-screen md:w-[352px] bg-black box-border`}
      >
        <div className="relative flex h-screen justify-between w-full">
          <div className="flex pl-4 pt-4 pb-4 md:py-4 w-full">{children}</div>
          <div
            className="h-screen flex items-center justify-center bg-zinc-950 cursor-pointer w-6"
            onClick={handleToggleSideMenu}
          >
            <ArrowLeft
              fontSize="medium"
              sx={{
                color: "white",
                visibility: isSideMenuOpen ? "visible" : "hidden",
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 h-screen flex items-center justify-center bg-zinc-950 cursor-pointer ${
          isSideMenuOpen ? "hidden" : "block"
        }`}
        onClick={handleToggleSideMenu}
      >
        <ArrowRight fontSize="medium" sx={{ color: "white" }} />
      </div>
    </div>
  );
};

export default SideMenu;
