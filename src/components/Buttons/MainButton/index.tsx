import { createElement } from "react";

import type { ButtonProps } from "../../../utils/types/props";

const MainButton = ({ children, type, onClick, icon, size }: ButtonProps) => {
  const onClickHandler = onClick
    ? onClick
    : () => {
        return;
      };

  const chosenSize = size ? size : 20;

  return (
    <button
      type={type}
      className="rounded-md bg-red-400 px-5 py-2.5 text-white duration-300 hover:bg-red-500 active:scale-95 lg:mt-0"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={onClickHandler}
    >
      {icon ? (
        <div className="flex items-center space-x-1">
          <div>{icon && createElement(icon, { size: chosenSize })}</div>
          <p>{children}</p>
        </div>
      ) : (
        <p>{children}</p>
      )}
    </button>
  );
};

export default MainButton;
