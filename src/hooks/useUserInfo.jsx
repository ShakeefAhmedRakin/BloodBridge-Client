import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useUserInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo = {},
    isLoading: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/data/${user?.email}`);
      return res.data;
    },
  });

  return [userInfo, isLoading, refetch];
};

export default useUserInfo;
