import type { PropsWithChildren } from "react";

import Header from "../components/Header";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      {children}
    </div>
  );
}
