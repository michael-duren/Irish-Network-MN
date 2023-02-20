import type { Session } from "next-auth";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

type AccountProps = {
  session: Session;
};

const Account = ({ session }: AccountProps) => {
  return (
    <div className=" flex flex-col rounded-3xl text-gray-900  lg:flex-row">
      <div className="mx-4  flex h-full min-h-[30rem] w-[30vw] min-w-[20rem] max-w-[80rem] flex-col items-center justify-around rounded-3xl   bg-white p-8 shadow-xl transition-all duration-300 ">
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full  bg-slate-300">
          <BsFillPersonFill className="text-slate-700" size={100} />
        </div>
        <div className="space-y-4 text-center">
          <h1 className="text-2xl">{session?.user.name}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <AiOutlineMail /> <p>{session.user.email}</p>
          </div>
        </div>
      </div>
      {/* aside */}
      <div className="flex flex-col justify-evenly">
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
  );
};

export default Account;
