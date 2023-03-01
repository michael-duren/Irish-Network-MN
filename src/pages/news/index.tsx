import Banner from "../../components/Banner";
import NewsCard from "../../components/Cards/NewsCard";

const News = () => {
  return (
    <section>
      <Banner left="left-[75%]" imagePath="/images/news.jpg" title="News" />
      <div className=""></div>
      <NewsCard />
    </section>
  );
};

export default News;
