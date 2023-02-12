import { createTRPCRouter, publicProcedure } from "../trpc";
import { writeContactSchema } from "../../../components/ContactForm";

export const contactRouter = createTRPCRouter({
  postContact: publicProcedure
    .input(writeContactSchema)
    .mutation(async ({ ctx: { prisma }, input: { name, email, message } }) => {
      await prisma.contact.create({
        data: {
          name,
          email,
          message,
        },
      });
    }),
});
