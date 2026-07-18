import React, { ReactNode, useId, useState } from "react";
import styled, { css } from "styled-components";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const InputWraper = styled.div<{ $dark?: boolean }>`
  margin-bottom: 0.5rem;
  .eye-icon {
    position: absolute;
    top: 0.7rem;
    right: 0.8rem;
  }
`;

interface TextFieldProps {
  name?: string;
  label: string;
  placeholder?: string;
  value?: string;
  type?: "text" | "password" | "email" | "date" | "checkbox";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rightLabel?: string | ReactNode;
}

const TextField = ({
  name = undefined,
  label,
  placeholder = "Enter " + label,
  value,
  type = "text",
  onChange,
  rightLabel,
}: TextFieldProps) => {
  const id = useId();
  const [inputType, setInputType] = useState(type);

  const handlePasswordToggle = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <InputWraper $dark>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-100"
        >
          {label}
        </label>
        <div className="text-sm">{rightLabel}</div>
      </div>
      <div className="mt-1 relative">
        <input
          name={name}
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          spellCheck={false}
          autoComplete={"off"}
          placeholder={placeholder}
          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />
        {type === "password" && inputType === "text" && (
          <FaEyeSlash onClick={handlePasswordToggle} className="eye-icon" />
        )}
        {type === "password" && inputType === "password" && (
          <FaEye onClick={handlePasswordToggle} className="eye-icon" />
        )}
      </div>
    </InputWraper>
  );
};

export default TextField;
