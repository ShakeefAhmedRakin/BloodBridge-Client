import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useDonor from "../hooks/useDonor";

const DonorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isDonor, isDonorLoading] = useDonor();
  const location = useLocation();

  if (loading || isDonorLoading) {
    return (
      <>
        <div className="flex justify-center items-center py-20 w-full custom-min-height">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </>
    );
  }

  if (user && isDonor) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

DonorRoute.propTypes = {
  children: PropTypes.node,
};

export default DonorRoute;
