import slugify from "slugify";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { writeEventSchema } from "../../../components/WriteEventForm";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

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
            date: date,
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
  getEvents: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const events = await prisma?.event.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return events;
  }),
});
