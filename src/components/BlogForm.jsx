import React from "react";
import PropTypes from "prop-types";
const BlogForm = ({ addBlog, newBlog, handleBlogChange, setLoginVisible }) => {
  return (
      <div>
        <form onSubmit={addBlog}>
          <h2>create new</h2>
          <div>
            title:
            <input name="title" type="text" value={newBlog.title} onChange={handleBlogChange} />
          </div>
          <div>
            author:
            <input name="author" type="text" value={newBlog.author} onChange={handleBlogChange} />
          </div>
          <div>
            url:
            <input name="url" type="text" value={newBlog.url} onChange={handleBlogChange} />
          </div>
          <button type="submit" onClick={() => setLoginVisible(false)}>create</button>
        </form>
      </div>
  );
};

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
