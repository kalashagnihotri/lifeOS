import { getHeaderStyles, getHeaderBrandStyles, getHeaderRightStyles } from "./header.styles";
import Button from "../../shared/components/Button/Button";

const Header = ({ isCompact = false }) => {
  return (
    <header style={getHeaderStyles({ isCompact })}>
      <h1 style={getHeaderBrandStyles({ isCompact })}>LifeOS</h1>
      <div style={getHeaderRightStyles({ isCompact })}>
        {isCompact ? null : <span>Alex User</span>}
        <Button
          label={isCompact ? "+ Add" : "+ Add Task"}
          variant="primary"
          size="small"
          onClick={() => {}}
        />
      </div>
    </header>
  );
};

export default Header;
