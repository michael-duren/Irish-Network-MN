import { createElement, useState } from "react";
import Link from "next/link";

// icon imports
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCalendar2Event, BsFileImage } from "react-icons/bs";
import { AiOutlineTeam } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";

const SideNav = () => {
  const [open, setOpen] = useState(true);

  const menus = [
    {
      name: "Dashboard",
      link: "/admin/console/dashboard",
      icon: MdOutlineDashboard,
      margin: true,
      size: 25,
    },
    {
      name: "Events",
      link: "/admin/console/events",
      icon: BsCalendar2Event,
      size: 20,
    },
    {
      name: "Team",
      link: "/admin/console/team",
      icon: AiOutlineTeam,
      size: 20,
    },
    {
      name: "Images",
      link: "/admin/console/images",
      icon: BsFileImage,
      size: 20,
    },
    {
      name: "Messages",
      link: "/admin/console/messages",
      icon: FiMessageSquare,
      size: 20,
    },
  ];

  return (
    <div
      className={`min-h-screen  bg-black px-4 text-gray-200 duration-500 ${
        open ? "w-72" : "w-16"
      }`}
    >
      <div className="flex justify-end py-3 ">
        <GiHamburgerMenu
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col space-y-4 ">
        {menus?.map((menu, i) => {
          return (
            <Link
              key={menu.name}
              href={menu.link}
              className={`group mb-8 flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-gray-800`}
            >
              <div>{createElement(menu.icon, { size: menu.size })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open ? "translate-x-28 overflow-hidden opacity-0" : ""
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-white px-0 py-0 font-semibold text-gray-900 drop-shadow-lg  group-hover:left-14 group-hover:w-fit group-hover:border-2 group-hover:border-gray-300 group-hover:px-2 group-hover:py-1 group-hover:duration-300 ${
                  open ? "hidden" : ""
                }`}
              >
                {menu.name}
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
