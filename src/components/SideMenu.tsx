import React, { FunctionComponent } from "react";
import { Slide } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { WIDTH_EXTEND_BUTTON, WIDTH_SIDE_MENU } from "../env";

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
    <div
      className={`z-40 block fixed h-screen w-screen md:w-[352px] md:max-w-${WIDTH_SIDE_MENU}`}
    >
      <Slide direction="right" in={isSideMenuOpen}>
        <div
          id="side-menu"
          className={`relative flex h-screen justify-between bg-black`}
        >
          <div className="flex p-4  md:py-4 w-full">{children}</div>
          <div
            className={`h-screen flex items-center justify-center bg-zinc-950 cursor-pointer`}
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
      </Slide>
      <div
        className={`fixed left-0 top-0 h-screen  w-${WIDTH_EXTEND_BUTTON} flex items-center justify-center bg-zinc-950 cursor-pointer`}
        style={{
          visibility: isSideMenuOpen ? "hidden" : "visible",
        }}
        onClick={handleToggleSideMenu}
      >
        <ArrowRight fontSize="medium" sx={{ color: "white" }} />
      </div>
    </div>
  );
};

export default SideMenu;
