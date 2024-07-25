// import { useState } from "react";
// import axios from "axios";

// export default function Auth() {
//   let [isSignUp, setIsSignUp] = useState(false);
//   let [name, setName] = useState();
//   let [email, setEmail] = useState();
//   let [password, setPassword] = useState();
//   let [data, setData] = useState();
//   async function signup() {
//     try {
//       console.log(name, email, password);
//       const res = await axios.post("/api/user/signup", {
//         name,
//         email,
//         password,
//       });
//       setData(res.data);
//       console.log(res);
//     } catch (err) {
//       console.log(err.response.data);
//     }
//   }

//   async function login() {
//     try {
//       const res = await axios.post("/api/user/signin", {
//         email,
//         password,
//       });
//       console.log(res);

//       setData(res.data);
//       console.log(data);
//     } catch (err) {
//       console.log(err.response.data);
//     }
//   }
//   async function check() {
//     try {
//       const res = await axios.get("/api/user/check");
//       console.log(res.data);
//     } catch (err) {
//       console.log(err.response.data);
//     }
//   }

//   async function loginWithGoogle() {
//     window.open(
//       `${import.meta.env.VITE_BACKEND_API_URL}/api/user/auth/google`,
//       "_self"
//     );
//   }

//   async function logout() {
//     try {
//       const res = await axios.get("/api/user/logout");
//       console.log(res.data);
//     } catch (err) {
//       console.log(err.response.data);
//     }
//   }
//   return (
//     <>
//       <div className="border bg-blue-200 p-4 m-4">
//         <p>create account</p>
//         {isSignUp}&&
//         <input
//           type="text"
//           placeholder="name"
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="password"
//           onChange={(e) => setPassword(e.target.value)}
//         />{" "}
//         {isSignUp}&&
//         <input
//           type="text"
//           placeholder="confirm-password"
//           // onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={signup}>signup</button>
//       </div>
//       <div className="border bg-orange-300 p-10 m-4">
//         <p>login</p>
//         <input type="text" onChange={(e) => setEmail(e.target.value)} />
//         <input type="text" onChange={(e) => setPassword(e.target.value)} />
//         <button onClick={login}>login</button>
//       </div>
//       <div>
//         <button onClick={check}>check</button>
//       </div>
//       <div>
//         <button onClick={loginWithGoogle}>login with goole</button>{" "}
//       </div>
//       <div>
//         <button onClick={logout}>logout</button>
//       </div>
//     </>
//   );
// }
import { useState } from "react";
import axios from "axios";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState(null);

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
      setData(res.data);
      console.log(res);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  async function login() {
    try {
      const res = await axios.post("/api/user/signin", {
        email,
        password,
      });
      setData(res.data);
      console.log(res);
    } catch (err) {
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
      setData(null); // Clear user data on logout
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  return (
    <>
      {isSignUp ? (
        <div className="border bg-blue-200 p-4 m-4">
          <p>Create account</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={signup}>Sign Up</button>
        </div>
      ) : (
        <div className="border bg-orange-300 p-10 m-4">
          <p>Login</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Login</button>
        </div>
      )}
      <div>
        <button onClick={check}>Check</button>
      </div>
      <div>
        <button onClick={loginWithGoogle}>Login with Google</button>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <div>
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
        </button>
      </div>
    </>
  );
}
