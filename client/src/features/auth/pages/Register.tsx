import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../../../components/Loading";
import { toast } from "sonner";

function Register() {
  const nav = useNavigate();
  const { handleRegister, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) return;

 try {
     await handleRegister({
       email,
       password,
       username,
     });
     toast.success("register succesfully")
     nav("/login");
 } catch (error) {
      if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }
 }
  };
  if(loading){
    return (
   <LoadingScreen/>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 from-slate-50 to-slate-200">
      <div className="w-full bg-white max-w-md p-10 rounded-3xl shadow-2xl shadow-slate-300/50">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-500 mt-2">Join us to get started.</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Username
            </label>
            <div className="flex items-center border border-slate-200 rounded-xl px-4 bg-slate-50 focus-within:ring-2 focus-within:ring-black focus-within:bg-white transition-all">
              <FaUser className="text-slate-400" />
              <input
                type="text"
                placeholder="johndoe123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <div className="flex items-center border border-slate-200 rounded-xl px-4 bg-slate-50 focus-within:ring-2 focus-within:ring-black focus-within:bg-white transition-all">
              <FaEnvelope className="text-slate-400" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-10">
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="flex items-center border border-slate-200 rounded-xl px-4 bg-slate-50 focus-within:ring-2 focus-within:ring-black focus-within:bg-white transition-all">
              <FaLock className="text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        {/* Login link */}
        <p className="text-center text-sm text-slate-500 mt-8">
          Already have an account?{" "}
          <span
            onClick={() => nav("/login")}
            className="text-black font-bold cursor-pointer hover:underline underline-offset-4"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;