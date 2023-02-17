import dayjs from "dayjs";

import { BsFacebook, BsInstagram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="static bottom-0 flex h-[20vh] w-full justify-start bg-black p-8  text-slate-100">
      <div className="flex flex-col space-y-8">
        <h3>&#169; Irish Network MN {dayjs().format("YYYY")}</h3>
        <div className="flex space-x-8">
          <div>
            <a
              href="https://www.facebook.com/irishnetworkminnesota/"
              target="_blank"
              rel="noreferrer"
            >
              <BsFacebook />
            </a>
          </div>
          <div>
            <a
              href="https://twitter.com/IrishNetworkMN"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillTwitterCircle />
            </a>
          </div>
          <div>
            <a
              href="https://www.instagram.com/irishnetworkmn/"
              target="_blank"
              rel="noreferrer"
            >
              <BsInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
