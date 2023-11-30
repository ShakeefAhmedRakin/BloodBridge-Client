import { useState, useEffect } from "react";
import useDonationRequests from "../../../hooks/useDonationRequests.jsx";
import { FaRegUser } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminVolDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [donationRequests, isLoading] = useDonationRequests();
  const [userCount, setUserCount] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/stats/user/count").then((res) => {
      setLoading(false);
      setUserCount(res.data.count);
    });
  }, [axiosSecure]);

  return (
    <>
      {isLoading || loading ? (
        <>
          <div className="flex justify-center items-center py-20 w-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 text-white font-heading p-5">
            <div className="bg-[#D45052] py-10 flex justify-around items-center rounded-lg shadow-xl">
              <FaWpforms className="text-5xl"></FaWpforms>
              <div className="text-right">
                <p className="text-3xl font-bold">{donationRequests.length}</p>
                <p>Donation Requests</p>
              </div>
            </div>
            <div className="bg-[#02BCE9] py-10 flex justify-around items-center rounded-lg shadow-xl">
              <FaRegUser className="text-5xl"></FaRegUser>
              <div className="text-right">
                <p className="text-3xl font-bold">{userCount}</p>
                <p>Total Users</p>
              </div>
            </div>
            <div className="bg-[#00A157] py-10 flex justify-around items-center rounded-lg shadow-xl">
              <RiRefund2Line className="text-6xl"></RiRefund2Line>
              <div className="text-right">
                <p className="text-3xl font-bold">{donationRequests.length}</p>
                <p>Funding</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminVolDashboard;
