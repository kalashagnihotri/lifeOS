import { getHeaderStyles, getHeaderBrandStyles, getHeaderRightStyles } from "./header.styles";
import Button from "../../shared/components/Button/Button";

const Header = () => {
  return (
    <header style={getHeaderStyles()}>
      <h1 style={getHeaderBrandStyles()}>LifeOS</h1>
      <div style={getHeaderRightStyles()}>
        <span>Alex User</span>
        <Button label="+ Add Task" variant="primary" size="small" onClick={() => {}} />
      </div>
    </header>
  );
};

export default Header;
