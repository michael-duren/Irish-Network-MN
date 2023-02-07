import { type NextPage } from "next";
import Banner from "../../components/Banner";
import ContactForm from "../../components/ContactForm";

const Contact: NextPage = () => {
  return (
    <section>
      <Banner imagePath="/images/stools.jpg" title="Get in Touch!" />
      <div className="my-16 flex items-center justify-center">
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
