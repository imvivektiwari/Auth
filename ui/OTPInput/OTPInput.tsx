import React, { useRef, useState } from "react";
import styled from "styled-components";

const InputWraper = styled.div<{ $dark?: boolean }>`
  width: 60px;
  display: flex;
  gap: 5px;
  input {
    flex: 1;
    max-width: 100%;
  }
`;

interface OTPInput {
  length?: number;
  onComplete: (value: string) => void;
}
const OTPInput = ({ length = 6, onComplete }: OTPInput) => {
  const [inputState, setInputState] = useState([...new Array(length).fill("")]);
  const [inputRefs, setInputRefs] = useState([...new Array(length).fill(null)]);

  const setRef = (index: number, ref: HTMLInputElement | null) => {
    const inputRefState = inputRefs;
    inputRefState[index] = ref;
    setInputRefs(inputRefState);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    //handle change
    const value = event.target.value;
    //@ts-ignore
    if (isNaN(value)) {
      return;
    }
    const inputValues = [...inputState];
    inputValues[index] = value;
    setInputState(inputValues);
    inputRefs[index + 1]?.focus();

    if (index === length - 1) {
      onComplete(inputState.join(""));
    }
  };

  const handleKey = (index: number, event: React.KeyboardEvent) => {
    const key = event.key;
    if (event.key !== "Backspace") return;
    // If current box has a value, just clear it.
    if (inputState[index]) {
      const next = [...inputState];
      next[index] = "";
      setInputState(next);

      // Prevent the browser from doing its own deletion.
      event.preventDefault();
      return;
    }
    // Current box is empty -> move back and clear previous.
    if (index > 0) {
      const next = [...inputState];
      next[index - 1] = "";
      setInputState(next);

      inputRefs[index - 1]?.focus();
      event.preventDefault();
    }
  };

  return (
    <InputWraper>
      {[...new Array(length)].map((_, index) => {
        return (
          <input
            key={index}
            value={inputState[index]}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKey(index, event)}
            ref={(ref) => setRef(index, ref)}
            className="rounded bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2"
          />
        );
      })}
    </InputWraper>
  );
};

export default OTPInput;
