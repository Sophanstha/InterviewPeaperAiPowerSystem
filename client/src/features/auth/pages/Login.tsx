import { useState, type FormEvent } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../../../components/Loading";
import { toast } from "sonner";

function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading } = useAuth();

  const handleLoginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !password) return;
      await handleLogin({ email, password });
      toast.success("Login successful");
      nav("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Login Card */}
      <div className="w-full bg-white max-w-md p-10 rounded-3xl shadow-2xl shadow-slate-300/50">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h1>

          <p className="text-slate-500 mt-2">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginUser}>
          {/* Email Input */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="flex items-center border border-slate-200 rounded-xl px-4 bg-slate-50 focus-within:ring-2 focus-within:ring-black focus-within:bg-white transition-all duration-200">
              <FaEnvelope className="text-slate-400" />

              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="flex items-center border border-slate-200 rounded-xl px-4 bg-slate-50 focus-within:ring-2 focus-within:ring-black focus-within:bg-white transition-all duration-200">
              <FaLock className="text-slate-400" />

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-8">
            <span className="text-sm font-medium text-slate-600 hover:text-black cursor-pointer transition-colors">
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-slate-800 active:scale-[0.98] transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-center text-sm text-slate-500 mt-8">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => nav("/register")}
            className="text-black font-bold cursor-pointer hover:underline underline-offset-4"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
