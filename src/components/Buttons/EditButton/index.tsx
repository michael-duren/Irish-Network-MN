import type { ButtonProps } from "../../../utils/types/props";

const EditButton = ({ children, onClick, type, color }: ButtonProps) => {
  const onClickHandler = onClick
    ? onClick
    : () => {
        return;
      };

  return (
    <button
      type={type}
      className={`inline-flex justify-center rounded-md border border-transparent bg-${color}-100 px-4 py-2 text-sm font-medium text-${color}-900 hover:bg-${color}-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-${color}-500 focus-visible:ring-offset-2`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default EditButton;
