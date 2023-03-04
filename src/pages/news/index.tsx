import { useState } from "react";

import Banner from "../../components/Banner";
import NewsCard from "../../components/Cards/NewsCard";
import { api } from "../../utils/api";

const News = () => {
  const [postMenu, setPostMenu] = useState<"recent" | "all">("recent");
  const newsPosts = api.news.getAllNewsPosts.useQuery();
  const newsPostsData = newsPosts.data;

  return (
    <section>
      <Banner left="left-[75%]" imagePath="/images/news.jpg" title="News" />
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
          <div className="mx-16  flex flex-col  xl:grid xl:grid-cols-4">
            {newsPostsData &&
              newsPostsData.map((post) => {
                return (
                  <div className="lg:col-span-2" key={post.title}>
                    <NewsCard post={post} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
