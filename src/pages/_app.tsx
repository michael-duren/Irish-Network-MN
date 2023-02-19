import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "@next/font/google";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";

import MainLayout from "../layouts";
import AdminContextProvider from "../context/AdminContext";

import { api } from "../utils/api";

import "../styles/globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  preload: false,
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AdminContextProvider>
        <NextNProgress color="rgb(248 113 113)" />
        <Toaster />
        <MainLayout>
          <main className={poppins.className}>
            <Component {...pageProps} />
          </main>
        </MainLayout>
      </AdminContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
