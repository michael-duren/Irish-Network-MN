import dayjs from "dayjs";
import FooterItemsContainer from "../FooterItemsContainer";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="bg-[#ffffff19] px-4 py-7 sm:px-12 md:flex md:items-center md:justify-between">
        <h1 className="text-3xl font-semibold md:mb-0 md:w-2/5 lg:text-4xl lg:leading-normal">
          Irish Network <span className="text-red-400">MN</span>
        </h1>
        <div>
          <input
            type="text"
            placeholder="Enter your email"
            className="w=full mr-1 rounded py-2.5 px-2 text-gray-800 focus:outline-none sm:mr-5 sm:w-72 lg:mb-0"
          />
          <button className="mt-4 rounded-md bg-red-400 px-5 py-2.5 text-white duration-300 hover:bg-red-500 active:scale-95 lg:mt-0">
            Join Newsletter
          </button>
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
