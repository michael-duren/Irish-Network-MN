import { type NextPage } from "next";
import Banner from "../../components/Banner";

const About: NextPage = () => {
  return (
    <section>
      <Banner imagePath="/images/train.jpg" title="About Us" />
    </section>
  );
};

export default About;
