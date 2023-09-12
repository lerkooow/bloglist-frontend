import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, user, updateBlogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} updateBlogs={updateBlogs} />
      ))}
    </div>
  );
};

export default BlogList;
