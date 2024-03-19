"use client";

export const LoginForm = () => {
  return (
    <>
      <div className="flex w-full h-full flex-row">
        <div className="flex max-w-[780px] min-w-[780px] bg-[#121212] min-h-screen justify-center">
          <div className="flex flex-col gap-6 items-center max-w-[440px] mt-[140px]">
            <div className="flex flex-col gap-6 justify-start">
              <h2 className="text-white font-semibold text-4xl">
                Trade with confidence
              </h2>
              <span className="font-medium text-base text-zinc-300">
                Your funds are always backed 1:1 on OKX with our regularly
                published audits on our Proof of Reserves
              </span>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="banner-login-img"
                src="https://www.okx.com/cdn/assets/imgs/243/5AD5609D76BF42F4.png?x-oss-process=image/format,webp/resize,w_600,h_680"
                alt="banner-login-img"
                width={380}
                height={320}
              ></img>

              <div className="flex flex-col px-4 py-3 w-full bg-[#27282A] rounded-md cursor-pointer">
                <h2 className="text-white font-semibold text-base">
                  Join our Telegram group
                </h2>
                <p className="text-zinc-400 text-xs">
                  Ask questions, get answers, and chat with other traders to
                  shape the crypto future together
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full flex justify-center">
          <div className="flex flex-col min-w-[40%] gap-10 mt-[140px]">
            <div className="flex">
              <h1 className="text-4xl font-bold">Log in</h1>
            </div>
            {/* FORM */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-6 items-center">
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-medium text-zinc-500 hover:text-black transition-all cursor-not-allowed">
                    Phone
                  </span>
                  <div className="border border-white"></div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-medium text-black hover:text-black transition-all cursor-pointer">
                    Email/Sub Account
                  </span>
                  <div className="border border-zinc-800"></div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-medium text-zinc-500 hover:text-black transition-all cursor-not-allowed">
                    QR code
                  </span>
                  <div className="border border-white"></div>
                </div>
              </div>
              <input
                type="text"
                className="w-full border border-zinc-300 py-2 px-2 outline-none transition-all focus:border-zinc-800 focus:shadow-md rounded-md"
              />
            </div>

            <button
              disabled
              className="disabled:bg-[#F5F5F5] py-3 disabled:text-zinc-400 rounded-[30px] disabled:cursor-not-allowed"
            >
              Next
            </button>

            <div className="flex justify-center ">
              <span className="text-base">
                Dont have an account?{" "}
                <strong className="underline cursor-pointer hover:no-underline hover:text-zinc-600">
                  Sign up
                </strong>
              </span>
            </div>

            <hr />
            <span className="text-sm text-zinc-500 font-light">
              This site is protected by Google reCAPTCHA to ensure {"you're"}{" "}
              not a bot.{" "}
              <a href="" className="text-black font-normal underline">
                Learn more
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
