import Image from "next/image";
import type { Session } from "next-auth";

type AccountProps = {
  session: Session;
  accounts: string | undefined;
};

const Account = ({ session, accounts }: AccountProps) => {
  return (
    <div className=" flex flex-col rounded-3xl  lg:flex-row">
      <div className="mx-4  flex h-full min-h-[30rem] w-[30vw] min-w-[20rem] max-w-[80rem] flex-col items-center justify-around rounded-3xl   bg-white p-8 shadow-xl transition-all duration-300 ">
        {session.user.image && (
          <div className="relative flex h-48 w-48 flex-col items-center">
            <Image
              className=" rounded-full"
              src={session?.user.image}
              alt={"User profile picture"}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
        <h1 className="text-2xl">{session?.user.name}</h1>
        <div className="text-sm text-gray-600">
          <p>Signed in with: {accounts}</p>
          <p>Email: {session.user.email}</p>
        </div>
      </div>
      {/* aside */}
      <div className="flex flex-col">
        <div className="mx-4 flex min-h-[10rem] w-[20vw] min-w-[20rem] flex-col items-center justify-around  rounded-md   bg-white p-8 shadow-xl transition-all duration-300 ">
          <h3>Membership</h3>
        </div>
        <div className="mx-4 mt-4 flex min-h-[10rem] w-[20vw] min-w-[20rem] flex-col items-center justify-around  rounded-md border-2 border-solid   bg-white p-8 shadow-xl transition-all duration-300">
          <h3>Upcoming Events</h3>
          <p className="text-xs">You have no upcoming events</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
