import { useSession } from "next-auth/react";

import AuthHeader from "../../../../components/Headers/AuthHeader";
import AdminConsoleSideNav from "../../../../components/SideNavs/AdminConsoleSideNav";

const AdminConsoleEvents = () => {
  const { data: session } = useSession({ required: true });
  if (session?.user.role === "admin" && session.user) {
    return (
      <section>
        <AuthHeader />
        <AdminConsoleSideNav />

        <p>Edit events and image galery</p>
        <button>Add event</button>
      </section>
    );
  }

  return <p>You are not authorized to view this page!</p>;
};

export default AdminConsoleEvents;
