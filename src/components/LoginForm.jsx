import React from "react";
import Notification from "./Notification";
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange, message }) => {

  return (
    <div>
      <h2>log in to application</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button>login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  message: PropTypes.object,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
};

export default LoginForm;