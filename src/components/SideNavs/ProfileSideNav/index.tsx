import type { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { type Session } from "next-auth";

// icon imports

import {
  MdOutlineAdminPanelSettings,
  MdOutlineSettings,
  MdOutlineAccountCircle,
} from "react-icons/md";

import { BiLinkExternal } from "react-icons/bi";

type ProfileSideNavProps = {
  session: Session;
  setProfileState: Dispatch<SetStateAction<"account" | "settings">>;
  profileState: "account" | "settings";
};

const ProfileSideNav = ({ session, setProfileState, profileState }: ProfileSideNavProps) => {
  return (
    <div className={`rounded-3xl  bg-white duration-500 md:py-8 md:px-4`}>
      <div className="flex items-center justify-around md:mt-4 md:flex-col md:space-y-4 ">
        {/* Account */}
        <div
          onClick={() => setProfileState("account")}
          className={`group flex cursor-pointer items-center gap-3 rounded-md p-2 text-sm font-medium transition-all duration-500 hover:bg-gray-100 active:scale-95  ${
            profileState === "account" ? "text-black" : "text-gray-600"
          } `}
        >
          <div>
            <MdOutlineAccountCircle size={25} />
          </div>
          <h2 className="hidden md:block">Account</h2>
        </div>
        {/* Membership */}
        <div
          onClick={() => setProfileState("settings")}
          className={`group flex cursor-pointer items-center gap-3 rounded-md p-2 text-sm font-medium transition-all duration-500  hover:bg-gray-100 active:scale-95 ${
            profileState === "settings" ? "text-black" : "text-gray-600"
          }`}
        >
          <div>
            <MdOutlineSettings size={25} />
          </div>
          <h2 className="hidden md:block">Settings</h2>
        </div>
        {/* Admin Page */}
        {session.user.role === "ADMIN" ? (
          <Link
            href="/admin/console/dashboard"
            target={"_blank"}
            className={`group flex items-center gap-3 rounded-md p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 active:text-black `}
          >
            <div>
              <MdOutlineAdminPanelSettings size={25} />
            </div>
            <h2 className={`flex whitespace-pre duration-500`}>
              <div className="hidden md:block">Admin</div>
              <BiLinkExternal />
            </h2>
            <div></div>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ProfileSideNav;
