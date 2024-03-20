import { redirect } from "next/navigation";

export default async function PageRed() {
  redirect("/en/login");

  return <></>;
}
