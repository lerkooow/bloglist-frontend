import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, user, updateBlogs }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} updateBlogs={updateBlogs} />
      ))}
    </div>
  );
};

export default BlogList;

