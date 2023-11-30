import { Helmet } from "react-helmet-async";
import DashboardTitle from "../../../components/DashboardTitle";
import { Paper } from "@mui/material";
import { useState } from "react";
import JoditEditor from "jodit-react";
import { MdTitle } from "react-icons/md";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserInfo from "../../../hooks/useUserInfo";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const [content, setContent] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [userInfo] = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const handleContentChange = (value) => {
    setContent(value);
  };

  const onSubmit = async (data) => {
    if (content === "") {
      toast.error("Blog needs content!");
      return;
    }

    data.content = content;
    data.status = "draft";

    const imageFile = { image: data.thumbnail[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      data["thumbnail"] = res.data.data.display_url;
      axiosSecure.post("/blogs", data).then((res) => {
        if (res.data.insertedId) {
          toast.success("Blog has be drafted! Redirecting...");
          reset();
          setContent("");
          setTimeout(() => navigate(-1), 2000);
        }
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>BloodBridge | Add Blog</title>
      </Helmet>
      <DashboardTitle title={"Add Blog"} />
      <Paper sx={{ width: "100%", overflow: "hidden", padding: 1 }}>
        {userInfo.role === "donor" ? (
          <>
            <h1 className="font-heading max-w-xl font-bold text-2xl text-primary text-center mx-auto py-24">
              A donor cannot publish blogs.
            </h1>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Blog Title
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <MdTitle />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                placeholder="Title of blog"
                required
                {...register("title", { required: true })}
              ></input>
            </div>
            <div className="w-full flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Blog Thumbnail
              </label>
              <input
                type="file"
                {...register("thumbnail", { required: true })}
                className="file-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block"
                required
              />
            </div>
            <div>
              <label className="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white">
                Blog Content
              </label>
              <JoditEditor
                id="content"
                value={content}
                onBlur={handleContentChange}
                config={{
                  readonly: false,
                  showCharsCounter: false,
                }}
              />
            </div>
            <button className="btn text-white bg-primary hover:bg-primary w-full border-none mt-5">
              Create Blog
            </button>
          </form>
        )}
      </Paper>
    </>
  );
};

export default AddBlog;
