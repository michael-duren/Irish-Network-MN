import { useSession } from "next-auth/react";
import ProfileSideNav from "../../components/SideNavs/ProfileSideNav";
import Spinner from "../../components/Spinners/Spinner";
import { useState } from "react";
import Account from "../../components/Profile/Account";
import Settings from "../../components/Profile/Settings";
import { Transition } from "@headlessui/react";

const UserProfile = () => {
  const [profileState, setProfileState] = useState<"account" | "settings">("account");
  const accountIsShowing = profileState === "account";
  const settingsIsShowing = profileState === "settings";
  const { data: session } = useSession({ required: true });

  if (!session?.user) {
    return <Spinner />;
  }
  return (
    <section className="h-full w-full overflow-scroll bg-gradient-to-r from-gray-700 via-gray-900 to-black ">
      <div className="flex justify-center">
        <div className="flex flex-col items-start justify-center rounded-2xl p-8 md:flex-row ">
          <div className=" sticky mb-6  md:mb-0 md:mr-8">
            <ProfileSideNav
              profileState={profileState}
              setProfileState={setProfileState}
              session={session}
            />
          </div>

          <div className="flex flex-col space-y-4 rounded-3xl text-gray-900 lg:flex-row  lg:space-y-0">
            {/* account */}
            <Transition
              show={accountIsShowing}
              enter="transition-opacity transform duration-[400ms]"
              enterFrom="opacity-0 rotate-[-120deg]"
              enterTo="opacity-100 rotate-0"
              leave="transition-opacity transform duration-200"
              leaveFrom="opacity-100 rotate-0 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {profileState === "account" && <Account session={session} />}
            </Transition>
            {/* settings */}
            <Transition
              show={settingsIsShowing}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {profileState === "settings" && <Settings session={session} />}
            </Transition>
            {/* aside */}
            <div className="flex flex-col">
              <div className="mx-4 flex min-h-[10rem] w-[20vw] min-w-[20rem] flex-col items-center justify-around  rounded-3xl   bg-white p-8 shadow-xl transition-all duration-300 ">
                <h3>Membership</h3>
                <p className="text-xs">Your memebership is not currently active</p>
              </div>
              <div className="mx-4 mt-4 flex min-h-[10rem] w-[20vw] min-w-[20rem] flex-col items-center justify-around  rounded-3xl border-2 border-solid   bg-white p-8 shadow-xl transition-all duration-300">
                <h3>Upcoming Events</h3>
                <p className="text-xs">You have no upcoming events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
