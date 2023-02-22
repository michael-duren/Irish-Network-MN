import { prisma } from "../server/db";
import type { GetServerSidePropsContext, GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../server/auth";

export const requireAdmin =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    if (!session) {
      return {
        redirect: {
          destination: "/", // login path
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
          destination: "/", // login path
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
