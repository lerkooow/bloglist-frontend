import React, { useState, useEffect } from "react";

import blogService from "./services/blogs";
import loginService from './services/login';

import "./App.css";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: ""
  });
  const [message, setMessage] = useState(null);
  const [blogVisible, setBlogVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token);
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
		setMessage({ type: "error", text: "Wrong username or password!" });

		setTimeout(() => {
			setMessage(null);
		}, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null);
  };

  const addBlog = async (e) => {
    e.preventDefault();

    try {
      const blogObject = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        username: user.username,
      };

      const returnedBlog = await blogService.create(blogObject);

      setBlogs([...blogs, { ...returnedBlog, user }]);

      setNewBlog({
        title: "",
        author: "",
        url: "",
      });

      setMessage({
        type: "success",
        text: `A new blog - ${newBlog.title} by ${newBlog.author} added!`,
      });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Oops! Something went wrong.",
      });

    }
  };

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  }

  const updateBlogs = async () => {
    const updatedBlogs = await blogService.getAll();
    setBlogs(updatedBlogs);
  };

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const loginForm = () => {
    return (
      <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          message={message}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }

    return (
      <div>
        <h1>blogs</h1>
        <Notification message={message} />
       <div className="logout">
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
       </div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
        <BlogForm
        user={user}
        handleLogout={handleLogout}
        addBlog={addBlog}
        newBlog={newBlog}
        handleBlogChange={handleBlogChange}
        setLoginVisible={setBlogVisible}
        createBlog={addBlog}
        blogs={blogs}/>
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
        <BlogList blogs={blogs} user={user} removeBlog={removeBlog}/>
      </div>
    )
  }

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        blogForm(updateBlogs)
      )}
    </div>
  );
};

export default App;
