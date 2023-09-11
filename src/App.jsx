import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from './services/login'



const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	console.log("🚀 ~ file: App.jsx:13 ~ App ~ user:", user)


	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
		  const user = await loginService.login({
			username, password,
		  })
		  setUser(user)
		  setUsername('')
		  setPassword('')
		} catch (exception) {
		  console.log("Wrong credentials");

		}
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
			{user === null ? loginForm() :  
			<div>
				<h1>blogs</h1>
				<p>{user.name} logged in</p>
				{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
				))}
			</div>
			}
		</div>
	);
};

export default App;