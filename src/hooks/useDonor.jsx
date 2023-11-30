import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDonor = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isDonor, isPending: isDonorLoading } = useQuery({
    queryKey: [user?.email, "isDonor"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/donor/${user.email}`);
      return res.data?.isDonor;
    },
  });
  return [isDonor, isDonorLoading];
};

export default useDonor;
