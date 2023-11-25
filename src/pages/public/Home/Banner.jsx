import { GrSearch } from "react-icons/gr";
import { MdOutlineBloodtype } from "react-icons/md";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        {/* CONTENT */}
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
            Welcome to BloodBridge<hr className="my-1"></hr>Bridging Lives
            through <span className="text-primary">Blood</span> Donation
          </h3>
          <p className="text-sm md:text-lg font-heading text-gray-600 mb-6 md:mb-10">
            Connecting generous donors with individuals in urgent need of blood.
            Step onto the bridge of hope and compassion, where every drop counts
            toward a healthier, brighter future.
          </p>
          <div className="flex flex-col md:flex-row gap-x-4 gap-y-2">
            <button className="btn bg-accent hover:bg-accent hover:shadow-xl">
              Search Donors <GrSearch className="text-lg"></GrSearch>
            </button>
            <Link to={"/register"}>
              <button className="btn bg-primary hover:bg-primary text-white hover:shadow-xl">
                Donate Today
                <MdOutlineBloodtype className="text-2xl"></MdOutlineBloodtype>
              </button>
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="flex-1">
          <img
            src="/src/assets/banner/healthy-man-donating-his-blood.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
