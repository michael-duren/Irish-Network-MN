import { useState } from "react";
import { useSession } from "next-auth/react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import AuthHeader from "../../../../components/AuthHeader";
import SideNav from "../../../../components/SideNav";
import WriteEventForm from "../../../../components/WriteEventForm";

const AdminConsoleEvents = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { data: session } = useSession({ required: true });
  if (session?.user.role === "admin" && session.user) {
    return (
      <>
        <section>
          <AuthHeader />
          <div className="flex">
            <SideNav />
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
