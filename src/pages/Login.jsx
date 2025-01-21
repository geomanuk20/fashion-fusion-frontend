import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { backendUrl, setToken, navigate } = useContext(ShopContext);
  const [state, setState] = useState('Sign Up');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (forgotPassword) {
        const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
        if (data.success) {
          toast.success(data.message || 'Password reset link sent to your email');
          setForgotPassword(false);
          setEmail('');
        } else {
          toast.error(data.message);
        }
      } else {
        const endpoint = state === "Sign Up" ? "/api/user/register" : "/api/user/login";
        const payload = state === "Sign Up" ? { name, email, password } : { email, password };

        const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

        if (data.success) {
          localStorage.setItem("authToken", data.token);
          setToken(data.token);
          toast.success(data.message || (state === "Sign Up" ? "Account created successfully!" : "Logged in successfully!"));
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
};

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {forgotPassword ? "Forgot Password" : state === 'Sign Up' ? "Create Account" : "Login"}
        </p>
        <p>
          {forgotPassword ? "Enter your email to reset your password" :
          `Please ${state === 'Sign Up' ? "sign up" : "log in"} to book an appointment`}
        </p>
        {state === 'Sign Up' && !forgotPassword && (
          <div className="w-full">
            <p>Full Name</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        {!forgotPassword && (
          <div className="w-full">
            <p>Password</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
          </div>
        )}
        <button
          className={`bg-primary text-white w-full py-2 rounded-md text-base ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : forgotPassword ? "Send Reset Link" : state === 'Sign Up' ? "Create Account" : "Login"}
        </button>
        {forgotPassword ? (
          <p>Remembered your password? <span onClick={() => setForgotPassword(false)} className="text-primary cursor-pointer">Go back to login</span></p>
        ) : (
          <>
            {state === 'Sign Up' ? (
              <p>Already have an account? <span onClick={() => setState('Login')} className="text-primary cursor-pointer">Login here</span></p>
            ) : (
              <p>Create a new account? <span onClick={() => setState('Sign Up')} className="text-primary cursor-pointer">Click here</span></p>
            )}
            {state === 'Login' && (
              <p>Forgot your password? <span onClick={() => setForgotPassword(true)} className="text-primary cursor-pointer">Reset here</span></p>
            )}
          </>
        )}
        <button onClick={handleLogin}>Login with Google</button>
      </div>
    </form>
  );
};

export default Login;
