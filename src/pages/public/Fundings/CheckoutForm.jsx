import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = ({ refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [transId, setTransId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [amount, setAmount] = useState(20);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: amount })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymousm",
          },
        },
      });

    if (confirmError) {
      toast.error(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransId(paymentIntent.id);

        const payment = {
          email: user.email,
          transationId: paymentIntent.id,
          amount: amount,
          date: new Date(),
        };
        const res = await axiosSecure.post("/fundings", payment);
        if (res.data?.insertedId) {
          refetch();
          toast.success(
            `Success! Your transaction id is ${payment.transationId}`
          );
        }
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-background border-green-700 border-2 p-4 shadow-xl rounded-xl font-heading"
      >
        <h1 className="text-center font-bold ">Fund Our Organization!</h1>
        <hr />
        <div className="flex justify-center">
          <select
            value={amount}
            onChange={(e) => {
              setAmount(parseInt(e.target.value));
            }}
            className="input hover:outline-none bg-secondary text-white font-bold my-4 focus:outline-none"
            required
          >
            <option value="10"> $10 </option>
            <option value="20"> $20 </option>
            <option value="50"> $50 </option>
            <option value="100"> $100 </option>
            {/* Add more options as needed */}
          </select>
        </div>
        <hr className="mb-4" />
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn bg-green-700 text-white font-bold w-full mt-4 hover:bg-green-800"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
