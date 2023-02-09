import slugify from "slugify";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const writeEventSchema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(10),
  description: z.string().min(20),
  time: z.string(),
  date: z.date(),
  address: z.string(),
  location: z.string(),
  additionalInformation: z.string().or(z.null()),
  featuredImage: z.string().or(z.null()),
  price: z.number(),
  ticketLink: z.string(),
  register: z.boolean(),
});

export const eventRouter = createTRPCRouter({
  createEvent: publicProcedure
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
          time,
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
            date,
            time,
            description,
            address,
            location,
            additionalInformation,
            featuredImage,
            price: isNaN(price) ? 0 : price,
            ticketLink,
            register,
            slug: slugify(title),
          },
        });
      }
    ),
  getEvents: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const events = await prisma?.event.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return events;
  }),
});
