import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExperiencesPage from "./pages/ExperiencesPage";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { getUser, logout } from "./features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import { getAllposts } from "./features/postSlice";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Page404 from "./pages/Page404";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const isPostCreatedSuccess = useSelector(
    (state) => state.posts.isPostCreatedSuccess
  );
  useEffect(() => {
    dispatch(getAllposts());
  }, [isPostCreatedSuccess]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser());
    }
  }, [token]);

  return (
    <div className="App min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signUp"
            element={user ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/createPost"
            element={user ? <CreatePost /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
