import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { getContentAreaStyles, getLayoutRootStyles, getMainSectionStyles } from "./layout.styles";

const MainLayout = ({ children }) => {
  return (
    <div style={getLayoutRootStyles()}>
      <Sidebar />
      <section style={getMainSectionStyles()}>
        <Header />
        <main style={getContentAreaStyles()}>{children}</main>
      </section>
    </div>
  );
};

export default MainLayout;
