// react
import { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="container mx-auto max-w-lg pt-20">
      <div className="card bg-base-100 shadow-xl">
        <form className="card-body">
          <h2 className="card-title">Sign up</h2>

          <ul className="mb-4">
            <li className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="username"
                className="input-bordered input w-full"
                required
              />
            </li>
            <li className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                className="input-bordered input w-full"
                required
              />
            </li>
          </ul>

          <div className="card-actions justify-end">
            <button className="btn-primary btn">Create Account</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
