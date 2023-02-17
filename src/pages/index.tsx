import { type NextPage } from "next";
import Head from "next/head";

import Banner from "../components/Banner";
import WelcomeCards from "../components/Cards/WelcomeCards";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Irish Network MN</title>
        <meta
          name="description"
          content="Irish Network of Minnesota Welcomes you"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="relative">
        <Banner
          top="top-[30%]"
          left="left-[10%]"
          imagePath="/images/bag-pipes.jpg"
          title="Welcome"
        />
        <div className="md:absolute md:top-60">
          <WelcomeCards />
        </div>
      </section>
    </>
  );
};

export default Home;
