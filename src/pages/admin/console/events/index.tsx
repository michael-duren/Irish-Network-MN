import { useSession } from "next-auth/react";

import AuthHeader from "../../../../components/AuthHeader";
import SideNav from "../../../../components/SideNav";

const AdminConsoleEvents = () => {
  const { data: session } = useSession({ required: true });
  if (session?.user.role === "admin" && session.user) {
    return (
      <section>
        <AuthHeader />
        <div className="flex">
          <SideNav />
          <div className="m-6 flex flex-col">
            <div className="flex items-center justify-center">
              <h2>Events:</h2>
              <div className="flex w-full flex-1 justify-end">
                <button>Add Event</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <p>You are not authorized to view this page!</p>;
};

export default AdminConsoleEvents;
