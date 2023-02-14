import type { PropsWithChildren } from "react";

import MainHeader from "../components/Headers/MainHeader";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full flex-col">
      <MainHeader />
      {children}
    </div>
  );
}
