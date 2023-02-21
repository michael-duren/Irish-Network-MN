import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";

export const userRouter = createTRPCRouter({
  updateEmail: protectedProcedure
    .input(z.object({ userId: z.string(), newEmail: z.string().email() }))
    .mutation(async ({ ctx: { prisma }, input: { userId, newEmail } }) => {
      await prisma.user.update({
        where: { id: userId },
        data: {
          email: newEmail,
        },
      });
    }),
  deleteAccount: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx: { prisma }, input: { userId } }) => {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    }),
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
