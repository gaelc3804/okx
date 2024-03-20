"use client";

import { useRef, useState } from "react";

export const AuthenticatorCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const refs = useRef<any>([]);
  refs.current = [];

  const addToRefs = (el: any) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  const handleInputCode = (idx: number, value: string) => {
    const ref = refs.current[idx + 1];

    setCode((rest) => {
      if (rest[idx] === "") {
        rest[idx] = value;
      }
      return [...rest];
    });

    if (value.length >= 1) {
      if (idx + 1 !== refs.current.length) {
        ref.focus();
      }
    }
  };

  const handleBakspacePressed = (idx: number, value: string) => {
    const ref = refs.current[idx - 1];

    setCode((rest) => {
      rest[idx] = "";
      return [...rest];
    });

    if (idx !== 0) {
      if (value.length === 0) {
        ref.focus();
      }
    }
  };

  return (
    <>
      <div className="flex flex-col min-w-[40%] max-w-[380px] w-full gap-4 mt-[140px] transition-all">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Enter code</h1>
          <p>
            Enter the code from your authenticator app, such as Google
            Authenticator
          </p>

          <div className="grid grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((val, idx) => (
              // <div key={val} ref={addToRefs}>
              //   {val}
              // </div>
              <div key={val} className="w-[45px] h-[45px] ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center rounded-lg border border-gray-300 text-lg bg-white outline-none transition-all focus:border-zinc-800 focus:shadow-md"
                  type="number"
                  ref={addToRefs}
                  id={`${val}`}
                  autoFocus
                  name=""
                  maxLength={1}
                  size={1}
                  value={code[idx]}
                  onChange={(e) => {
                    handleInputCode(idx, e.target.value);
                  }}
                  onKeyUp={(event) => {
                    if (event.key === "Backspace") {
                      handleBakspacePressed(idx, event.currentTarget.value);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
