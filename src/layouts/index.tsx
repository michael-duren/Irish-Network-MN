import type { PropsWithChildren } from "react";
import Footer from "../components/Footer/Footer";

import MainHeader from "../components/Headers/MainHeader";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative h-screen w-full flex-col">
      <MainHeader />
      {children}
      <Footer />
    </div>
  );
}
