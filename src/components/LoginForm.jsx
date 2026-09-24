import {useNavigate} from 'react-router';
import {useAuthentication} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = () => {
  // temporarily setUser
  const {user, setUser} = useUserContext();
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();

  const initValues = {
    username: '',
    password: '',
  };

  console.log(user);

  // for now, test user: ilkka password: 12345
  const doLogin = async (inputs) => {
    // TODO: add login functionalities here
    const loginResult = await postLogin(inputs);
    console.log(loginResult);
    localStorage.setItem('token', loginResult.token);
    setUser(loginResult.user);
    navigate('/');
  };

  const {handleInputChange, handleSubmit} = useForm(doLogin, initValues);

  return (
    <>
      <h1 className="text-center text-3xl">Login</h1>
      <form onSubmit={handleSubmit} className="w-2xl">
        <div className="m-1 flex flex-wrap border p-4">
          <label className="w-full p-2" htmlFor="loginuser">
            Username
          </label>
          <input
            className="w-full border-2 bg-white p-2"
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className="m-1 flex flex-wrap border-1 p-4">
          <label className="w-full p-2" htmlFor="loginpassword">
            Password
          </label>
          <input
            className="w-full border-2 bg-white p-2"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button
          className="rounded-2xl bg-blue-800 p-4 text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-800 focus:outline-none"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
