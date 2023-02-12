import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "@next/font/google";
import { Toaster } from "react-hot-toast";

import MainLayout from "../layouts";

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
      <Toaster />
      <MainLayout>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </MainLayout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
