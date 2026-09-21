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
          <div>
            <label htmlFor="register-user">Username</label>
            <input
              name="username"
              type="text"
              id="register-user"
              onChange={handleInputChange}
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="register-password">Password</label>
            <input
              name="password"
              type="password"
              id="register-password"
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <div>
            <label htmlFor="register-password2">Password</label>
            <input
              name="password2"
              type="password"
              id="register-password2"
              onChange={handleInputChange}
              autoComplete="current-password2"
            />
          </div>
          <div>
            <label htmlFor="register-email">Email</label>
            <input
              name="email"
              type="email"
              id="register-email"
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <button type="submit">Create</button>
          {error.length > 0 ? <div style={{ color: "red" }}>{error}</div> : ""}
        </form>
      </>
    </div>
  );
};

export default RegisterForm;
