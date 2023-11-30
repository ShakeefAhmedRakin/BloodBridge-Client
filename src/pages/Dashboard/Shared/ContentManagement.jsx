import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../components/DashboardTitle";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import { toast } from "sonner";
import Swal from "sweetalert2";

const ContentManagement = () => {
  const navigate = useNavigate();
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [blogs, SetBlogs] = useState([]);
  const [filter, setFilter] = useState("");
  const axiosSecure = useAxiosSecure();
  const [userInfo] = useUserInfo();

  useEffect(() => {
    axiosSecure
      .get(`/blogs?filter=${filter}`)
      .then((res) => SetBlogs(res.data));
    setTriggerRefetch(false);
  }, [filter, axiosSecure, triggerRefetch]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const renderContent = (content) => {
    return { __html: content };
  };

  // ACTIONS
  const handlePublish = (id, status) => {
    if (userInfo.role !== "admin") {
      toast.error("Only admin can publish");
      return;
    }

    if (status === "published") {
      toast.error("Blog is already published");
      return;
    }

    axiosSecure.patch(`/blogs/patch-publish/${id}`).then((res) => {
      if (res.data.modifiedCount) {
        setTriggerRefetch(true);
        toast.success("Blog has been published");
      } else {
        toast.error("Blog is already published");
      }
    });
  };

  const handleUnpublish = (id, status) => {
    if (userInfo.role !== "admin") {
      toast.error("Only admin can unpublish");
      return;
    }

    if (status === "draft") {
      toast.error("Blog is already drafted");
      return;
    }

    axiosSecure.patch(`/blogs/patch-draft/${id}`).then((res) => {
      if (res.data.modifiedCount) {
        setTriggerRefetch(true);
        toast.success("Blog has been unpublished");
      } else {
        toast.error("Blog is already unpublished");
      }
    });
  };

  const handleDelete = (id) => {
    if (userInfo.role !== "admin") {
      toast.error("You do not have permission to delete");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this blog?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/blogs/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setTriggerRefetch(true);
            toast.success("Blog has been deleted!");
          } else {
            toast.error("Blog does note exist");
          }
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>BloodBridge | Manage Content</title>
      </Helmet>
      <DashboardTitle title={"Manage Content"} />
      <Paper sx={{ width: "100%", overflow: "hidden", padding: 1 }}>
        <div className="flex justify-between">
          <div>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="select font-heading bg-secondary text-white focus:outline-none"
            >
              <option value="">All</option>
              <option value="draft">Drafts</option>
              <option value="published">Published</option>
            </select>
          </div>
          <button
            onClick={() => navigate("/dashboard/content-management/add-blog")}
            className="btn text-white bg-secondary hover:bg-secondary"
          >
            Add Blog
          </button>
        </div>
        <hr className="my-2" />
        {blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-background rounded-xl shadow-xl font-heading p-2 border-2 flex flex-col h-full"
                >
                  <div className="w-full h-[200px]">
                    <img
                      src={blog.thumbnail}
                      className="object-cover h-[200px] w-full rounded-t-xl"
                    />
                  </div>
                  <div className="px-1 mt-2">
                    <div className="flex justify-between items-center">
                      <span
                        className={`badge border-none ${
                          blog.status === "draft"
                            ? "bg-secondary text-white"
                            : "bg-accent text-black"
                        } font-bold uppercase`}
                      >
                        {blog.status}
                      </span>
                      {userInfo.role === "admin" ? (
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="btn text-white bg-primary hover:bg-primary hover:shadow-xl border-none btn-sm"
                        >
                          Delete
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                    <h1 className="text-lg font-bold">{blog.title}</h1>
                    <hr className="my-1" />
                    <div
                      dangerouslySetInnerHTML={renderContent(blog.content)}
                      className="my-2"
                    />
                  </div>
                  <hr />
                  <div
                    className={`${
                      userInfo.role !== "admin" || blog.status === "published"
                        ? "hidden"
                        : ""
                    } flex justify-end items-end h-full`}
                  >
                    <button
                      onClick={() => handlePublish(blog._id, blog.status)}
                      className="btn bg-secondary text-white hover:bg-secondary my-1"
                    >
                      Publish
                    </button>
                  </div>
                  <div
                    className={`${
                      userInfo.role !== "admin" || blog.status === "draft"
                        ? "hidden"
                        : ""
                    } flex justify-end items-end h-full`}
                  >
                    <button
                      onClick={() => handleUnpublish(blog._id, blog.status)}
                      className="btn bg-secondary text-white hover:bg-secondary my-1"
                    >
                      Unpublish
                    </button>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="font-heading max-w-xl font-bold text-2xl text-primary text-center mx-auto py-24">
              No Blogs published yet.
            </h1>
          </>
        )}
      </Paper>
    </>
  );
};

export default ContentManagement;
