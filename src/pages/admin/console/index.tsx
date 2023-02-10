import { type NextPage } from "next";
import Image from "next/image";

import { useSession } from "next-auth/react";
import SideNav from "../../../components/SideNav";

const AdminConsole: NextPage = () => {
  const { data: session } = useSession({ required: true });
  if (session?.user.role === "admin" && session.user) {
    return (
      <section>
        <div className="flex items-center justify-start bg-black p-8 text-gray-200">
          <h2 className="text-2xl">Admin Console</h2>
          <h2 className="w-[20rem]">Irish Network MN</h2>
          <div className="flex w-full items-center justify-end space-x-8">
            <h2>Welcome, {session.user.name}</h2>
            <div className="relative h-20 w-20 rounded-full  bg-slate-300">
              {session.user.image && session.user.name && (
                <Image
                  className="h-auto max-w-[100%] rounded-full"
                  src={session.user.image}
                  alt={session.user.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
          </div>
        </div>
        <SideNav />

        <p>Edit events and image galery</p>
        <button>Add event</button>
      </section>
    );
  }

  return <p>You are not authorized to view this page!</p>;
};

export default AdminConsole;
