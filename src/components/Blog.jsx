import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [like, setLike] = useState(0);

  useEffect(() => {
    setLike(blog.likes);
  }, [blog.likes]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleEdit = async () => {
    try {
      const editedBlog = await blogService.edit(like + 1, blog.id);
      setLike(editedBlog.likes);
    } catch (error) {
      console.error("Error editing blog:", error);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    padding: 5,
    marginTop: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? "hide" : "show"}
        </button>
      </div>
      {showDetails && (
        <div>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
          <p>likes: {like} <button onClick={handleEdit}>like</button></p>
          <p>{user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;