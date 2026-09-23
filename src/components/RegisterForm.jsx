import { useAuthentication } from "../hooks/apiHooks";
import useForm from "../hooks/formHooks";
import { useNavigate } from "react-router";
import { useState } from "react";

const RegisterForm = () => {
  const { createUser, postLogin } = useAuthentication();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const initValues = {
    username: "",
    password: "",
    password2: "",
    email: "",
  };

  // for now, test user: ilkka password: 12345
  const doRegister = async (inputs) => {
    if (inputs.password === inputs.password2) {
      try {
        const results = await createUser(inputs);

        console.log("results", results);

        const loginResult = await postLogin(inputs);
        localStorage.setItem("token", loginResult.token);
        navigate("/");
      } catch (err) {
        console.log("err", err);
        setError(err.message);
      }
    } else {
      // TODO: implement proper user notification
      alert("Check passwords");
    }
  };

  // TODO: clear possible error state when inputs change
  const { handleInputChange, handleSubmit } = useForm(doRegister, initValues);

  return (
    <div>
      <>
        <h1>Create account</h1>
        <form onSubmit={handleSubmit}>
          <div className="m-1 flex flex-wrap border-1 p-4">
            <label className="w-full p-2" htmlFor="register-user">
              Username
            </label>
            <input
              className="w-full border-2 bg-white p-2"
              name="username"
              type="text"
              id="register-user"
              onChange={handleInputChange}
              autoComplete="username"
            />
          </div>
          <div className="m-1 flex flex-wrap border-1 p-4">
            <label className="w-full p-2" htmlFor="register-password">
              Password
            </label>
            <input
              className="w-full border-2 bg-white p-2"
              name="password"
              type="password"
              id="register-password"
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <div className="m-1 flex flex-wrap border-1 p-4">
            <label className="w-full p-2" htmlFor="register-password2">
              Password
            </label>
            <input
              className="w-full border-2 bg-white p-2"
              name="password2"
              type="password"
              id="register-password2"
              onChange={handleInputChange}
              autoComplete="current-password2"
            />
          </div>
          <div className="m-1 flex flex-wrap border-1 p-4">
            <label className="w-full p-2" htmlFor="register-email">
              Email
            </label>
            <input
              className="w-full border-2 bg-white p-2"
              name="email"
              type="email"
              id="register-email"
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <button
            className="rounded-2xl bg-blue-800 p-4 text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-800 focus:outline-none"
            type="submit"
          >
            Create
          </button>
          {error.length > 0 ? <div style={{ color: "red" }}>{error}</div> : ""}
        </form>
      </>
    </div>
  );
};

export default RegisterForm;
