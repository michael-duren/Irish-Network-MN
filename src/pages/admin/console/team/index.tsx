import { useSession } from "next-auth/react";
import AuthHeader from "../../../../components/Headers/AuthHeader";
import AdminConsoleSideNav from "../../../../components/SideNavs/AdminConsoleSideNav";
import { requireAdmin } from "../../../../utils/ssrHelpers";

const AdminConsoleEvents = () => {
  const { data: session } = useSession({ required: true });
  if (session?.user.role === "ADMIN" && session.user) {
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

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAdmin(async () => {
  return { props: {} };
});
