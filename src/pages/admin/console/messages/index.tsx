import type { GetServerSideProps, GetServerSidePropsContext } from "next";

import AuthHeader from "../../../../components/Headers/AuthHeader";
import MessageCard from "../../../../components/Cards/MessageCard";
import AdminConsoleSideNav from "../../../../components/SideNavs/AdminConsoleSideNav";
import { api } from "../../../../utils/api";

import { getServerSession } from "next-auth";
import { prisma } from "../../../../server/db";
import { authOptions } from "../../../../server/auth";

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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/", //back to home
        permanent: false,
      },
    };
  }

  const result = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (result?.role !== "ADMIN") {
    return {
      redirect: {
        destination: `/`, // again route to home,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
