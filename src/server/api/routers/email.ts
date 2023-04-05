import { createTRPCRouter, publicProcedure } from "../trpc";
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
      let mailOptions = {
        from: "noreply@irishnetworkmn.org",
        to: "info@irishnetworkmn.org",
        subject: `[Irish Network MN: ContactForm]: ${title}`,
        html: `${name} at ${email} sent the following message: \n\n ${message}`,
      };
      transporter.sendMail(mailOptions);
    }),
});
