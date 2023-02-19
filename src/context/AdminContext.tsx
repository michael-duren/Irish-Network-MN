import { createContext, useState } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";

type AdminContextType = {
  isSideNavOpen: boolean;
  setIsSideNaveOpen: Dispatch<SetStateAction<boolean>>;
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
};

export const AdminContext = createContext<AdminContextType>({
  isSideNavOpen: false,
  setIsSideNaveOpen: () => {
    return;
  },
  isAnimating: false,
  setIsAnimating: () => {
    return;
  },
});

const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [isSideNavOpen, setIsSideNaveOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <AdminContext.Provider
      value={{ isSideNavOpen, setIsSideNaveOpen, isAnimating, setIsAnimating }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
