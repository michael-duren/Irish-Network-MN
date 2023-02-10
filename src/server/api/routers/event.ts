import slugify from "slugify";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { writeEventSchema } from "../../../components/WriteEventForm";

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
