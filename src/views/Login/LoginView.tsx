import { BellIcon } from "@/components/icons/BellIcon";
import { ChevronDown } from "@/components/icons/ChevronDown";
import { DownloadIcon } from "@/components/icons/DownloadIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import { QuestIcon } from "@/components/icons/QuestIcon";
import { LoginForm } from "./Form";
import { Locale } from "@/config/i18n.config";
import { getDictionaryServerOnly } from "@/dicts/default-dictionary-server-only";

interface IProps {
  lang: Locale;
}

export const LoginView = async ({ lang }: IProps) => {
  const dict = getDictionaryServerOnly(lang);
  return (
    <>
      <div className="flex w-full bg-[#121212] py-2 items-center justify-between">
        <div className="flex flex-row items-center px-4 gap-5">
          <img
            width="82"
            height="36"
            className="logo-img undefined"
            src={dict.dictionary.login.header.logoUrl}
            alt="OKX - Leading Cryptocurrency Exchange"
            title="OKX"
          />

          <span className="text-sm font-medium text-white flex flex-row items-center gap-2 cursor-pointer">
            {dict.dictionary.login.header.buyCrypto} <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            {dict.dictionary.login.header.discover} <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            {dict.dictionary.login.header.trade} <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            {dict.dictionary.login.header.grow} <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            {dict.dictionary.login.header.buid} <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            {dict.dictionary.login.header.institutional} <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            {dict.dictionary.login.header.Learn} <ChevronDown />
          </span>
          <span className="text-sm font-medium text-white  flex flex-row items-center gap-2 cursor-pointer">
            {dict.dictionary.login.header.More} <ChevronDown />
          </span>
        </div>

        <div className="flex flex-row gap-2 items-center px-6">
          <span className="text-white cursor-pointer">
            {dict.dictionary.login.header.loginLabel}
          </span>

          <div className="text-white px-2 py-1 flex items-center justify-center border border-zinc-200 rounded-[20px] cursor-pointer">
            {dict.dictionary.login.header.signUpButtonLabel}
          </div>

          <div className="flex flex-row gap-4 ml-6">
            <DownloadIcon />
            <BellIcon />
            <QuestIcon />
            <GlobeIcon />
          </div>
        </div>
      </div>
      {/* <LoginForm /> */}
      <div className="flex w-full h-full flex-row">
        <div className="flex max-w-[780px] min-w-[480px] w-full bg-[#121212] min-h-screen justify-center">
          <div className="flex flex-col gap-6 items-center max-w-[440px] mt-[140px]">
            <div className="flex flex-col gap-6 justify-start">
              <h2 className="text-white font-semibold text-4xl">
                {dict.dictionary.login.banner.title}
              </h2>
              <span className="font-medium text-base text-zinc-300">
                {dict.dictionary.login.banner.subtitle}
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
                  {dict.dictionary.login.banner.joinTelegramTitle}
                </h2>
                <p className="text-zinc-400 text-xs">
                  {dict.dictionary.login.banner.joinTelegramSub}
                </p>
              </div>
            </div>
          </div>
        </div>

        <LoginForm />
      </div>
    </>
  );
};
