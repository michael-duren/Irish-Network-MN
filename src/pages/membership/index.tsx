import { type NextPage } from "next";
import Banner from "../../components/Banner";
import { GoCheck } from "react-icons/go";
import MainButton from "../../components/Buttons/MainButton";

const Membership: NextPage = () => {
  return (
    <section className="bg-gray-800">
      <Banner imagePath="/images/members.jpg" title="Membership Coming Soon!" />
      <div className="mx-8 mt-8 flex-col  items-center justify-center rounded-lg bg-secondary-color/80     ">
        <h2 className="pt-8 text-center text-3xl font-bold">Here's what to expect</h2>
        <div className="flex flex-col items-center justify-center space-y-4 p-16 lg:flex-row lg:space-y-0 lg:space-x-4">
          <div className="card bg-gray-800  text-primary-content shadow-md lg:h-[25rem]  lg:w-[30rem]">
            <div className="card-body space-y-4">
              <h2 className="card-title text-red-400">Standard Membership</h2>
              <p className="flex text-secondary-color/70">
                <GoCheck size={25} className="mr-2" />
                $50/year
              </p>
              <p className="flex text-secondary-color/70">
                <GoCheck size={25} className="mr-2" />
                Discounted events, as well as access to member only events
              </p>
              <p className="flex text-secondary-color/70">
                <GoCheck size={25} className="mr-2" />
                Access a network of Irish professionals in the Twin Cities, network and connect.
              </p>
              <div className="card-actions">
                <MainButton type="button">Coming Soon!</MainButton>
              </div>
            </div>
          </div>
          <div className="card bg-gray-800 text-primary-content lg:h-[25rem]  lg:w-[30rem]">
            <div className="card-body space-y-4">
              <h2 className="card-title text-red-400">Student Membership</h2>
              <p className="flex">
                <GoCheck size={25} className="mr-2" />
                $30/year
              </p>
              <p className="flex">
                <GoCheck size={25} className="mr-2" />
                Discounted events, as well as access to member only events
              </p>
              <p className="flex">
                <GoCheck size={25} className="mr-2" />
                Access a network of Irish professionals in the Twin Cities, network and connect.
              </p>
              <div className="card-actions">
                <MainButton type="button">Coming Soon!</MainButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
