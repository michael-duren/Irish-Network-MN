import Banner from "../../components/Banner";
import NewsCard from "../../components/Cards/NewsCard";
import { api } from "../../utils/api";

const News = () => {
  const newsPosts = api.news.getAllNewsPosts.useQuery();
  const newsPostsData = newsPosts.data;

  return (
    <section>
      <Banner left="left-[75%]" imagePath="/images/news.jpg" title="News" />
      <div className=""></div>
      <div className="items center m-16 flex flex-col">
        <div className="flex">
          <h2 className="border-b-2 border-b-gray-300 py-4 font-semibold text-gray-700">
            Recent Posts
          </h2>
        </div>
        <div className="my-8 grid grid-cols-4">
          {newsPostsData &&
            newsPostsData.map((post) => {
              return (
                <div className="col-span-2" key={post.title}>
                  <NewsCard post={post} />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default News;
