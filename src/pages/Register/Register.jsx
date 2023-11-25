import { BiDonateBlood } from "react-icons/bi";
import { GrLogin } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { IoPersonSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const [seePassword, setSeePassword] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { addUsernamePhoto, createUser, logOut } = useContext(AuthContext);
  const AxiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    // VALIDATIONS
    if (data.blood_group === "default") {
      toast.error("Please select blood group");
      return;
    }
    if (data.district === "default") {
      toast.error("Please select district");
      return;
    }

    if (data.upazilla === "default") {
      toast.error("Please choose upazilla");
      return;
    }

    if (data.password.length < 6) {
      toast.error("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(data.password)) {
      toast.error("Password must have an upper case letter");
      return;
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(data.password)) {
      toast.error("Password must have a special character");
      return;
    }

    if (data.password !== data.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    const imageFile = { image: data.image[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      data["image"] = res.data.data.display_url;
      const user_info = { role: "donor", status: "active", ...data };

      createUser(user_info.email, user_info.password)
        .then(() => {
          addUsernamePhoto(data.name, data.image).then(() => {
            delete user_info.password;
            delete user_info.confirm_password;

            AxiosPublic.post("/users", user_info).then((res) => {
              if (res.data.insertedId) {
                toast.success("Successfully registered. Redirecting...");
                reset();
                logOut().then(() => {
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                });
              }
            });
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>BloodBridge | Sign Up</title>
      </Helmet>
      <div className="flex min-h-screen md:h-screen justify-center items-center">
        <div className="flex py-8 items-center bg-secondary h-full w-full px-3">
          <div className="font-heading max-w-xl w-full mx-auto">
            <Link to={"/"}>
              <button className="btn w-full mb-6 rounded-xl bg-accent hover:bg-accent border-none font-bold">
                <FaHouse></FaHouse>Go To Home
              </button>
            </Link>
            <form
              className="bg-background rounded-xl px-5 py-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-center flex-col items-center gap-2">
                <div className="text-secondary flex items-center gap-1">
                  <BiDonateBlood className="text-3xl text-primary"></BiDonateBlood>
                  <h1 className="font-heading text-xl md:text-3xl font-semibold">
                    BloodBridge
                  </h1>
                </div>
              </div>
              <hr className="my-4" />

              {/* EMAIL + NAME */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                      placeholder="Your Email"
                      required
                      {...register("email", { required: true })}
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
                      required
                    ></input>
                  </div>
                </div>
              </div>

              {/* IMAGE + BLOODGROUP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                </div>
                {/* BLOOD GROUP */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Blood Group
                  </label>
                  <select
                    {...register("blood_group", { required: true })}
                    defaultValue={"default"}
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
                    {...register("upazilla", { required: true })}
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
              {/* PASSWORD + CONFIRM PASSWORD */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <div>
                  {/* PASSWORD INPUT */}
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <RiLockPasswordFill />
                    </div>
                    <input
                      type={seePassword ? "text" : "password"}
                      {...register("password", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                      placeholder="Your Password"
                      required
                    ></input>
                    <button
                      type="button"
                      className="absolute right-3 inset-y-0 text-xl text-gray-600"
                      onClick={() => {
                        setSeePassword(!seePassword);
                      }}
                    >
                      {seePassword ? (
                        <AiFillEyeInvisible></AiFillEyeInvisible>
                      ) : (
                        <AiFillEye></AiFillEye>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  {/* CONFIRM PASSWORD INPUT */}
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm Password
                  </label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <RiLockPasswordFill />
                    </div>
                    <input
                      type="password"
                      {...register("confirm_password", { required: true })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                      placeholder="Confirm Password"
                      required
                    ></input>
                  </div>
                </div>
              </div>
              <button className="btn bg-primary hover:bg-primary hover:shadow-xl text-white w-full">
                Sign Up<GrLogin className="text-xl"></GrLogin>
              </button>
              <p className="text-center mt-6 text-xs font-bold">
                {`Already have an account? `}
                <Link to={"/login"} className="link text-primary">
                  Log In Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
