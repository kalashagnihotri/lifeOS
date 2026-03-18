import { useCallback, useEffect, useMemo, useState } from "react";

const isTypingTarget = (target) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = String(target.tagName || "").toLowerCase();
  return target.isContentEditable || tagName === "input" || tagName === "textarea" || tagName === "select";
};

const useCommandPalette = ({ commands = [], enabled = true } = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openPalette = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setSearchQuery("");
    setSelectedIndex(0);
  }, []);

  const updateSearchQuery = (value) => {
    setSearchQuery(value);
    setSelectedIndex(0);
  };

  const filteredCommands = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return commands;
    }

    return commands.filter((command) => {
      const title = String(command.title || "").toLowerCase();
      const description = String(command.description || "").toLowerCase();
      return title.includes(query) || description.includes(query);
    });
  }, [commands, searchQuery]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handleGlobalKeyDown = (event) => {
      const metaOrCtrl = event.metaKey || event.ctrlKey;

      if (metaOrCtrl && String(event.key || "").toLowerCase() === "k") {
        event.preventDefault();
        openPalette();
        return;
      }

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        closePalette();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [closePalette, enabled, isOpen, openPalette]);

  useEffect(() => {
    if (!enabled || !isOpen) {
      return undefined;
    }

    const handlePaletteKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) => {
          if (!filteredCommands.length) {
            return 0;
          }

          return current >= filteredCommands.length - 1 ? 0 : current + 1;
        });
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) => {
          if (!filteredCommands.length) {
            return 0;
          }

          return current <= 0 ? filteredCommands.length - 1 : current - 1;
        });
        return;
      }

      if (event.key === "Enter") {
        const safeIndex = Math.min(selectedIndex, Math.max(filteredCommands.length - 1, 0));

        if (isTypingTarget(event.target) || !filteredCommands[safeIndex]) {
          return;
        }

        event.preventDefault();
        filteredCommands[safeIndex].action?.();
        closePalette();
      }
    };

    window.addEventListener("keydown", handlePaletteKeyDown);

    return () => {
      window.removeEventListener("keydown", handlePaletteKeyDown);
    };
  }, [closePalette, enabled, filteredCommands, isOpen, selectedIndex]);

  return {
    isOpen,
    searchQuery,
    selectedIndex,
    openPalette,
    closePalette,
    setSearchQuery: updateSearchQuery,
    setSelectedIndex,
    filteredCommands,
  };
};

export default useCommandPalette;
