import type { Dispatch, SetStateAction, ReactNode } from "react";

export type ButtonProps = {
  children?: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  color: "green" | "orange" | "red";
  onClick?: () => void | Dispatch<SetStateAction<boolean>>;
};
