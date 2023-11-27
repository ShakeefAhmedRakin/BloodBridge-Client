import { Paper } from "@mui/material";
import DashboardTitle from "../../../components/DashboardTitle";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { MdDateRange, MdEmail, MdPerson } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaClock, FaHospital, FaMessage, FaPlus } from "react-icons/fa6";
import { BiSolidEditLocation } from "react-icons/bi";
import useUserInfo from "../../../hooks/useUserInfo";
import { toast } from "sonner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateDonationRequest = () => {
  const [userInfo, isLoading] = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (data.recipient_district === "default") {
      toast.error("Please select district");
      return;
    }

    if (data.recipient_upazilla === "default") {
      toast.error("Please choose upazilla");
      return;
    }

    data["requester_name"] = userInfo.name;
    data["requester_email"] = userInfo.email;
    data["request_status"] = "pending";

    axiosSecure.post("/donation-requests", data).then((res) => {
      if (res.data.insertedId) {
        reset();
        toast.success("Donation Requested");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>BloodBridge | Create Request</title>
      </Helmet>
      <DashboardTitle title={"Create Donation Request"}></DashboardTitle>
      <Paper sx={{ padding: 3 }}>
        {isLoading ? (
          <>
            <div className="py-4 flex items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          </>
        ) : (
          <>
            {userInfo.status === "blocked" ? (
              <>
                <h1 className="font-heading max-w-xl font-bold text-2xl text-primary text-center mx-auto py-24">
                  You have been blocked from creating donation requests
                </h1>
              </>
            ) : (
              <form
                className="rounded-xl px-5 py-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h1 className="font-heading font-bold underline mb-3">
                  Requester Information
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Requester Name
                    </label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <MdPerson />
                      </div>
                      <input
                        type="text"
                        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                        placeholder="Your Name"
                        required
                        readOnly
                        defaultValue={userInfo.name}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Requester Email
                    </label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <MdEmail />
                      </div>
                      <input
                        type="text"
                        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                        placeholder="Your Email"
                        required
                        readOnly
                        defaultValue={userInfo.email}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Request Message
                    </label>
                    <div className="relative mb-6">
                      <div className="absolute top-4 start-0 flex items-center ps-3.5 pointer-events-none">
                        <FaMessage className="text-sm" />
                      </div>
                      <textarea
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                        placeholder="Requester Message"
                        required
                        {...register("requester_message", { required: true })}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <hr className="mb-4" />
                <h1 className="font-heading font-bold underline mb-3">
                  Recipient Information
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Recipient Name
                    </label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <IoPersonAddSharp className="text-sm" />
                      </div>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                        placeholder="Recipient Name"
                        required
                        {...register("recipient_name", { required: true })}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Hospital Name
                    </label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <FaHospital />
                      </div>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                        placeholder="Hospital Name"
                        required
                        {...register("hospital_name", { required: true })}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Address
                    </label>
                    <div className="relative mb-6">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <BiSolidEditLocation />
                      </div>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                        placeholder="Address"
                        required
                        {...register("address", { required: true })}
                      ></input>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 md:gap-x-6 mb-6">
                    {/* DISTRICT */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        District
                      </label>
                      <select
                        {...register("recipient_district", { required: true })}
                        defaultValue={"default"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        required
                      >
                        <option disabled value={"default"}>
                          Select District
                        </option>
                        <option value="Comilla">Comilla</option>
                        <option value="Feni">Feni</option>
                      </select>
                    </div>
                    {/* UPAZILLA */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Upazila
                      </label>
                      <select
                        defaultValue={"default"}
                        {...register("recipient_upazilla", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                        required
                      >
                        <option disabled value={"default"}>
                          Select Upazilla
                        </option>
                        <option value="Bijoynagar">Bijoynagar</option>
                        <option value="Nabinagar">Nabinagar</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Donation Date
                      </label>
                      <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <MdDateRange />
                        </div>
                        <input
                          type="date"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                          placeholder="Your Name"
                          required
                          {...register("request_date", { required: true })}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Donation Time
                      </label>
                      <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <FaClock />
                        </div>
                        <input
                          type="time"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                          required
                          {...register("request_time", { required: true })}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      className="btn w-full font-heading font-bold bg-accent text-black hover:bg-accent"
                    >
                      <FaPlus></FaPlus>Request
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        )}
      </Paper>
    </>
  );
};

export default CreateDonationRequest;
