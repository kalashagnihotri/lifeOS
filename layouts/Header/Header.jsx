import {
  getHeaderAccentStyles,
  getHeaderBottomGlowStyles,
  getHeaderStyles,
  getHeaderBrandStyles,
  getHeaderRightStyles,
} from "./header.styles";
import { ChartColumn } from "lucide-react";
import Button from "../../shared/components/Button/Button";

const Header = ({ isCompact = false }) => {
  return (
    <header style={getHeaderStyles({ isCompact })}>
      <span style={getHeaderAccentStyles()} />
      <h1 style={getHeaderBrandStyles({ isCompact })}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ChartColumn size={18} strokeWidth={2.2} />
          LifeOS
        </span>
      </h1>
      <div style={getHeaderRightStyles({ isCompact })}>
        {isCompact ? null : <span>Alex User</span>}
        <Button
          label={isCompact ? "+ Add" : "+ Add Task"}
          variant="primary"
          size="small"
          onClick={() => {}}
        />
      </div>
      <span style={getHeaderBottomGlowStyles()} />
    </header>
  );
};

export default Header;
