import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../components/DashboardTitle";
import { Box, Modal, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useUserInfo from "../../../hooks/useUserInfo";
import { MdEmail } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "sonner";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const [userInfo, , refetch] = useUserInfo();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const { addUsernamePhoto } = useAuth();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      data["image"] = res.data.data.display_url;
      addUsernamePhoto(data.name, data.image).then(() => {
        axiosSecure
          .put(`/users/update/${userInfo._id}`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.modifiedCount > 0) {
              console.log("REACHED");
              handleClose();
              refetch();
              toast.success("Profile Updated");
              window.location.reload();
            }
          });
      });
    }
  };

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

  return (
    <>
      <Helmet>
        <title>BloodBridge | Profile</title>
      </Helmet>
      <DashboardTitle title={"Profile"}></DashboardTitle>
      <Paper sx={{ padding: 1 }}>
        <CardContent>
          <div className="flex items-center mb-5 gap-3">
            <div className="relative">
              <Avatar
                alt="Remy Sharp"
                src={userInfo.image}
                sx={{ width: 100, height: 100 }}
              />
              <span
                className={`absolute bottom-0 badge font-heading border-0 font-bold uppercase text-white ${
                  userInfo.role === "admin" ? "bg-secondary" : ""
                }${userInfo.role === "donor" ? "bg-purple-600" : ""}${
                  userInfo.role === "volunteer" ? "bg-green-600" : ""
                }`}
                style={{
                  position: "absolute",
                  transform: "translate(-50%, 50%)",
                  left: "50%",
                }}
              >
                {userInfo.role}
              </span>
            </div>
            <div>
              <Typography variant="h5" component="div">
                <span className="font-heading font-bold">{userInfo.name}</span>
              </Typography>
              <Typography color="textSecondary">
                <span className="font-heading font-bold">{userInfo.email}</span>
              </Typography>
            </div>
          </div>
          <hr />
          <div className="flex gap-2 mt-1 mb-1">
            <span className="font-heading font-bold">Blood Group:</span>

            <span className="font-heading text-lg">{userInfo.blood_group}</span>
          </div>
          <div className="flex gap-2 mb-1">
            <span className="font-heading font-bold">Address:</span>

            <span className="font-heading text-">
              {userInfo.district}, {userInfo.upazilla}
            </span>
          </div>
          <button
            onClick={handleOpen}
            className="btn btn-sm mt-2 bg-secondary text-white"
          >
            Change Info
          </button>
        </CardContent>
      </Paper>

      {/* MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            className="bg-background rounded-xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* EMAIL + NAME */}
            <div className="grid grid-cols-1 gap-x-6">
              {/* EMAIL INPUT */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <div className="relative mb-6">
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
                    {...register("name", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                    placeholder="Your Name"
                    defaultValue={userInfo.name}
                    required
                  ></input>
                </div>
              </div>
            </div>

            {/* IMAGE + BLOODGROUP */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              {/* IMAGE INPUT */}
              <div className="w-full flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Profile Picture
                </label>
                <input
                  type="file"
                  {...register("image", { required: true })}
                  className="file-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block"
                  required
                />
                <img
                  src={userInfo.image}
                  className="w-12 rounded-sm mt-2 object-cover aspect-square"
                />
              </div>
              {/* BLOOD GROUP */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Blood Group
                </label>
                <select
                  {...register("blood_group", { required: true })}
                  defaultValue={userInfo.blood_group}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-[14px]"
                  required
                >
                  <option disabled value={"default"}>
                    Select Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            {/* DISTRICT + UPAZILLA */}
            <div className="grid grid-cols-2 gap-x-2 md:gap-x-6 mb-6">
              {/* DISTRICT */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  District
                </label>
                <select
                  {...register("district", { required: true })}
                  defaultValue={userInfo.district}
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
                  defaultValue={userInfo.upazilla}
                  {...register("upazilla", { required: true })}
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
                  <option value="Brahmanbaria Sadar">Brahmanbaria Sadar</option>
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
            <button className="btn bg-primary hover:bg-primary hover:shadow-xl text-white w-full">
              Update
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
