import type { ButtonProps } from "../../../../utils/types/props";

const OrangeButton = ({ children, onClick, type }: ButtonProps) => {
  const onClickHandler = onClick
    ? onClick
    : () => {
        return;
      };

  return (
    <button
      type={type}
      className={`inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default OrangeButton;
