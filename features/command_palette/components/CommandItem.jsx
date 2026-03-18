import { useState } from "react";
import {
  getCommandItemDescriptionStyles,
  getCommandItemStyles,
  getCommandItemTitleStyles,
} from "./commandPalette.styles";

const CommandItem = ({ command, isSelected, onExecute, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li>
      <button
        type="button"
        style={getCommandItemStyles({ isSelected, isHovered })}
        onClick={onExecute}
        onMouseEnter={() => {
          setIsHovered(true);
          onHover?.();
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p style={getCommandItemTitleStyles()}>{command.title}</p>
        <p style={getCommandItemDescriptionStyles()}>{command.description}</p>
      </button>
    </li>
  );
};

export default CommandItem;
