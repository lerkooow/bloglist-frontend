import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, user, updateBlogs, removeBlog }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} updateBlogs={updateBlogs} removeBlog={removeBlog} />
      ))}
    </div>
  );
};

export default BlogList;

