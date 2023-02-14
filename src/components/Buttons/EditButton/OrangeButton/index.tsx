import type { ButtonProps } from "../../../../utils/types/props";
import { createElement } from "react";

import { AiFillEdit } from "react-icons/ai";

const OrangeButton = ({ children, onClick, type, icon, size }: ButtonProps) => {
  const onClickHandler = onClick
    ? onClick
    : () => {
        return;
      };

  const chosenSize = size ? size : 20;

  return (
    <button
      type={type}
      className={`inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2`}
      onClick={onClickHandler}
    >
      {icon ? (
        <div className="flex items-center space-x-1">
          <div>{icon && createElement(icon, { size: chosenSize })}</div>
          <p>{children}</p>
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <AiFillEdit />
          <p>{children}</p>
        </div>
      )}
    </button>
  );
};

export default OrangeButton;
