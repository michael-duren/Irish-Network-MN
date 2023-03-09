import { useSession } from "next-auth/react";
import { AiOutlineMail, AiOutlineLogout } from "react-icons/ai";
import AuthHeader from "../../../../components/Headers/AuthHeader";
import AdminConsoleSideNav from "../../../../components/SideNavs/AdminConsoleSideNav";

import { requireAdmin } from "../../../../utils/ssrHelpers";
import AdminDashboardLongCard from "../../../../components/Cards/AdminDashboard/LongCard";
import { AdminDashboardSmallCard } from "../../../../components/Cards/AdminDashboard/SmallCard";

const AdminConsoleDashboard = () => {
  const { data: session } = useSession();

  return (
    <>
      <section>
        <AuthHeader />
        <div className="flex h-full w-full">
          <AdminConsoleSideNav />
          <div className="m-16 w-full">
            <div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-4 lg:grid-cols-6 lg:grid-rows-2 ">
              <div className="col-span-4 row-span-1 lg:col-span-2 lg:row-span-2">
                <AdminDashboardLongCard session={session} />
              </div>
              <div className="col-span-4 row-span-1 md:col-span-2 md:row-span-1 ">
                <AdminDashboardSmallCard
                  buttonTitle={"Add Post"}
                  onClick={() => console.log("clicked")}
                  title={`Create a News Post`}
                >
                  <p>Got something to say? Add a new Post.</p>
                </AdminDashboardSmallCard>
              </div>
              <div className="col-span-4 row-span-1 md:col-span-2">
                <AdminDashboardSmallCard
                  buttonTitle={"Create Event"}
                  onClick={() => console.log("clicked")}
                  title={`Add an Event`}
                >
                  <p>Got your details ready? Create a new Event!</p>
                </AdminDashboardSmallCard>
              </div>
              <div className="col-span-4 row-span-1 md:col-span-2">
                <AdminDashboardSmallCard
                  buttonTitle={"Check Messages"}
                  onClick={() => console.log("clicked")}
                  title={`Messages`}
                >
                  <div className="placeholder avatar h-full w-full pt-8 ">
                    <div className=" w-36 rounded-full bg-secondary-color/30">
                      <AiOutlineMail size={80} />
                    </div>
                  </div>
                </AdminDashboardSmallCard>
              </div>
              <div className="col-span-4 row-span-1 md:col-span-2">
                <AdminDashboardSmallCard
                  buttonTitle={"Logout"}
                  onClick={() => console.log("clicked")}
                  title={`Logout`}
                >
                  All done for the day?
                </AdminDashboardSmallCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminConsoleDashboard;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAdmin(async () => {
  return { props: {} };
});
