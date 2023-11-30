import { Paper } from "@mui/material";
import DashboardTitle from "../../../components/DashboardTitle";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { MdDateRange, MdEmail, MdPerson } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaClock, FaHospital, FaMessage, FaPlus } from "react-icons/fa6";
import { BiSolidEditLocation } from "react-icons/bi";
import { toast } from "sonner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo";

const UpdateDonationRequest = () => {
  const currentData = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [userInfo] = useUserInfo();
  console.log(userInfo);

  const onSubmit = (data) => {
    if (data.recipient_district === "default") {
      toast.error("Please select district");
      return;
    }

    if (data.recipient_upazilla === "default") {
      toast.error("Please choose upazilla");
      return;
    }

    axiosSecure
      .put(`/donation-requests/update/${currentData._id}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          reset();
          toast.success("Request Updated. Redirecting...");
          setTimeout(() => navigate(-1), 2000);
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>BloodBridge | Update Request</title>
      </Helmet>
      <DashboardTitle title={"Create Donation Request"}></DashboardTitle>
      <Paper sx={{ padding: 3 }}>
        {userInfo.role === "volunteer" ? (
          <>
            <h1 className="font-heading max-w-xl font-bold text-2xl text-primary text-center mx-auto py-24">
              A volunteer cannot edit/delete requests.
            </h1>
          </>
        ) : (
          <>
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
                      defaultValue={currentData.requester_name}
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
                      defaultValue={currentData.requester_email}
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
                      defaultValue={currentData.requester_message}
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
                      defaultValue={currentData.recipient_name}
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
                      defaultValue={currentData.hospital_name}
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
                      defaultValue={currentData.address}
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
                      defaultValue={currentData.recipient_district}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      required
                    >
                      <option disabled value={"default"}>
                        Select District
                      </option>
                      <option value="Comilla">Comilla</option>
                      <option value="Feni">Feni</option>
                      <option value="Brahmanbaria">Brahmanbaria</option>
                      <option value="Rangamati">Rangamati</option>
                      <option value="Noakhali">Noakhali</option>
                      <option value="Chandpur">Chandpur</option>
                      <option value="Lakshmipur">Lakshmipur</option>
                      <option value="Chattogram">Chattogram</option>
                      <option value="Coxsbazar">Coxsbazar</option>
                      <option value="Khagrachhari">Khagrachhari</option>
                      <option value="Bandarban">Bandarban</option>
                      <option value="Sirajganj">Sirajganj</option>
                      <option value="Pabna">Pabna</option>
                      <option value="Bogura">Bogura</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Natore">Natore</option>
                      <option value="Joypurhat">Joypurhat</option>
                      <option value="Chapainawabganj">Chapainawabganj</option>
                      <option value="Naogaon">Naogaon</option>
                      <option value="Jashore">Jashore</option>
                      <option value="Satkhira">Satkhira</option>
                      <option value="Meherpur">Meherpur</option>
                    </select>
                  </div>
                  {/* UPAZILLA */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Upazila
                    </label>
                    <select
                      defaultValue={currentData.recipient_upazilla}
                      {...register("recipient_upazilla", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                      required
                    >
                      <option disabled value={"default"}>
                        Select Upazilla
                      </option>
                      <option value="Debidwar">Debidwar</option>
                      <option value="Barura">Barura</option>
                      <option value="Brahmanpara">Brahmanpara</option>
                      <option value="Chandina">Chandina</option>
                      <option value="Chauddagram">Chauddagram</option>
                      <option value="Daudkandi">Daudkandi</option>
                      <option value="Homna">Homna</option>
                      <option value="Laksam">Laksam</option>
                      <option value="Muradnagar">Muradnagar</option>
                      <option value="Nangalkot">Nangalkot</option>
                      <option value="Comilla Sadar">Comilla Sadar</option>
                      <option value="Meghna">Meghna</option>
                      <option value="Monohargonj">Monohargonj</option>
                      <option value="Sadarsouth">Sadarsouth</option>
                      <option value="Titas">Titas</option>
                      <option value="Burichang">Burichang</option>
                      <option value="Lalmai">Lalmai</option>
                      <option value="Chhagalnaiya">Chhagalnaiya</option>
                      <option value="Feni Sadar">Feni Sadar</option>
                      <option value="Sonagazi">Sonagazi</option>
                      <option value="Fulgazi">Fulgazi</option>
                      <option value="Parshuram">Parshuram</option>
                      <option value="Daganbhuiyan">Daganbhuiyan</option>
                      <option value="Brahmanbaria Sadar">
                        Brahmanbaria Sadar
                      </option>
                      <option value="Kasba">Kasba</option>
                      <option value="Nasirnagar">Nasirnagar</option>
                      <option value="Sarail">Sarail</option>
                      <option value="Ashuganj">Ashuganj</option>
                      <option value="Akhaura">Akhaura</option>
                      <option value="Nabinagar">Nabinagar</option>
                      <option value="Bancharampur">Bancharampur</option>
                      <option value="Bijoynagar">Bijoynagar</option>
                      <option value="Rangamati Sadar">Rangamati Sadar</option>
                      <option value="Kaptai">Kaptai</option>
                      <option value="Kawkhali">Kawkhali</option>
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
                        defaultValue={currentData.request_date}
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
                        defaultValue={currentData.request_time}
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
                    <FaPlus></FaPlus>Update
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </Paper>
    </>
  );
};

export default UpdateDonationRequest;
