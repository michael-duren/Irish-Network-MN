import { createTRPCRouter } from "./trpc";
import { eventRouter } from "./routers/event";
import { contactRouter } from "./routers/contact";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  contact: contactRouter,
  event: eventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
