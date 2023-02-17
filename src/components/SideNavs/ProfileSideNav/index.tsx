import type { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { type Session } from "next-auth";

// icon imports

import {
  MdOutlineAdminPanelSettings,
  MdOutlineCardMembership,
} from "react-icons/md";

import { VscAccount } from "react-icons/vsc";

type ProfileSideNavProps = {
  session: Session;
  setProfileState: Dispatch<SetStateAction<"account" | "membership">>;
  profileState: "account" | "membership";
};

const ProfileSideNav = ({
  session,
  setProfileState,
  profileState,
}: ProfileSideNavProps) => {
  return (
    <div
      className={`flex rounded-3xl border-2 border-gray-300 bg-white py-8 px-4 duration-500`}
    >
      <div className="mt-4 flex flex-col space-y-4 ">
        {/* Account */}
        <div
          onClick={() => setProfileState("account")}
          className={`group flex cursor-pointer items-center gap-3 rounded-md p-2 text-sm font-medium transition-all duration-500 hover:bg-gray-100 active:scale-95  ${
            profileState === "account" ? "text-black" : "text-gray-600"
          } `}
        >
          <div>
            <VscAccount size={20} />
          </div>
          <h2>Account</h2>
        </div>
        {/* Membership */}
        <div
          onClick={() => setProfileState("membership")}
          className={`group flex cursor-pointer items-center gap-3 rounded-md p-2 text-sm font-medium transition-all duration-500  hover:bg-gray-100 active:scale-95 ${
            profileState === "membership" ? "text-black" : "text-gray-600"
          }`}
        >
          <div>
            <MdOutlineCardMembership size={25} />
          </div>
          <h2>Membership</h2>
        </div>
        {/* Admin Page */}
        {session.user.role === "ADMIN" ? (
          <Link
            href="/admin/console/dashboard"
            className={`group flex items-center gap-3 rounded-md p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 active:text-black `}
          >
            <div>
              <MdOutlineAdminPanelSettings size={25} />
            </div>
            <h2 className={`whitespace-pre duration-500 `}>Admin</h2>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ProfileSideNav;
