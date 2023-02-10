import { GiClover } from "react-icons/gi";

import HorizontalCard from "../../components/HorizontalCard";

const WelcomeCards = () => {
  return (
    <div className=" mx-4 my-12 flex h-full flex-1 flex-col items-center justify-around space-x-4 md:flex-row lg:justify-center lg:space-x-8">
      <HorizontalCard>
        <h2 className="border-b border-gray-300 p-4 text-2xl">Welcome</h2>
        <GiClover className="text-[8rem]" />
      </HorizontalCard>
      <HorizontalCard>
        <h2 className="border-b border-gray-300 p-4 text-2xl">
          <span className="text-red-600">Who</span> We Are
        </h2>
        <p className="text-center">
          An irish fellowship based in Twin-Cities Minnesota Cupidatat culpa
          culpa Lorem minim duis eu reprehenderit velit occaecat.
        </p>
      </HorizontalCard>
      <HorizontalCard>
        <h2 className="border-b border-gray-300 p-4 text-2xl">
          <span className="text-red-600">Our</span> Mission
        </h2>
        <p className="text-center">
          Irish Network Minnesota creates opportunites for those in our
          community to conenct, professionally and socially, with our culture
          and heritage
        </p>
      </HorizontalCard>
    </div>
  );
};

export default WelcomeCards;