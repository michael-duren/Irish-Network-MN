import { useState } from "react";

import Banner from "../../components/Banner";
import NewsPreviewCard from "../../components/Cards/NewsPreviewCard";
import Spinner from "../../components/Spinners/Spinner";
import { api } from "../../utils/api";

const News = () => {
  const [postMenu, setPostMenu] = useState<"recent" | "all">("recent");
  const allPosts = api.news.getAllNewsPosts.useQuery();
  const allPostsData = allPosts.data;
  const recentPosts = api.news.getRecentPosts.useQuery();
  const recentPostsData = recentPosts.data;

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
              {recentPostsData ? (
                recentPostsData.map((post) => {
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
              {allPostsData ? (
                allPostsData.map((post) => {
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
