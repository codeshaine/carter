import { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { setUser, setIsAuthenticated, setSeller, setIsSeller } =
    useContext(AuthContext);
  async function signup() {
    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    try {
      const res = await axios.post("/api/user/signup", {
        name,
        email,
        password,
      });
      setUser(res.data.data);
      setIsAuthenticated(true);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 400);
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err.response.data);
    }
  }

  async function login() {
    try {
      const res = await axios.post("/api/user/signin", {
        email,
        password,
      });

      setUser(res.data.data);
      setSeller(res.data.data?.sellers?.seller_name);
      setIsSeller(res.data.data.isSeller);
      setIsAuthenticated(true);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 400);
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err.response.data);
    }
  }

  async function loginWithGoogle() {
    window.open(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/user/auth/google`,
      "_self"
    );
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Navbar />

      <div className="mt-10">
        {isSignUp ? (
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
            <div className="w-full px-6 py-8">
              <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="logo.png" alt="Logo" />
              </div>

              <p className="mt-3 text-xl text-center text-gray-800">
                Create Account
              </p>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg focus:border-slate-500 focus:ring-slate-500"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg focus:border-slate-500 focus:ring-slate-500"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg focus:border-slate-500 focus:ring-slate-500"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg focus:border-slate-500 focus:ring-slate-500"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="mt-6">
                <button
                  onClick={signup}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300"
                >
                  Sign Up
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b border-slate-300"></span>
                <div
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="cursor-pointer text-xs text-gray-500 hover:underline"
                >
                  Already have an Account?
                </div>
                <span className="w-1/5 border-b border-slate-300"></span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
            <div className="w-full px-6 py-8">
              <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="logo.png" alt="Logo" />
              </div>

              <p className="mt-3 text-xl text-center text-gray-800">
                Welcome back!
              </p>

              <div
                onClick={loginWithGoogle}
                className="flex items-center cursor-pointer justify-center mt-4 text-gray-800 transition-colors duration-300 transform border border-slate-300 rounded-lg hover:bg-slate-100"
              >
                <span className="w-5/6 px-4 py-3 font-bold text-center">
                  Sign in with Google
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b border-slate-300"></span>
                <span className="text-xs text-center text-gray-500 hover:underline">
                  or login with email
                </span>
                <span className="w-1/5 border-b border-slate-300"></span>
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg focus:border-slate-500 focus:ring-slate-500"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-slate-300 rounded-lg focus:border-slate-500 focus:ring-slate-500"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-6">
                <button
                  onClick={login}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300"
                >
                  Sign In
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b border-slate-300"></span>
                <div
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="cursor-pointer text-xs text-gray-500 hover:underline"
                >
                  Don&apos;t have an Account?
                </div>
                <span className="w-1/5 border-b border-slate-300"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
