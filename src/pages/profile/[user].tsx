import { useSession } from "next-auth/react";

import HorizontalCard from "../../components/Cards/HorizontalCard";
import ProfileSideNav from "../../components/SideNavs/ProfileSideNav";
import Spinner from "../../components/Spinners";
import { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Account from "../../components/Profile/Account";

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
  user.data?.accounts;
  if (!session?.user) {
    return <Spinner />;
  }
  return (
    <section className="h-full w-full overflow-scroll bg-gradient-to-r from-gray-700 via-gray-900 to-black ">
      <div className="flex  justify-center">
        <div className="items flex flex-col items-start justify-center rounded-2xl p-8 md:flex-row">
          <div className="mr-8">
            <ProfileSideNav
              profileState={profileState}
              setProfileState={setProfileState}
              session={session}
            />
          </div>
          <div className="flex h-full w-full max-w-7xl items-center justify-center rounded-3xl bg-opacity-10 ">
            {profileState === "account" && session.user.name && (
              <Account
                accounts={user.data?.accounts[0]?.provider}
                session={session}
              />
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
