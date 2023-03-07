import slugify from "slugify";
import { z } from "zod";
import { writeNewsPostSchema } from "../../../components/Forms/WriteNewsPostForm";
import { createTRPCRouter, protectedAdminProcedure, publicProcedure } from "../trpc";

const LIMIT = 4;

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
  getRecentPosts: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const recentPosts = await prisma.news.findMany({
      orderBy: {
        date: "desc",
      },
      take: LIMIT,
    });
    return recentPosts;
  }),
  getAllNewsPosts: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const allNewsPosts = await prisma.news.findMany({
      orderBy: {
        date: "desc",
      },
    });
    return allNewsPosts;
  }),
  createNewsPost: protectedAdminProcedure
    .input(writeNewsPostSchema)
    .mutation(async ({ ctx: { prisma }, input: { author, title, body, date, featuredImage } }) => {
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
          author,
          body,
          date: dateObject,
          featuredImage,
          slug: slugify(title),
        },
      });
    }),

  deleteNewsPost: protectedAdminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { id } }) => {
      await prisma.event.delete({
        where: { id },
      });
    }),
});
