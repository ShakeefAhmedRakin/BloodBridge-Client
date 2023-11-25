import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Featured from "./Featured";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>BloodBridge | Home</title>
      </Helmet>
      <div className="my-8">
        <Banner></Banner>
      </div>
      <div className="my-8">
        <Featured></Featured>
      </div>
    </>
  );
};

export default Home;
