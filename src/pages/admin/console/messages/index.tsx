import AuthHeader from "../../../../components/Headers/AuthHeader";
import MessageCard from "../../../../components/Cards/MessageCard";
import AdminConsoleSideNav from "../../../../components/SideNavs/AdminConsoleSideNav";
import { api } from "../../../../utils/api";
import { requireAdmin } from "../../../../utils/ssrHelpers";

const AdminConsoleMessages = () => {
  const getMessages = api.contact.getAllMessages.useQuery();

  return (
    <section>
      <AuthHeader />
      <div className="flex">
        <AdminConsoleSideNav />

        <div className="m-6 flex w-full flex-col">
          <div className="mb-8 flex items-center justify-center">
            <h2 className="text-2xl underline">Messages:</h2>
          </div>
          <div className="flex flex-col items-center">
            {getMessages.isSuccess &&
              getMessages.data.map((message) => {
                return <MessageCard key={message.id} message={message} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminConsoleMessages;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAdmin(async () => {
  return { props: {} };
});
