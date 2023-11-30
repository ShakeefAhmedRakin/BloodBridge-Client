import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const Blogs = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axiosPublic.get("/blogs/published").then((res) => {
      setLoading(false);
      setBlogs(res.data);
    });
  });

  const renderContent = (content) => {
    return { __html: content };
  };

  return (
    <>
      <div className="custom-min-height">
        <Helmet>
          <title>BloodBridge | Blogs</title>
        </Helmet>
        <hr className="my-3" />
        <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4 text-center">
          Blogs
        </h3>
        <hr className="my-3" />
        {loading ? (
          <>
            <div className="flex justify-center items-center py-20 w-full">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          </>
        ) : (
          <>
            {blogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                  {blogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="bg-background rounded-xl shadow-xl font-heading p-2 border-2"
                    >
                      <div className="w-full h-[200px]">
                        <img
                          src={blog.thumbnail}
                          className="object-cover h-[200px] w-full rounded-t-xl"
                        />
                      </div>
                      <div className="px-1 mt-2">
                        <h1 className="text-lg font-bold">{blog.title}</h1>
                        <hr className="my-1" />
                        <div
                          dangerouslySetInnerHTML={renderContent(blog.content)}
                          className="my-2"
                        />
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
          </>
        )}
      </div>
    </>
  );
};

export default Blogs;
