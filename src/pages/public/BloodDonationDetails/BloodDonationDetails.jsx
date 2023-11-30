import { useLoaderData, useNavigate } from "react-router-dom";
import { MdEmail, MdInfo, MdMail, MdMessage, MdPerson } from "react-icons/md";
import { BiLocationPlus, BiTime } from "react-icons/bi";
import { Helmet } from "react-helmet-async";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import useUserInfo from "../../../hooks/useUserInfo";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "sonner";
const BloodDonationDetails = () => {
  const navigate = useNavigate();

  const req = useLoaderData();
  const [userInfo] = useUserInfo();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 310,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };
  const axiosSecure = useAxiosSecure();
  const handleDonation = () => {
    if (req.request_status !== "pending") {
      toast.error("Donation already in progress");
    }
    const updatedDonation = {
      donor_name: userInfo.name,
      donor_email: userInfo.email,
    };

    axiosSecure
      .put(`/donation-requests/inprogress/${req._id}`, updatedDonation, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Donation Request Accepted");
          setTimeout(() => navigate(-1), 2000);
        } else {
          toast.error("Donation already in progress");
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>BloodBridge | Request Details</title>
      </Helmet>
      <div className="custom-min-height">
        <hr className="my-3" />
        <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4 text-center">
          <span className="text-primary">Blood</span> Donation Request
        </h3>
        <hr className="my-3" />
        <div
          className="flex flex-col border border-gray-500 text-text font-heading h-full bg-background shadow-xl p-4 rounded-xl max-w-2xl mx-auto"
          data-aos="fade-up"
        >
          <div className="flex justify-between">
            <h1 className="font-bold text-base md:text-xl flex items-center gap-2">
              <MdPerson className="text-primary"></MdPerson>{" "}
              {req.requester_name}
            </h1>
            <span className="badge badge-sm border-none uppercase text-white bg-primary font-bold">
              {req.request_status}
            </span>
          </div>
          <span className="text-gray-700 font-medium text-sm flex items-center gap-2">
            <MdMail className="text-secondary text-base md:text-xl"></MdMail>{" "}
            {req.requester_email}
          </span>
          <hr className="my-1" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p className="flex items-center gap-2">
              <BiTime className="text-secondary"></BiTime> {req.request_date} |{" "}
              {req.request_time}
            </p>
            <div className="flex justify-between items-center">
              <h1 className="text-sm font-bold flex items-center gap-2">
                <BiLocationPlus className="text-primary"></BiLocationPlus>{" "}
                {req.recipient_district}, {req.recipient_upazilla}
              </h1>
            </div>
          </div>
          <hr className="my-1" />
          <div className="text-sm text-gray-600 font-semibold flex items-start gap-2 mt-1">
            <MdMessage className="text-primary mt-1"></MdMessage>
            <p className="flex-1 max-w-md">{req.requester_message}</p>
          </div>

          <h1 className="font-bold text-base md:text-xl  flex items-center gap-2 mt-4">
            <MdInfo className="text-accent"></MdInfo> Recipient Information
          </h1>
          <hr className="my-1" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm md:text-base">
            <p>
              <span className="font-bold">Recipient Name: </span>
              {req.recipient_name}
            </p>
            <p>
              <span className="font-bold">Hospital Name: </span>
              {req.hospital_name}
            </p>
            <p>
              <span className="font-bold">Address: </span>
              {req.address}
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleOpen}
              disabled={req.request_status !== "pending" ? "disabled" : ""}
              className="btn text-white bg-secondary hover:bg-secondary hover:shadow-xl"
            >
              Donate
            </button>
          </div>
        </div>
      </div>
      {/* MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center font-heading text-primary font-bold">
            Confirm Donation
          </h1>
          <hr className="my-1" />
          <div className="grid grid-cols-1 gap-x-6">
            {/* EMAIL INPUT */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="relative mb-3">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <MdEmail />
                </div>
                <input
                  type="text"
                  className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                  placeholder="Your Email"
                  defaultValue={userInfo.email}
                  readOnly
                ></input>
              </div>
            </div>
            {/* NAME INPUT */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <IoPersonSharp />
                </div>
                <input
                  type="text"
                  className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                  placeholder="Your Name"
                  defaultValue={userInfo.name}
                  required
                  readOnly
                ></input>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleDonation()}
            className="btn text-white bg-primary hover:bg-primary hover:shadow-xl w-full"
          >
            Donate
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default BloodDonationDetails;
