import Head from "next/head";
import Banner from "../components/Banner";
import WelcomeCards from "../components/Cards/WelcomeCards";

const Home = () => {
  return (
    <>
      <Head>
        <title>Irish Network MN</title>
        <meta name="description" content="Irish Network of Minnesota Welcomes you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="">
        <Banner imagePath="/images/homepage.png" title="Welcome" />
        <div className="flex w-full flex-col items-center bg-gray-100 pt-8 pb-4">
          <WelcomeCards />
        </div>
      </section>
    </>
  );
};

export default Home;
