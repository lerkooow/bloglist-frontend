import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, user }) => {
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);
  
  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default BlogList;