import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  }); // Remove the 'user' field from the initial state

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
      console.error("Login failed:", exception.response.data.error);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null);
  };

  const addBlog = (e) => {
    e.preventDefault()
    const blogObject = {
		title: newBlog.title,
		author: newBlog.author,
		url: newBlog.url,
		username: user.username
	  };

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setNewBlog({
          title: "",
          author: "",
          url: "",
        });
      })
      .catch(error => {
        console.error("Failed to create a new blog:", error.response.data.error);
      });
  }

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button>login</button>
      </form>
    </div>
  );

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h1>blogs</h1>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
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
              <button>create</button>
            </form>
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
