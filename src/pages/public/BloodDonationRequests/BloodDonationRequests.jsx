import { BiLocationPlus, BiTime } from "react-icons/bi";
import useDonationRequests from "../../../hooks/useDonationRequests";
import { MdPerson } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const BloodDonationRequests = () => {
  const [donationRequests, isLoading] = useDonationRequests();

  return (
    <div className="custom-min-height">
      <Helmet>
        <title>BloodBridge | Requests</title>
      </Helmet>
      <hr className="my-3" />
      <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4 text-center">
        All Pending
        <span className="text-primary"> Blood</span> Donation Requests
      </h3>
      <hr className="my-3" />

      {isLoading ? (
        <>
          <div className="flex py-44 items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
            {donationRequests
              .filter((donation) => donation.request_status === "pending")
              .map((req) => (
                <div
                  key={req._id}
                  className="flex flex-col border border-gray-500 text-text font-heading h-full bg-background shadow-xl p-4 rounded-xl"
                >
                  <div className="flex justify-between">
                    <h1 className="font-bold text-xl flex items-center gap-2">
                      <MdPerson className="text-primary"></MdPerson>{" "}
                      {req.requester_name}
                    </h1>
                    <span className="badge badge-sm border-none uppercase text-white bg-primary font-bold">
                      {req.request_status}
                    </span>
                  </div>
                  <hr className="my-1" />
                  <p className="flex items-center gap-2">
                    <BiTime className="text-secondary"></BiTime>{" "}
                    {req.request_date} | {req.request_time}
                  </p>

                  <div className="flex justify-between items-center">
                    <h1 className="text-sm font-bold flex items-center gap-2">
                      <BiLocationPlus className="text-primary"></BiLocationPlus>{" "}
                      {req.recipient_district}, {req.recipient_upazilla}
                    </h1>
                    <div>
                      <Link to={`/blood-donation-requests/${req._id}`}>
                        <button className="btn btn-sm text-white bg-secondary hover:bg-secondary hover:shadow-xl">
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BloodDonationRequests;
