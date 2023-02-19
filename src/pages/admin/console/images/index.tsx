import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";

import AuthHeader from "../../../../components/Headers/AuthHeader";
import AdminConsoleSideNav from "../../../../components/SideNavs/AdminConsoleSideNav";
import { authOptions } from "../../../../server/auth";
import { prisma } from "../../../../server/db";

const AdminConsoleImage = () => {
  return (
    <section>
      <AuthHeader />
      <AdminConsoleSideNav />

      <p>Edit events and image galery</p>
      <button>Add event</button>
    </section>
  );
};

export default AdminConsoleImage;

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
