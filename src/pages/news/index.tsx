import { useState } from "react";
import type { GetStaticProps } from "next";

import type { News } from "@prisma/client";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { createInnerTRPCContext } from "../../server/api/trpc";
import { appRouter } from "../../server/api/root";
import superjson from "superjson";
import Banner from "../../components/Banner";
import NewsPreviewCard from "../../components/Cards/NewsPreviewCard";
import Spinner from "../../components/Spinners/Spinner";

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  const allPosts: News[] = await ssg.news.getAllNewsPosts.fetch();
  const recentPosts: News[] = await ssg.news.getRecentPosts.fetch();

  const parsedAllPosts: unknown = JSON.parse(JSON.stringify(allPosts));
  const parsedRecentPosts: unknown = JSON.parse(JSON.stringify(recentPosts));

  return {
    props: {
      allPosts: parsedAllPosts,
      recentPosts: parsedRecentPosts,
    },
    revalidate: 10,
  };
};

const News = ({ allPosts, recentPosts }: { allPosts: News[]; recentPosts: News[] }) => {
  const [postMenu, setPostMenu] = useState<"recent" | "all">("recent");

  return (
    <section>
      <Banner left="left-[50%] md:left-[75%]" imagePath="/images/news.jpg" title="News" />
      <div className="my-8">
        <div className="items center m-16 flex flex-col">
          <div className="tabs mb-8">
            <h2
              className={`tab-lifted tab  tab-lg ${postMenu === "recent" ? "tab-active" : ""}`}
              onClick={() => {
                setPostMenu("recent");
              }}
            >
              Recent Posts
            </h2>
            <h2
              className={`tab-lifted tab  tab-lg ${postMenu === "all" ? "tab-active" : ""}`}
              onClick={() => {
                setPostMenu("all");
              }}
            >
              All Posts
            </h2>
          </div>
          {postMenu === "recent" ? (
            <div className="flex flex-col items-center justify-center lg:mx-16 xl:grid xl:grid-cols-4">
              {recentPosts ? (
                recentPosts.map((post) => {
                  return (
                    <div className="lg:col-span-2" key={post.title}>
                      <NewsPreviewCard post={post} />
                    </div>
                  );
                })
              ) : (
                <Spinner />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center lg:mx-16  xl:grid xl:grid-cols-4">
              {allPosts ? (
                allPosts.map((post) => {
                  return (
                    <div className="lg:col-span-2" key={post.title}>
                      <NewsPreviewCard post={post} />
                    </div>
                  );
                })
              ) : (
                <Spinner />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default News;
