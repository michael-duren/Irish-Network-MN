import { createElement } from "react";
import type { ButtonProps } from "../../../../utils/types/props";

import { GoCheck } from "react-icons/go";

const GreenButton = ({ children, onClick, type, icon, size }: ButtonProps) => {
  const onClickHandler = onClick
    ? onClick
    : () => {
        return;
      };

  const chosenSize = size ? size : 20;

  return (
    <button
      type={type}
      className={`inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:scale-95`}
      onClick={onClickHandler}
    >
      {icon ? (
        <div className="flex items-center space-x-1">
          <div>{icon && createElement(icon, { size: chosenSize })}</div>
          <p>{children}</p>
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <GoCheck />
          <p>{children}</p>
        </div>
      )}
    </button>
  );
};

export default GreenButton;
