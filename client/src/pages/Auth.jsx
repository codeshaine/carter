import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function signup() {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("/api/user/signup", {
        name,
        email,
        password,
      });

      // console.log(res);
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

      // console.log(res);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 400);
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err.response.data);
    }
  }

  async function check() {
    try {
      const res = await axios.get("/api/user/check");
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  async function loginWithGoogle() {
    window.open(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/user/auth/google`,
      "_self"
    );
  }

  async function logout() {
    try {
      const res = await axios.get("/api/user/logout");
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="mt-40 lg:mt-10 md:mt-20">
        {isSignUp ? (
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            {/* <div className="hidden bg-cover lg:block lg:w-1/2"></div> */}

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-8"
                  src="https://merakiui.com/images/logo.svg"
                  alt=""
                />
              </div>

              <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                Create Account
              </p>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                  Name
                </label>
                <input
                  id="LoggingEmailAddress"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                  Email Address
                </label>
                <input
                  id="LoggingEmailAddress"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  id="LoggingEmailAddress"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    Confirm Password
                  </label>
                </div>

                <input
                  id="loggingPassword"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="mt-6">
                <button
                  onClick={signup}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Sign Up
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                <div
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="cursor-pointer text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  Already have an Account?
                </div>

                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            {/* <div className="hidden bg-cover lg:block lg:w-1/2"></div> */}

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-8"
                  src="https://merakiui.com/images/logo.svg"
                  alt=""
                />
              </div>

              <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                Welcome back!
              </p>

              <div
                onClick={loginWithGoogle}
                className="flex items-center cursor-pointer  justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <div className="px-4 py-2">
                  <svg className="w-6 h-6" viewBox="0 0 40 40">
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
                <span className="w-5/6 px-4 py-3 font-bold text-center">
                  Sign in with Google
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                  or login with email
                </span>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                  Email Address
                </label>
                <input
                  id="LoggingEmailAddress"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                </div>

                <input
                  id="loggingPassword"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-6">
                <button
                  onClick={login}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Sign In
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                <div
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="cursor-pointer text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  dont have an Account?
                </div>

                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
          </div>
        )}
        <div>
          <button onClick={check}>Check</button>
        </div>

        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
}

// import axios from "axios";
// import { useState } from "react";
// function Home() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setMessage("Please select a file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/user/profile/update",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage("Error uploading file");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default Home;
