import slugify from "slugify";
import { z } from "zod";
import { writeNewsPostSchema } from "../../../components/Forms/WriteNewsPostForm";
import { createTRPCRouter, protectedAdminProcedure, publicProcedure } from "../trpc";

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
  createNewsPost: protectedAdminProcedure
    .input(writeNewsPostSchema)
    .mutation(async ({ ctx: { prisma }, input: { title, body, date, featuredImage } }) => {
      const oldPost = await prisma.news.findUnique({
        where: {
          title,
        },
      });
      if (oldPost) {
        return;
      }
      const dateObject = date ? new Date(date) : new Date();
      await prisma.news.create({
        data: {
          title,
          body,
          date: dateObject,
          featuredImage,
          slug: slugify(title),
        },
      });
    }),
});
