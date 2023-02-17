import { createClient } from "@supabase/supabase-js";
import isDataURI from "validator/lib/isDataURI";
import { decode } from "base64-arraybuffer";
import slugify from "slugify";
import z from "zod";
import { randomUUID } from "crypto";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { writeEventSchema } from "../../../components/Forms/WriteEventForm";
import { env } from "../../../env/server.mjs";
import { TRPCError } from "@trpc/server";

const supabase = createClient(env.SUPABASE_PUBLIC_URL, env.SUPABASE_SECRET_KEY);

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
  getSingleEvent: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { slug } }) => {
      const event = await prisma.event.findUnique({
        where: {
          slug,
        },
      });
      return event;
    }),
  uploadImage: protectedProcedure
    .input(
      z.object({
        imageBase64DataURI: z.string().refine((val: string) => isDataURI(val), {
          message: "Image should be in data URI format",
        }),
      })
    )
    .mutation(async ({ input: { imageBase64DataURI } }) => {
      const imageBase64Str = imageBase64DataURI.replace(/^.+,/, "");

      const { data: uploadedImage, error } = await supabase.storage
        .from("public")
        .upload(`events/${randomUUID()}`, decode(imageBase64Str), {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Something went wrong! ${error.message}`,
        });
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(uploadedImage.path);
      console.log(uploadedImage.path);

      return publicUrl.replace(/images/, "public");
    }),
});
