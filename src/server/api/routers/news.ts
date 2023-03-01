import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const newsRouter = createTRPCRouter({
  getNewsPost: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { slug } }) => {
      const newsPost = await prisma.news.findUnique({
        where: { slug },
      });
      return newsPost;
    }),
  getAllNewsPosts: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const allNewsPosts = await prisma.news.findMany();
    return allNewsPosts;
  }),
});
