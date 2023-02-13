import { useSession } from "next-auth/react";

import AuthHeader from "../../../../components/AuthHeader";
import MessageCard from "../../../../components/MessageCard";
import SideNav from "../../../../components/SideNav";
import { api } from "../../../../utils/api";

const AdminConsoleMessages = () => {
  const { data: session } = useSession({ required: true });
  const getMessages = api.contact.getAllMessages.useQuery();
  if (session?.user.role === "admin" && session.user) {
    return (
      <section>
        <AuthHeader />
        <div className="flex">
          <SideNav />

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
  }

  return <p>You are not authorized to view this page!</p>;
};

export default AdminConsoleMessages;
