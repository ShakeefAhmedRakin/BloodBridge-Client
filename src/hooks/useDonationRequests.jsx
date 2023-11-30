import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDonationRequests = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: donationRequests = {},
    isLoading: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["don-req"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/donation-requests`);
      return res.data;
    },
  });

  return [donationRequests, isLoading, refetch];
};

export default useDonationRequests;
