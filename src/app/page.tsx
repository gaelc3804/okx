import { getIpGeo } from "@/utils";
import { redirect } from "next/navigation";

export default async function PageRed() {
  const req = fetch("https://api.ipify.org?format=json");
  const data = await (await req).json();

  const { ip } = data;

  // console.log(ip);
  const locData = await getIpGeo(ip);
  if (locData === "CN") redirect("/cn/login");
  redirect("/en/login");

  return <></>;
}
