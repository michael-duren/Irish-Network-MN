import type { Dispatch, SetStateAction, ReactNode } from "react";
import type { IconType } from "react-icons";

export type DefaultPros = {
  children?: ReactNode;
};

export type ButtonProps = {
  children?: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void | Dispatch<SetStateAction<boolean>> | Promise<undefined>;
  icon?: IconType;
  size?: number;
  additionalStyle?: string;
};
