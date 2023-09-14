import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, mockHandler }) => {

  const [showDetails, setShowDetails] = useState(false);
  const [like, setLike] = useState(0);

  useEffect(() => {
    setLike(blog?.likes);
  }, [blog?.likes]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleEdit = async () => {
    try {
      const editedBlog = await blogService.edit(like + 1, blog.id);
      setLike(editedBlog.likes);
      mockHandler(blog);
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

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id);
        updateBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div style={blogStyle}>
      <div className="title_author">
        {blog?.title} {blog?.author}
        <button onClick={toggleDetails}>
          {showDetails ? "hide" : "show"}
        </button>
      </div>
      {showDetails && (
         <div>
          <div className="url_likes">
            <a href={blog?.url} target="_blank" rel="noopener noreferrer">
              {blog?.url}
            </a>
            <p>likes: {like}
            <button onClick={handleEdit}>like</button></p>
          </div>
          <div className="delete">
            <p>{blog.user?.name}</p>
            {user?.username === blog.user?.username && (
            <button onClick={handleDelete}>delete</button>)}
            </div>
         </div>
      )}
    </div>
  );
};

export default Blog;