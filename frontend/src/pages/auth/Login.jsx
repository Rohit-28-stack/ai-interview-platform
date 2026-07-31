import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/auth.service";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { login } = useAuth();
const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      login(response.data.user);
      
      toast.success(response.message || "Login successful");

      console.log("Response:", response);
console.log("User:", response.data.user);
      navigate("/dashboard");

      // We'll save the user in AuthContext later
      // Then navigate to dashboard
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-2">
          AI Interview Platform
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Login to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label className="text-white block mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 p-3 text-white focus:outline-none focus:border-cyan-400"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-white block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 p-3 text-white focus:outline-none focus:border-cyan-400"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>



        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;