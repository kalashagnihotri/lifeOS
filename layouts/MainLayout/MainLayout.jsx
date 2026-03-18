import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { getContentAreaStyles, getLayoutRootStyles, getMainSectionStyles } from "./layout.styles";

const MainLayout = ({ children }) => {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={getLayoutRootStyles({ isCompact })}>
      <Sidebar isCompact={isCompact} />
      <section style={getMainSectionStyles({ isCompact })}>
        <Header isCompact={isCompact} />
        <main style={getContentAreaStyles({ isCompact })}>{children}</main>
      </section>
    </div>
  );
};

export default MainLayout;
