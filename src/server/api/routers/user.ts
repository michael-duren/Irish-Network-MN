import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";

export const userRouter = createTRPCRouter({
  getProvider: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx: { prisma }, input: { userId } }) => {
      return await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          accounts: {
            select: {
              provider: true,
            },
          },
        },
      });
    }),
});
