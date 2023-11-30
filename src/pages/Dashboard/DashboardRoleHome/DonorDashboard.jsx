import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { TiCancel } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { GrView } from "react-icons/gr";
import { MdDeleteForever, MdDone } from "react-icons/md";

const DonorDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [requests, SetRequests] = useState([]);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get(`/user/donation-requests/recent?email=${user.email}`)
      .then((res) => SetRequests(res.data));
    setTriggerRefetch(false);
  }, [triggerRefetch, axiosSecure, user.email]);

  // ACTIONS
  const handleSetDone = (id, status) => {
    if (status !== "inprogress") {
      toast.error("Request is not in progress");
    } else {
      axiosSecure.patch(`/donation-requests/patch-done/${id}`).then((res) => {
        if (res.data.modifiedCount) {
          setTriggerRefetch(true);
          toast.success("Donation has been marked as done");
        } else {
          toast.error("Donation is already done");
        }
      });
    }
  };

  const handleSetCancelled = (id, status) => {
    if (status !== "inprogress") {
      toast.error("Request is not in progress");
    } else {
      axiosSecure.patch(`/donation-requests/patch-cancel/${id}`).then((res) => {
        if (res.data.modifiedCount) {
          setTriggerRefetch(true);
          toast.success("Donation has been marked as cancelled");
        } else {
          toast.error("Donation is already cancelled");
        }
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this donation request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-requests/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setTriggerRefetch(true);
            toast.success("Request has been deleted successfully");
          } else {
            toast.error("Request is already deleted");
          }
        });
      }
    });
  };

  return (
    <>
      {requests.length > 0 ? (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden", padding: 1 }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align={`left`} style={{ width: 150 }}>
                      <span className="font-heading font-extrabold">
                        Recipient Name
                      </span>
                    </TableCell>
                    <TableCell align={`left`} style={{ width: 150 }}>
                      <span className="font-heading font-extrabold">
                        Recipient Location
                      </span>
                    </TableCell>
                    <TableCell align={`left`} style={{ width: 150 }}>
                      <span className="font-heading font-extrabold">Date</span>
                    </TableCell>
                    <TableCell align={`left`} style={{ width: 150 }}>
                      <span className="font-heading font-extrabold">Time</span>
                    </TableCell>
                    <TableCell align={`left`} style={{ width: 150 }}>
                      <span className="font-heading font-extrabold">
                        Status
                      </span>
                    </TableCell>
                    <TableCell align={`left`} style={{ width: 150 }}>
                      <span className="font-heading font-extrabold">
                        Donor Information
                      </span>
                    </TableCell>
                    <TableCell align={`right`} style={{ width: 50 }}>
                      <span className="font-heading font-extrabold">
                        Actions
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.map((req) => {
                    return (
                      <TableRow key={req._id}>
                        <TableCell component="th" scope="row">
                          <span className="font-heading">
                            {req.recipient_name}
                          </span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <span className="font-heading">
                            {req.recipient_upazilla}, {req.recipient_district}
                          </span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <span className="font-heading">
                            {req.request_date}
                          </span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <span className="font-heading">
                            {req.request_time}
                          </span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <span className="font-heading">
                            {req.request_status}
                          </span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <span className="font-heading">
                            {req.request_status === "inprogress" ? (
                              <>
                                {req.donor_name}
                                <br></br>
                                {req.donor_email}
                              </>
                            ) : (
                              "N/A"
                            )}
                          </span>
                        </TableCell>
                        <TableCell align="right" component="th" scope="row">
                          <div className="flex gap-1 justify-end">
                            {req.request_status === "inprogress" ? (
                              <>
                                <button
                                  className="btn btn-sm btn-ci tooltip text-base text-white bg-green-500 hover:bg-green-600 border-none"
                                  data-tip="Done"
                                  onClick={() =>
                                    handleSetDone(req._id, req.request_status)
                                  }
                                >
                                  <MdDone />
                                </button>
                                <button
                                  className="btn btn-sm btn-ci tooltip text-lg text-red-500 bg-gray-300 hover:bg-gray-400 border-none"
                                  data-tip="Cancel"
                                  onClick={() =>
                                    handleSetCancelled(
                                      req._id,
                                      req.request_status
                                    )
                                  }
                                >
                                  <TiCancel />
                                </button>
                              </>
                            ) : (
                              <></>
                            )}
                            <button
                              className="btn btn-sm btn-ci tooltip text-base text-white bg-blue-500 hover:bg-blue-600 border-none"
                              data-tip="Edit"
                              onClick={() =>
                                navigate(
                                  `/dashboard/update/donation-requests/${req._id}`
                                )
                              }
                            >
                              <CiEdit />
                            </button>
                            <button
                              className="btn btn-sm btn-ci tooltip text-base text-white bg-yellow-500 hover:bg-yellow-600 border-none"
                              data-tip="Details"
                              onClick={() =>
                                navigate(`/blood-donation-requests/${req._id}`)
                              }
                            >
                              <GrView />
                            </button>
                            <button
                              className="btn btn-sm btn-ci tooltip text-base text-white bg-red-600 hover:bg-red-700 border-none"
                              data-tip="Delete"
                              onClick={() => handleDelete(req._id)}
                            >
                              <MdDeleteForever />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <button
              className="bg-primary text-white btn hover:bg-primary my-5 border-none"
              onClick={() => navigate("/dashboard/my-donation-requests")}
            >
              View all requests
            </button>
          </Paper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DonorDashboard;
