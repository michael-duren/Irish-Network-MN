import dayjs from "dayjs";
import MainButton from "../../Buttons/MainButton";
import FooterItemsContainer from "../FooterItemsContainer";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="bg-[#ffffff19] px-4 py-7 sm:px-12 md:flex md:items-center md:justify-between">
        <h1 className="mb-4 text-3xl font-semibold md:mb-0 md:w-2/5 lg:text-4xl lg:leading-normal">
          Irish Network <span className="text-red-400">MN</span>
        </h1>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0">
          <input
            type="text"
            placeholder="Enter your email"
            className="w=full mr-1 rounded py-2.5 px-2 text-gray-800 focus:outline-none sm:mr-5 sm:w-72 lg:mb-0"
          />
          <div className="mt-4 lg:mt-0">
            <MainButton type="submit">Join Newsletter</MainButton>
          </div>
        </div>
      </div>
      <FooterItemsContainer />
      <div className="textgray-400  flex pl-8 pt-2 pb-6 text-xs">
        <span> &#169; {dayjs().format("YYYY")} Irish Network MN</span>
      </div>
    </footer>
  );
};

export default Footer;
