import { useEffect, useRef } from "react";
import {
  getQuickAddCardStyles,
  getQuickAddHintStyles,
  getQuickAddInputStyles,
  getQuickAddOverlayStyles,
} from "./quickAdd.styles";

const QuickAdd = ({ isOpen, inputValue, setInputValue, closeQuickAdd, submitTask }) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitTask();
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeQuickAdd();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      await submitTask();
    }
  };

  return (
    <div style={getQuickAddOverlayStyles({ isOpen })} onMouseDown={closeQuickAdd}>
      <form style={getQuickAddCardStyles({ isOpen })} onMouseDown={(event) => event.stopPropagation()} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Quick add task..."
          style={getQuickAddInputStyles()}
        />
        <p style={getQuickAddHintStyles()}>Press Enter to save. Press Escape to close.</p>
      </form>
    </div>
  );
};

export default QuickAdd;
