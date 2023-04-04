import { createTRPCRouter } from "./trpc";
import { eventRouter } from "./routers/event";
import { contactRouter } from "./routers/contact";
import { userRouter } from "./routers/user";
import { teamRouter } from "./routers/team";
import { newsRouter } from "./routers/news";
import { emailRouter } from "./routers/email";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  contact: contactRouter,
  event: eventRouter,
  team: teamRouter,
  news: newsRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
