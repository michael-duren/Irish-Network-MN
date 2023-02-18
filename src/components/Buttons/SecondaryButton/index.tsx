import { createElement } from "react";

import type { ButtonProps } from "../../../utils/types/props";

const SecondaryButton = ({
  children,
  type,
  onClick,
  icon,
  size,
}: ButtonProps) => {
  const onClickHandler = onClick
    ? onClick
    : () => {
        return;
      };

  const chosenSize = size ? size : 20;

  return (
    <div className="rounded-md bg-gray-900 text-white">
      <button
        type={type}
        className="rounded-md bg-secondary-color px-5 py-2.5 text-white duration-300 hover:bg-transparent active:scale-95 lg:mt-0"
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
    </div>
  );
};

export default SecondaryButton;
