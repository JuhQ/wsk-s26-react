import { useNavigate } from 'react-router';
import { useAuthentication } from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const LoginForm = () => {
  const { postLogin } = useAuthentication();
  const navigate = useNavigate();

  const initValues = {
    username: '',
    password: '',
  };

  // for now, test user: ilkka password: 12345
  const doLogin = async () => {
    // TODO: add login functionalities here
    const loginResult = await postLogin(inputs);
    console.log(loginResult);
    localStorage.setItem('token', loginResult.token);
    navigate('/');
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doLogin,
    initValues,
  );

  console.log(inputs);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
