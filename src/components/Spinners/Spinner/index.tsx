import { ImSpinner10 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <ImSpinner10 className="animate-spin text-6xl text-gray-600 transition-colors" />
    </div>
  );
};

export default Spinner;
