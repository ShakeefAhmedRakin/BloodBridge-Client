import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Featured from "./Featured";
import ContactUs from "./ContactUs";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>BloodBridge | Home</title>
      </Helmet>
      <div className="my-12" data-aos="fade-up">
        <Banner></Banner>
      </div>
      <div className="my-12" data-aos="fade-up">
        <Featured></Featured>
      </div>
      <div className="my-12" data-aos="fade-up">
        <ContactUs></ContactUs>
      </div>
    </>
  );
};

export default Home;
