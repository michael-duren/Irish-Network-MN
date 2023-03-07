import { type NextPage } from "next";
import Head from "next/head";
import GroupBanner from "../components/Carousel/";
// import Banner from "../components/Banner";
import WelcomeCards from "../components/Cards/WelcomeCards";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Irish Network MN</title>
        <meta name="description" content="Irish Network of Minnesota Welcomes you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className=" flex flex-col items-center">
        <div className="m-0 md:mx-8">
          <GroupBanner />
        </div>
        {/*  <Banner
          top="top-[30%]"
          left="left-[10%]"
          imagePath="/images/bag-pipes.jpg"
          title="Welcome"
        /> */}
        <div className="flex w-full flex-col items-center bg-gray-100">
          <WelcomeCards />
        </div>
      </section>
    </>
  );
};

export default Home;
