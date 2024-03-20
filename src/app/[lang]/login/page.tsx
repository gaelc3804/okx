import { Locale } from "@/config/i18n.config";
import { getDictionaryServerOnly } from "@/dicts/default-dictionary-server-only";
import { LoginView } from "@/views/Login/LoginView";
import Image from "next/image";

interface IProps {
  params: {
    lang: Locale;
  };
}

export default async function Home({ params: { lang } }: IProps) {
  return (
    <>
      <LoginView lang={lang} />
    </>
  );
}
