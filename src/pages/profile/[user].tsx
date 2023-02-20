import { useSession } from "next-auth/react";

import ProfileSideNav from "../../components/SideNavs/ProfileSideNav";
import Spinner from "../../components/Spinners/Spinner";
import { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Account from "../../components/Profile/Account";
import Settings from "../../components/Profile/Settings";
import { Transition } from "@headlessui/react";

const UserProfile = () => {
  const [profileState, setProfileState] = useState<"account" | "settings">(
    "account"
  );
  const accountIsShowing = profileState === "account";
  const settingsIsShowing = profileState === "settings";

  const router = useRouter();

  const { data: session } = useSession({ required: true });

  const user = api.user.getProvider.useQuery(
    { userId: router.query.user as string },
    {
      enabled: !!router.query.user,
    }
  );
  user.data?.accounts;
  if (!session?.user) {
    return <Spinner />;
  }
  return (
    <section className="h-full w-full overflow-scroll bg-gradient-to-r from-gray-700 via-gray-900 to-black ">
      <div className="flex  justify-center">
        <div className="flex items-start justify-center rounded-2xl p-8 ">
          <div className="sticky mr-8">
            <ProfileSideNav
              profileState={profileState}
              setProfileState={setProfileState}
              session={session}
            />
          </div>
          <div className="flex h-full w-full max-w-7xl items-center justify-center rounded-3xl bg-opacity-10 ">
            <div className=" flex flex-col rounded-3xl text-gray-900  lg:flex-row">
              <Transition
                appear={true}
                show={accountIsShowing}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {profileState === "account" && <Account session={session} />}
              </Transition>
              <Transition
                appear={true}
                show={settingsIsShowing}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {profileState === "settings" && <Settings session={session} />}
              </Transition>
              {/* aside */}
              <div className="flex flex-col">
                <div className="mx-4 flex min-h-[10rem] w-[20vw] min-w-[20rem] flex-col items-center justify-around  rounded-3xl   bg-white p-8 shadow-xl transition-all duration-300 ">
                  <h3>Membership</h3>
                  <p className="text-xs">
                    Your memebership is not currently active
                  </p>
                </div>
                <div className="mx-4 mt-4 flex min-h-[10rem] w-[20vw] min-w-[20rem] flex-col items-center justify-around  rounded-3xl border-2 border-solid   bg-white p-8 shadow-xl transition-all duration-300">
                  <h3>Upcoming Events</h3>
                  <p className="text-xs">You have no upcoming events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
