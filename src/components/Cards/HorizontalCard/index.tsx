type HCardProps = {
  children?: React.ReactNode;
  width: string;
  height?: string;
};

const HorizontalCard = ({ children, width, height }: HCardProps) => {
  return (
    <div
      className={`flex min-h-[20rem] ${width} ${
        height ? height : ""
      } mx-4 mt-4 flex-col items-center justify-around  rounded-lg border-2 border-solid border-gray-300  bg-white p-8 shadow-xl transition-all duration-300 hover:border-gray-400 md:max-w-none`}
    >
      {children}
    </div>
  );
};

export default HorizontalCard;
