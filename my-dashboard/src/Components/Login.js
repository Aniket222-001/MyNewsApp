import React from "react";

const Login = ({ handleGoogleLogin, user }) => {
  return (
    <div>
      {!user ? (
        <button
          onClick={handleGoogleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login with Google
        </button>
      ) : (
        <div>Welcome, {user.displayName}</div>
      )}
    </div>
  );
};

export default Login;
