import React, { ReactNode, useId } from "react";

interface TextFieldProps {
  name?: string;
  label: string;
  value: string;
  type?: "text" | "password" | "email" | "date";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rightLabel?: string | ReactNode;
}

const TextField = ({
  name = undefined,
  label,
  value,
  type = "text",
  onChange,
  rightLabel,
}: TextFieldProps) => {
  const id = useId();
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-100"
        >
          {label}
        </label>
        <div className="text-sm">{rightLabel}</div>
      </div>
      <div className="mt-1">
        <input
          name={name}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          spellCheck={false}
          autoComplete={"off"}
          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />
      </div>
    </div>
  );
};

export default TextField;
