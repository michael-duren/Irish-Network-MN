import slugify from "slugify";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { writeEventSchema } from "../../../components/Forms/WriteEventForm";
import z from "zod";

export const eventRouter = createTRPCRouter({
  createEvent: protectedProcedure
    .input(writeEventSchema)
    .mutation(
      async ({
        ctx: { prisma },
        input: {
          title,
          excerpt,
          description,
          address,
          location,
          additionalInformation,
          featuredImage,
          price,
          ticketLink,
          register,
          date,
        },
      }) => {
        const oldEvent = await prisma.event.findUnique({
          where: {
            title: title,
          },
        });

        if (oldEvent) {
          return;
        }

        await prisma.event.create({
          data: {
            title,
            excerpt,
            date: new Date(date),
            description,
            address,
            location,
            additionalInformation,
            featuredImage,
            price: isNaN(+price) ? 0 : +price,
            ticketLink,
            register,
            slug: slugify(title),
          },
        });
      }
    ),
  deleteEvent: protectedProcedure
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

  getEvents: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const events = await prisma?.event.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return events;
  }),
});
