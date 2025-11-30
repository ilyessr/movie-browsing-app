import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import Navbar from "./Navbar";
import { useIsMobile } from "../hooks/useMobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isDetailPage = location.pathname.includes("/movie/");
  const isMobile = useIsMobile();

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(() => {
    const saved = localStorage.getItem("sideMenuOpen");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("sideMenuOpen", String(isSideMenuOpen));
  }, [isSideMenuOpen]);

  useEffect(() => {
    if (isMobile && isDetailPage) {
      setIsSideMenuOpen(false);
    }
  }, [isMobile, isDetailPage]);

  useEffect(() => {
    if (isMobile && isSideMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobile, isSideMenuOpen]);

  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-gray-900">
      <div className="flex">
        <SideMenu isSideMenuOpen={isSideMenuOpen} />
        {isSideMenuOpen && (
          <div
            onClick={() => setIsSideMenuOpen(false)}
            className="fixed inset-0 bg-black/50 sm:hidden z-20"
          />
        )}
        <div
          className={`min-h-screen flex flex-col transition-all duration-300 w-screen ${
            isSideMenuOpen ? "sm:pl-80" : "sm:pl-0"
          }`}
        >
          <Navbar handleSideMenuOpen={toggleSideMenu} />

          <main
            className={`
              flex-1 pt-16 transition-all duration-300
    ${
      isSideMenuOpen
        ? "opacity-40 overflow-hidden pointer-events-none"
        : "opacity-100 overflow-y-auto"
    }
        sm:opacity-100 sm:overflow-y-auto sm:pointer-events-auto


            `}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
