type HCardProps = {
  children?: React.ReactNode;
};

const HorizontalCard = ({ children }: HCardProps) => {
  return (
    <div className=" flex min-h-[20rem] w-[20rem] flex-col items-center justify-around  rounded-md border-2 border-solid border-gray-300 p-8 shadow-xl transition-all duration-300 hover:border-gray-400">
      {children}
    </div>
  );
};

export default HorizontalCard;
