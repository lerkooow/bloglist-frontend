import React, { useState, useEffect } from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, user, updateBlogs, removeBlog }) => {
  const [sortedBlogs, setSortedBlogs] = useState([]);

  useEffect(() => {
    const sortBlogsByLikes = () => {
      const sorted = [...blogs].sort((a, b) => b.likes - a.likes);
      setSortedBlogs(sorted);
    };

    sortBlogsByLikes();
  }, [blogs]);

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlogs={updateBlogs}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

export default BlogList;