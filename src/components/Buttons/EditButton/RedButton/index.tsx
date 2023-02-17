import type { ButtonProps } from "../../../../utils/types/props";

import { TiWarningOutline } from "react-icons/ti";

const RedButton = ({ children, onClick, type }: ButtonProps) => {
  const onClickHandler = onClick
    ? onClick
    : () => {
        return;
      };

  return (
    <button
      type={type}
      className={`inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 active:scale-95`}
      onClick={onClickHandler}
    >
      <div className="flex items-center space-x-1">
        <TiWarningOutline />
        <p>{children}</p>
      </div>
    </button>
  );
};

export default RedButton;
