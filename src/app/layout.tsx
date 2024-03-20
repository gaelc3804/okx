import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Login OKX's Website | OKX",
  description: "OKX's Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notify = () => toast("Wow so easy !");
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
      {/* <ToastContainer /> */}
    </html>
  );
}
