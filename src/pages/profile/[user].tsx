import Image from "next/image";

import { useSession } from "next-auth/react";

import HorizontalCard from "../../components/Cards/HorizontalCard";
import ProfileSideNav from "../../components/SideNavs/ProfileSideNav";
import Spinner from "../../components/Spinners";
import { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";

const UserProfile = () => {
  const [profileState, setProfileState] = useState<"account" | "membership">(
    "account"
  );

  const router = useRouter();
  console.log(router.query.user);

  const { data: session } = useSession({ required: true });

  const user = api.user.getProvider.useQuery(
    { userId: router.query.user as string },
    {
      enabled: !!router.query.user,
    }
  );

  if (!session?.user) {
    return <Spinner />;
  }
  return (
    <section className="h-full w-full overflow-scroll">
      <div className="flex  justify-center">
        <div className="items mx-8 flex flex-col justify-center rounded-2xl p-8 md:flex-row">
          <ProfileSideNav
            profileState={profileState}
            setProfileState={setProfileState}
            session={session}
          />
          <div className="flex h-full w-full max-w-7xl items-center justify-center rounded-3xl bg-opacity-10 ">
            {profileState === "account" && session.user.name && (
              <div className=" flex flex-col rounded-3xl bg-gradient-to-bl from-green-300 to-cyan-400 p-12 lg:flex-row">
                <div className="mx-4 mt-4 flex h-full min-h-[30rem] w-[30vw] min-w-[20rem] max-w-[80rem] flex-col items-center justify-around rounded-3xl border-2 border-solid border-gray-300  bg-white p-8 shadow-xl transition-all duration-300 hover:border-gray-400">
                  {session.user.image && (
                    <div className="relative flex h-48 w-48 flex-col items-center">
                      <Image
                        className="h-auto max-w-[100%] rounded-full"
                        src={session?.user.image}
                        alt={session?.user.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <h1 className="text-2xl">{session?.user.name}</h1>
                  <div className="text-sm text-gray-600">
                    <p>Signed in with: {user.data?.accounts[0]?.provider}</p>
                    <p>Email: {session.user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="mx-4 mt-4 flex min-h-[10rem] w-[20vw] min-w-[20rem] flex-col items-center justify-around  rounded-md border-2 border-solid border-gray-300  bg-white p-8 shadow-xl transition-all duration-300 hover:border-gray-400">
                    <h3>Membership</h3>
                  </div>
                  <div className="mx-4 mt-4 flex min-h-[10rem] w-[20vw] min-w-[20rem] flex-col items-center justify-around  rounded-md border-2 border-solid border-gray-300  bg-white p-8 shadow-xl transition-all duration-300 hover:border-gray-400">
                    <h3>Upcoming Events</h3>
                    <p className="text-xs">You have no upcoming events</p>
                  </div>
                </div>
              </div>
            )}
            {profileState === "membership" && (
              <HorizontalCard width="w-[70vw] max-w-[80rem] h-full">
                <h1 className="text-2xl">Welcome, {session?.user.name}</h1>
                Member Info:
              </HorizontalCard>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
