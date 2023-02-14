import type { ButtonProps } from "../../../../utils/types/props";

const RedButton = ({ children, onClick, type }: ButtonProps) => {
  const onClickHandler = onClick
    ? onClick
    : () => {
        return;
      };

  return (
    <button
      type={type}
      className={`inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default RedButton;
