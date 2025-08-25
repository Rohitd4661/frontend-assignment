import React, { useState } from "react";
import "./InputField.css";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
  theme?: "light" | "dark";
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
  theme = "light",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`inputfield-container ${theme}`}>
      {label && <label className="inputfield-label">{label}</label>}

      <div className="inputfield-wrapper">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          type={type === "password" && !showPassword ? "password" : "text"}
          className={`inputfield-input ${size} ${variant} ${
            invalid ? "invalid" : ""
          } ${disabled ? "disabled" : ""}`}
        />

        {clearable && value && (
          <button
            className="inputfield-btn"
            onClick={() =>
              onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            ❌
          </button>
        )}

        {type === "password" && (
          <button
            className="inputfield-btn"
            onClick={() => setShowPassword((p) => !p)}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        )}
      </div>

      {helperText && !errorMessage && (
        <span className="inputfield-helper">{helperText}</span>
      )}
      {errorMessage && (
        <span className="inputfield-error">{errorMessage}</span>
      )}
    </div>
  );
};
