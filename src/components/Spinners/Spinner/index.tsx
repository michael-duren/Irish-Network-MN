import type { ReactNode } from "react";
import { ImSpinner10 } from "react-icons/im";

type SpinnerProps = {
  color?: string;
  size?: string;
  children?: ReactNode;
};

const Spinner = ({ color, size, children }: SpinnerProps) => {
  const chosenColor = color ? color : "text-gray-600";
  const chosenSize = size ? size : "text-6xl";

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className={`${chosenColor} animate-pulse`}> {children}</div>
      <ImSpinner10
        className={`animate-spin ${chosenSize} ${chosenColor} transition-colors`}
      />
    </div>
  );
};

export default Spinner;
