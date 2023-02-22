import AuthHeader from "../../../../components/Headers/AuthHeader";
import AdminConsoleSideNav from "../../../../components/SideNavs/AdminConsoleSideNav";

import { requireAdmin } from "../../../../utils/ssrHelpers";

const AdminConsoleDashboard = () => {
  return (
    <>
      <section>
        <AuthHeader />
        <AdminConsoleSideNav />

        <p>Edit events and image galery</p>
        <button>Add event</button>
      </section>
    </>
  );
};

export default AdminConsoleDashboard;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAdmin(async () => {
  return { props: {} };
});
