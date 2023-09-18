import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, removeBlog }) => {

  const [showDetails, setShowDetails] = useState(false);
  const [like, setLike] = useState(blog.likes);

  useEffect(() => {
    setLike(blog?.likes);
  }, [blog?.likes, blog.user]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleEdit = async () => {
    try {
      const editedBlog = await blogService.edit(like + 1, blog.id);
      setLike(editedBlog.likes);
      updateBlogs();
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
        await removeBlog(blog.id);
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div className="title_author">
        {blog?.title} {blog?.author}
        <button id="show_hide-button" onClick={toggleDetails}>
          {showDetails ? "hide" : "show"}
        </button>
      </div>
      {showDetails && (
         <div>
          <div className="url_likes">
            <a href={blog?.url} target="_blank" rel="noopener noreferrer">
              {blog?.url}
            </a>
            <div>likes: <p className="like-count">{like}</p>
            <button onClick={handleEdit} className="like-button">like</button></div>
          </div>
          <div className="delete">
            <p id="blog-user-name">{blog.user.name}</p>
            {user?.username === blog.user?.username && (
            <button id="delete-button" onClick={handleDelete}>delete</button>)}
            </div>
         </div>
      )}
    </div>
  );
};

export default Blog;