import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import nodemailer from "nodemailer";
import { writeContactSchema } from "../../../components/Forms/ContactForm/";
import { env } from "../../../env/server.mjs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.APP_GMAIL_EMAIL,
    pass: env.APP_GMAIL_PASSWORD,
  },
});

export const emailRouter = createTRPCRouter({
  emailContactForm: publicProcedure
    .input(writeContactSchema)
    .mutation(async ({ input: { name, email, title, message } }) => {
      const mailOptions = {
        from: "noreply@irishnetworkmn.org",
        to: "info@irishnetworkmn.org",
        subject: `[Irish Network MN: ContactForm]: ${title}`,
        html: `${name} at ${email} sent the following message: <br><br> ${message}`,
      };
      await transporter.sendMail(mailOptions);
    }),
  deleteUserAccount: protectedProcedure.mutation(async ({ ctx: { session } }) => {
    const mailOptions = {
      from: "noreply@irishnetworkmn.org",
      to: `${session.user.email!}`,
      subject: `${session.user.name!}'s Irish Network account has been deleted`,
      html: `This is an email an automated email verifying ${session.user
        .name!}'s account has been deleted. <br>`,
    };
    await transporter.sendMail(mailOptions);
  }),
});
