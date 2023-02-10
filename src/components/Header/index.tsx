import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { IoMdClose } from "react-icons/io";
import { GoThreeBars } from "react-icons/go";
import AuthButton from "../AuthButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const currentRoute = router.route;

  const links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Membership", link: "/membership" },
    { name: "Events", link: "/events" },
    { name: "Contact", link: "/contact" },
  ];

  const onClickHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 left-0 z-10 my-12 flex h-[10vh] min-h-[10rem] items-center justify-between border-b border-gray-300 bg-white pb-4 md:border-b-0 ${
        currentRoute == "/admin/console" ? "hidden" : ""
      }`}
    >
      {/* Logo */}
      <div className="relative ml-6 mt-2 h-40 w-40">
        <Link className="" href="/">
          <Image src="/in-logo.svg" alt="Irish Network Logo" fill />
        </Link>
      </div>
      {/* Nav Links */}

      <nav className="bg-white">
        <ul
          className={`absolute left-0   flex w-[100%]  flex-col space-y-8  rounded-md border-2 border-gray-300 bg-white p-8 shadow-md transition-all duration-500 ease-in md:static md:z-auto md:my-0 md:mr-8 md:w-auto md:flex-row md:space-x-8 md:space-y-0 md:border-none md:p-0 md:shadow-none ${
            isMenuOpen ? "top-[100%]" : "top-[-500%]"
          } `}
        >
          {/* Nav Link */}
          {links.map((link) => {
            return (
              <li
                key={link.name}
                className={`mx-2 p-2 text-xl font-extralight  duration-500 hover:text-red-600  md:text-xl ${
                  currentRoute === link.link ? "text-red-700" : "text-gray-900"
                }`}
              >
                <Link onClick={onClickHandler} href={link.link}>
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li className="mx-2 p-2 md:p-0">
            <AuthButton />
          </li>
        </ul>
        {/* Hamburger */}
        <div
          onClick={onClickHandler}
          className="absolute top-20 right-16 flex w-[20rem]  cursor-pointer justify-end text-gray-400 md:hidden"
        >
          {isMenuOpen ? (
            <IoMdClose className="h-10 w-10 " />
          ) : (
            <GoThreeBars className="h-10 w-10 " />
          )}
        </div>
      </nav>
    </header>
  );
}
