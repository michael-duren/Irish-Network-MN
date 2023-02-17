import HorizontalCard from "../HorizontalCard";

const WelcomeCards = () => {
  return (
    <div className="mx-4 my-16  flex h-full flex-1 flex-col flex-wrap items-center justify-center md:flex-row md:justify-center ">
      <HorizontalCard width="md:w-[40rem]  md:h-[30rem]">
        <h2 className="mb-4  border-b border-gray-300 p-4 text-2xl">
          Irish Network <span className="text-red-600">MN</span>
        </h2>
        <p className="">
          Irish Network Minnesota (IN-MN) is a business, social, and cultural
          network for friends of Ireland. Irrespective of whether you are Irish,
          Irish-American or non-Irish in Minnesota, discover and enjoy a Celtic
          spirit in the land of 10,000 lakes. IN-MN joins a growing national
          network in the United States of 20 plus chapters from New York to San
          Diego under the Irish Network USA umbrella. IN-MN connects its
          membership all over the United States and in Ireland.
          <br /> <br />
          Irish Network Minnesota fosters the creativity, industry, and success
          of Ireland’s diaspora sharing information about social, business and
          cultural events, and much more. The network is for anyone who wishes
          to participate more actively in the Irish community, to connect
          professionally, or just to expand their social scene in Minnesota.
        </p>
      </HorizontalCard>
      <HorizontalCard width="md:w-[40rem]  md:h-[30rem] ">
        <h2 className="mb-4 border-b border-gray-300 p-4 text-2xl">
          Irish Network <span className="text-red-600">USA</span>
        </h2>
        <p className="text-center">
          <a
            target={"_blank"}
            rel="noreferrer"
            className="text-red-400 hover:text-red-700"
            href="https://irishnetwork-usa.org/"
          >
            Irish Network USA (IN-USA)
          </a>{" "}
          is the national umbrella organization integrating the Irish Networks
          that exist in various cities across the United States. It allows
          members of the networks to connect with their peers and to develop
          relationships that will foster success in their business, economic,
          cultural and sports ventures. The mission of IN-USA is to bolster
          business opportunities and economic development between the United
          States and Ireland; to support and encourage Irish Arts and Culture
          through film, literature, theater, dance and language; to encourage
          and promote the mission and expansion of Irish sports, throughout the
          United States; to support the efforts of local Irish organizations and
          associations; to serve as a conduit between newly arrived Irish
          immigrants and their communities in Member cities and states.
        </p>
      </HorizontalCard>
    </div>
  );
};

export default WelcomeCards;
