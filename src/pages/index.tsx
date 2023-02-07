import { type NextPage } from "next";
import Head from "next/head";

import Banner from "../components/Banner";
import WelcomeCards from "../components/WelcomeCards";

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
      <section className="relative ">
        <Banner imagePath="/images/bag-pipes.jpg" title="Welcome" />

        <WelcomeCards />
      </section>
    </>
  );
};

export default Home;
