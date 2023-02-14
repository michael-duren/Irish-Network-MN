import type { ButtonProps } from "../../../../utils/types/props";

const GreenButton = ({ children, onClick, type }: ButtonProps) => {
  const onClickHandler = onClick
    ? onClick
    : () => {
        return;
      };

  return (
    <button
      type={type}
      className={`inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default GreenButton;
