import { useQuery } from "@tanstack/react-query";
import DashboardTitle from "../../../../components/DashboardTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
// MATERIAL UI
import {
  Card,
  CardContent,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { toast } from "sonner";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Helmet } from "react-helmet-async";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [filter, setFilter] = useState("all");

  const {
    data: users = [],
    refetch,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["users", filter], // Include filter as part of the query key
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {});
      if (filter === "all") {
        return res.data;
      }
      if (filter === "blocked") {
        return res.data.filter((user) => user.status === "blocked");
      }
      if (filter === "active") {
        return res.data.filter((user) => user.status === "active");
      }
    },
  });

  // TABLE AND PAGINATION
  const columns = [
    { id: "avatar", label: "Avatar", minWidth: 50 },
    { id: "email", label: "Email", minWidth: 150 },
    { id: "name", label: "Name", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 150 },
    { id: "role", label: "Role", minWidth: 150 },
    { id: "action", label: "Action", minWidth: 360 },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // ACTIONS
  const handleBlockUser = (user) => {
    confirmAlert({
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui bg-background shadow-xl p-5 rounded-xl font-heading">
            <h1 className="text-xl text-center font-bold text-primary">
              Block User
            </h1>
            <hr />
            <p className="text-gray-700 text-center mt-8">
              Are you sure you want to block this user?
            </p>
            <p className="font-bold mt-4 mb-8 text-center">Name: {user.name}</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onClose}
                className="btn text-white bg-secondary hover:bg-secondary"
              >
                No
              </button>
              <button
                className="btn text-white bg-primary hover:bg-primary"
                onClick={() => {
                  axiosSecure.patch(`/users/block/${user._id}`).then((res) => {
                    if (res.data.modifiedCount) {
                      refetch();
                      toast.success("User has been blocked");
                    } else {
                      toast.error("User is already blocked");
                    }
                  });
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const handleUnblockUser = (user) => {
    confirmAlert({
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui bg-background shadow-xl p-5 rounded-xl font-heading">
            <h1 className="text-xl text-center font-bold text-cyan-500">
              Unblock User
            </h1>
            <hr />
            <p className="text-gray-700 text-center mt-8">
              Are you sure you want to unblock this user?
            </p>
            <p className="font-bold mt-4 mb-8 text-center">Name: {user.name}</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onClose}
                className="btn text-white bg-secondary hover:bg-secondary"
              >
                No
              </button>
              <button
                className="btn text-white bg-cyan-500 hover:bg-cyan-500"
                onClick={() => {
                  axiosSecure
                    .patch(`/users/unblock/${user._id}`)
                    .then((res) => {
                      if (res.data.modifiedCount) {
                        refetch();
                        toast.success("User has been unblocked");
                      } else {
                        toast.error("User is already unblocked");
                      }
                    });
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const handleMakeAdmin = (user) => {
    confirmAlert({
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui bg-background shadow-xl p-5 rounded-xl font-heading">
            <h1 className="text-xl text-center font-bold text-secondary">
              Make Admin
            </h1>
            <hr />
            <p className="text-gray-700 text-center mt-8">
              Are you sure you want to make this user an admin?
            </p>
            <p className="font-bold mt-4 mb-8 text-center">Name: {user.name}</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onClose}
                className="btn text-white bg-secondary hover:bg-secondary"
              >
                No
              </button>
              <button
                className="btn text-white bg-primary hover:bg-primary"
                onClick={() => {
                  axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
                    if (res.data.modifiedCount) {
                      refetch();
                      toast.success("User has been made an admin");
                    } else {
                      toast.error("User is already an admin");
                    }
                  });
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const handleMakeVolunteer = (user) => {
    axiosSecure.patch(`/users/volunteer/${user._id}`).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast.success("User has been made a volunteer");
      } else {
        toast.error("User is already a volunteer");
      }
    });
  };

  const handleMakeDonor = (user) => {
    axiosSecure.patch(`/users/donor/${user._id}`).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        toast.success("User has been made a donor");
      } else {
        toast.error("User is already a donor");
      }
    });
  };

  const filterByStatus = (status) => {
    setFilter(status); // Update the filter state
  };

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  return (
    <>
      <Helmet>
        <title>BloodBridge | Users</title>
      </Helmet>
      <DashboardTitle title={"All Users"}></DashboardTitle>
      <Card>
        <CardContent>
          <Typography component="div" align="center">
            <span className="font-heading font-medium lg:text-2xl">
              Total Users: {users.length}
            </span>
          </Typography>
        </CardContent>
      </Card>

      {/* SPACER */}
      <hr className="my-4" />
      <div className="grid grid-cols-3">
        <button
          className="btn bg-red-600 hover:bg-red-700 text-white btn-sm text-xs md:btn-md md:text-base"
          onClick={() => filterByStatus("blocked")}
        >
          Filter Blocked
        </button>
        <button
          className="btn bg-green-600 hover:bg-green-700 text-white btn-sm text-xs md:btn-md md:text-base"
          onClick={() => filterByStatus("active")}
        >
          Filter Active
        </button>
        <button
          className="btn bg-gray-600 hover:bg-gray-700 text-white btn-sm text-xs md:btn-md md:text-base"
          onClick={() => filterByStatus("all")}
        >
          Reset Filters
        </button>
      </div>

      {/* TABULAR ELEMENT FOR USERS */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={`left`}
                    style={{ minWidth: column.minWidth }}
                  >
                    <span className="font-heading font-extrabold">
                      {column.id === "action" ? "" : column.label}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading || isRefetching ? (
              <></>
            ) : (
              <>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => {
                      return (
                        <TableRow key={user._id}>
                          <TableCell component="th" scope="row">
                            <img
                              src={user.image}
                              className="avatar w-9 rounded-full aspect-square object-cover"
                            />
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>
                            <span
                              className={`font-semibold ${
                                user.status === "active"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-semibold ${
                                user.role === "donor"
                                  ? "text-purple-600"
                                  : user.role === "volunteer"
                                  ? "text-green-600"
                                  : ""
                              }`}
                            >
                              {user.role}
                            </span>
                          </TableCell>
                          <TableCell align="left">
                            {user.status === "active" ? (
                              <button
                                className="btn bg-primary hover:bg-primary text-white"
                                type="button"
                                onClick={() => {
                                  handleBlockUser(user);
                                }}
                              >
                                Block
                              </button>
                            ) : (
                              <button
                                className="btn bg-cyan-500 hover:bg-cyan-500 text-white"
                                type="button"
                                onClick={() => {
                                  handleUnblockUser(user);
                                }}
                              >
                                Unblock
                              </button>
                            )}
                            {user.role === "donor" ? (
                              <button
                                className="btn bg-green-700 hover:bg-green-700 text-white"
                                type="button"
                                onClick={() => handleMakeVolunteer(user)}
                              >
                                Make Volunteer
                              </button>
                            ) : (
                              <button
                                className="btn bg-purple-700 hover:bg-purple-700 text-white"
                                type="button"
                                onClick={() => handleMakeDonor(user)}
                              >
                                Make Donor
                              </button>
                            )}
                            <button
                              className="btn bg-secondary hover:bg-secondary text-white"
                              type="button"
                              disabled={user.role === "admin" ? "disabled" : ""}
                              onClick={() => {
                                handleMakeAdmin(user);
                              }}
                            >
                              Make Admin
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {isLoading || isRefetching ? (
          <div className="flex justify-center items-center py-20 w-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <></>
        )}
      </Paper>
    </>
  );
};

export default AllUsers;
