import { prisma } from "../db";
import type {
  GetServerSidePropsContext,
  GetServerSideProps,
  GetServerSidePropsResult,
} from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const requireAdmin =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    if (!session) {
      return {
        redirect: {
          destination: "/login", // login path
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

export type TPipeGetServerSideProps = (
  ctx: GetServerSidePropsContext,
  input: { props: Promise<any> | any }
) => Promise<GetServerSidePropsResult<any>> | GetServerSidePropsResult<any>;

export const pipe =
  (...fns: TPipeGetServerSideProps[]) =>
  async (ctx: GetServerSidePropsContext) => {
    let res: GetServerSidePropsResult<any> = {
      props: {},
    };

    for await (const fn of fns) {
      res = await fn(ctx, res);

      // it means we have notFound or redirect.
      // We need to break our pipe and reutn this immediately
      if (!("props" in res)) {
        break;
      }
    }

    return res;
  };
