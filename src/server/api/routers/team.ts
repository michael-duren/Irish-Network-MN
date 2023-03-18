import { createTRPCRouter, publicProcedure } from "../trpc";

export const teamRouter = createTRPCRouter({
  getTeam: publicProcedure.query(async ({ ctx: { prisma } }) => {
    return await prisma.team.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }),
});
