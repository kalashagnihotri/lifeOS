import { useEffect, useRef } from "react";
import CommandItem from "./CommandItem";
import {
  getCommandPaletteEmptyStyles,
  getCommandPaletteInputStyles,
  getCommandPaletteInputWrapStyles,
  getCommandPaletteListStyles,
  getCommandPaletteModalStyles,
  getCommandPaletteOverlayStyles,
} from "./commandPalette.styles";

const CommandPalette = ({
  isOpen,
  searchQuery,
  setSearchQuery,
  filteredCommands,
  selectedIndex,
  setSelectedIndex,
  onClose,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isOpen]);

  const executeCommand = (command) => {
    command?.action?.();
    onClose();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && filteredCommands[selectedIndex]) {
      event.preventDefault();
      executeCommand(filteredCommands[selectedIndex]);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <div style={getCommandPaletteOverlayStyles({ isOpen })} onMouseDown={onClose}>
      <div style={getCommandPaletteModalStyles({ isOpen })} onMouseDown={(event) => event.stopPropagation()}>
        <div style={getCommandPaletteInputWrapStyles()}>
          <input
            ref={inputRef}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search commands..."
            style={getCommandPaletteInputStyles()}
          />
        </div>

        {!filteredCommands.length ? (
          <p style={getCommandPaletteEmptyStyles()}>No commands found.</p>
        ) : (
          <ul style={getCommandPaletteListStyles()}>
            {filteredCommands.map((command, index) => (
              <CommandItem
                key={command.id}
                command={command}
                isSelected={index === selectedIndex}
                onExecute={() => executeCommand(command)}
                onHover={() => setSelectedIndex(index)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommandPalette;
