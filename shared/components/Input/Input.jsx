import { useState } from "react";
import {
  getErrorStyles,
  getInputStyles,
  getInputWrapperStyles,
  getLabelStyles,
} from "./input.styles";

const Input = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={getInputWrapperStyles()}>
      {label ? <label style={getLabelStyles()}>{label}</label> : null}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={getInputStyles({ isFocused, hasError: Boolean(error) })}
      />
      {error ? <span style={getErrorStyles()}>{error}</span> : null}
    </div>
  );
};

export default Input;
