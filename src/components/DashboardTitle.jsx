import PropTypes from "prop-types";

const DashboardTitle = ({ title }) => {
  return (
    <>
      <h1 className="rounded-t-md text-center uppercase bg-secondary text-white font-heading font-bold text-base lg:text-xl py-1">
        {title}
      </h1>
    </>
  );
};

DashboardTitle.propTypes = {
  title: PropTypes.string,
};

export default DashboardTitle;
