import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import AuthHeader from "../../../../components/Headers/AuthHeader";
import AdminConsoleSideNav from "../../../../components/SideNavs/AdminConsoleSideNav";
import { authOptions } from "../../../../server/auth";
import { prisma } from "../../../../server/db";

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
