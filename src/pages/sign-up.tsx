// react
import { useState, type FormEvent } from "react";

// next
import { useRouter } from "next/router";

// tRPC
import { api } from "~/utils/api";

const SignUp = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onUserCreated = async () => {
    await router.push("/auth/sign-in");
  };

  const createUserMutation = api.users.createUser.useMutation({
    onSuccess: onUserCreated,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm password must match");
      return;
    }

    createUserMutation.mutate({ username, password });
  };

  return (
    <main className="container mx-auto max-w-lg pt-20">
      <div className="card bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={onSubmit}>
          <h2 className="card-title">Sign up</h2>

          {errorMessage && (
            <div className="alert alert-error">
              <span>{errorMessage}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}

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
            <li className="form-control w-full">
              <label className="label">
                <span className="label-text">Confrim Password</span>
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="confirm password"
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
