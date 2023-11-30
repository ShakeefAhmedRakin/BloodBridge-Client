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
      <div className="my-12">
        <Banner></Banner>
      </div>
      <div className="my-12">
        <Featured></Featured>
      </div>
      <div className="my-12">
        <ContactUs></ContactUs>
      </div>
    </>
  );
};

export default Home;
