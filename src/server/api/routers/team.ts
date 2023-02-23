import {
  createTRPCRouter,
  publicProcedure,
  protectedAdminProcedure,
} from "../trpc";
import z from "zod";

export const teamRouter = createTRPCRouter({
  getTeam: publicProcedure.query(async ({ ctx: { prisma } }) => {
    return await prisma.team.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
});
