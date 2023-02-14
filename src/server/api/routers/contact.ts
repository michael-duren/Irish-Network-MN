import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { writeContactSchema } from "../../../components/Forms/ContactForm";

export const contactRouter = createTRPCRouter({
  postMessage: publicProcedure
    .input(writeContactSchema)
    .mutation(
      async ({ ctx: { prisma }, input: { name, email, message, title } }) => {
        await prisma.contact.create({
          data: {
            name,
            email,
            message,
            title,
          },
        });
      }
    ),
  getAllMessages: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    const allMessages = await prisma.contact.findMany();
    return allMessages;
  }),
});
