import { useState } from "react";
import { useSession } from "next-auth/react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import AuthHeader from "../../../../components/Headers/AuthHeader";
import AdminConsoleSideNav from "../../../../components/SideNavs/AdminConsoleSideNav";
import WriteEventForm from "../../../../components/Forms/WriteEventForm";
import { api } from "../../../../utils/api";
import AdminEventPreviewCard from "../../../../components/Cards/AdminEventPreviewCard";

const AdminConsoleEvents = () => {
  const [isOpen, setIsOpen] = useState(false);
  const getEvents = api.event.getEvents.useQuery();
  const eventRoute = api.useContext().event;
  const invalidateCurrentEvents = async () => {
    await eventRoute.getEvents.invalidate();
  };

  const { data: session } = useSession({ required: true });
  if (session?.user.role === "admin" && session.user) {
    return (
      <>
        <section>
          <AuthHeader />
          <div className="flex">
            <AdminConsoleSideNav />
            <div className="m-6 flex w-full flex-col">
              <div className="flex items-center justify-center">
                <h2 className="text-2xl underline">Events:</h2>
                <div className="flex w-full flex-1 justify-end">
                  <button
                    className="flex items-center rounded-lg border-2 border-gray-500 py-4 px-4 text-gray-500 hover:border-gray-700 hover:text-gray-800"
                    onClick={() => setIsOpen(true)}
                  >
                    <div>Add Event</div>
                    <div className="pl-2">
                      <AiOutlinePlusCircle className="text-lg" />
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                {getEvents.isSuccess &&
                  getEvents.data.map((event) => {
                    return (
                      <AdminEventPreviewCard
                        invalidate={invalidateCurrentEvents}
                        key={event.title}
                        event={event}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
        <WriteEventForm isOpen={isOpen} closeModal={setIsOpen} />
      </>
    );
  }

  return <p>You are not authorized to view this page!</p>;
};

export default AdminConsoleEvents;
