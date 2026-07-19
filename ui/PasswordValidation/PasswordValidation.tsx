import React, { useState } from "react";
import TextField, { TextFieldType } from "../TextField/TextField";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const PasswordValidation = (props: TextFieldType) => {
  const [validations, setValidations] = useState([
    {
      label: "Alteat one uppercase",
      valid: false,
      regex: /[A-Z]/,
    },
    {
      label: "Atleast one lowercase",
      valid: false,
      regex: /[a-z]/,
    },
    {
      label: "Alteast one number",
      valid: false,
      regex: /\d/,
    },
    {
      label: "Aleast one special charector",
      valid: false,
      regex: /[^a-zA-Z0-9]/,
    },
  ]);

  const checkValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const criteria = validations.map((password) => {
      return {
        ...password,
        valid: password.regex.test(value),
      };
    });

    setValidations(criteria);
    props?.onChange?.(event);
  };

  return (
    <div className="mb-3">
      <TextField {...props} type="password" onChange={checkValidation} />
      <div className="text-white">
        {validations.map((password, index) => {
          return (
            <div className="flex gap-3 items-center" key={index}>
              <p>
                {password.valid ? (
                  <TiTickOutline style={{ color: "green" }} />
                ) : (
                  <RxCross2 style={{ color: "red" }} />
                )}
              </p>
              <p> {password.label} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordValidation;
