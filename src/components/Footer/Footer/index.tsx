import dayjs from "dayjs";
// import MainButton from "../../Buttons/MainButton";
import FooterItemsContainer from "../FooterItemsContainer";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="flex items-end justify-end bg-[#ffffff19] px-4 py-7">
        <h1 className="mb-4 text-right text-3xl font-semibold md:mb-0 md:w-2/5 lg:text-4xl lg:leading-normal">
          Irish Network <span className="text-red-400">MN</span>
        </h1>
      </div>
      <FooterItemsContainer />
      <div className="textgray-400  flex pl-8 pt-2 pb-6 text-xs">
        <span> &#169; {dayjs().format("YYYY")} Irish Network MN</span>
      </div>
    </footer>
  );
};

export default Footer;
