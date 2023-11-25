import { BiDonateBlood } from "react-icons/bi";
import { GrLogin } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "sonner";

const Login = () => {
  const [seePassword, setSeePassword] = useState(false);
  const { signIn } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Successfully logged in. Redirecting...");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>BloodBridge | Log In</title>
      </Helmet>
      <div className="flex h-screen justify-center items-center">
        <div className="flex items-center bg-secondary h-full w-full md:w-[50%] lg:w-[40%] xl:w-[20%] px-3">
          <div className="font-heading max-w-sm w-full mx-auto">
            <Link to={"/"}>
              <button className="btn w-full mb-6 rounded-xl bg-accent hover:bg-accent border-none font-bold">
                <FaHouse></FaHouse>Go To Home
              </button>
            </Link>
            <form
              className="bg-background rounded-xl px-5 py-8"
              onSubmit={handleLogin}
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
              {/* EMAIL INPUT */}
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <MdEmail />
                </div>
                <input
                  type="text"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                  placeholder="Your Email"
                  required
                ></input>
              </div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <RiLockPasswordFill />
                </div>
                <input
                  type={seePassword ? "text" : "password"}
                  name="password"
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
              <button className="btn bg-primary hover:bg-primary hover:shadow-xl text-white w-full">
                Log In<GrLogin className="text-xl"></GrLogin>
              </button>
              <p className="text-center mt-6 text-xs font-bold">
                {`Don't have an account? `}
                <Link to={"/register"} className="link text-primary">
                  Sign Up Here
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="flex-1 hidden md:flex justify-center">
          <img src="/src/assets/banner/healthy-man-donating-his-blood.png" />
        </div>
      </div>
    </>
  );
};

export default Login;
