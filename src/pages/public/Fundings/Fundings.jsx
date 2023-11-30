import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
import { MdEmail } from "react-icons/md";

const Fundings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: fundings = [], refetch } = useQuery({
    queryKey: ["fundings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/fundings`);
      return res.data;
    },
  });

  return (
    <>
      <div className="custom-min-height">
        <Helmet>
          <title>BloodBridge | Fundings</title>
        </Helmet>
        <hr className="my-3" />
        <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4 text-center">
          Fundings
        </h3>
        <hr className="my-3" />
        <Elements stripe={stripePromise}>
          <CheckoutForm refetch={refetch}></CheckoutForm>
        </Elements>
        <hr className="my-3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-10">
          {fundings.map((funding) => (
            <div
              key={funding._id}
              className="bg-background rounded-xl shadow-xl border-green-700 border-2 font-heading p-5"
            >
              <div className="flex justify-between flex-col md:flex-row">
                <h1 className="font-bold flex items-center gap-1">
                  <MdEmail className="text-xl text-green-700"></MdEmail>
                  {funding.email}
                </h1>
                <p className="text-sm">{funding.date}</p>
              </div>
              <hr className="my-1" />
              <p className="flex items-center text-green-700 text-xl gap-1 font-bold">
                ${funding.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Fundings;
