import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import axios from "axios"; // Import axios library
import Auth from "./pages/Auth";
import "./index.css";
import Home from "./pages/Home";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API_URL;
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route key="home" path="/">
        <Route key="default" path="" element={<Home />} />
        <Route key="login" path="/login" element={<Auth />} />

        {/* <Route key="specific" path="specific/:eventid" element={<Specific />} /> */}
      </Route>,
    ])
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
