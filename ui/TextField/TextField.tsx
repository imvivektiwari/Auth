import { ReactNode, useId } from "react";

interface TextFieldProps {
  label: string;
  value: string;
  type?: string;
  onChange: (event: any) => void;
  rightLabel?: string | ReactNode;
}

const TextField = ({
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
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />
      </div>
    </div>
  );
};

export default TextField;
