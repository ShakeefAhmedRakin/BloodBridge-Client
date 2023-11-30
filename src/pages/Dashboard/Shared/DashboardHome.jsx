import { Avatar, Paper, Typography } from "@mui/material";
import DashboardTitle from "../../../components/DashboardTitle";
import useUserInfo from "../../../hooks/useUserInfo";
import { Helmet } from "react-helmet-async";
import DonorDashboard from "../DashboardRoleHome/DonorDashboard";
import AdminVolDashboard from "../DashboardRoleHome/AdminVolDashboard";
const DashboardHome = () => {
  const [userInfo] = useUserInfo();
  return (
    <>
      <Helmet>
        <title>BloodBridge | Dashboard</title>
      </Helmet>
      <DashboardTitle title={"Dashboard"}></DashboardTitle>
      <Paper sx={{ paddingY: 3 }} align="center">
        <Typography
          align="center"
          variant="h4"
          style={{ marginBottom: "10px" }}
        >
          <span className="font-heading font-bold">Welcome</span>
        </Typography>
        <div className="relative w-fit" style={{ position: "relative" }}>
          <Avatar
            alt="Remy Sharp"
            src={userInfo.image}
            style={{ marginBottom: "20px" }}
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

        <Typography
          align="center"
          variant="h4"
          style={{ marginBottom: "10px" }}
        >
          <span className="font-heading font-medium">{userInfo.name}</span>
        </Typography>
        <hr />

        {userInfo.role === "donor" ? (
          <>
            <DonorDashboard></DonorDashboard>
          </>
        ) : (
          ""
        )}
        {userInfo.role === "volunteer" || userInfo.role === "admin" ? (
          <>
            <AdminVolDashboard></AdminVolDashboard>
          </>
        ) : (
          ""
        )}
      </Paper>
    </>
  );
};

export default DashboardHome;
