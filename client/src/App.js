import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "./pages/userSlice";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";

function App() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(loginSuccess(foundUser));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* If a user is logged in then go to the homepage otherwise the register page */}
        <Route
          exact
          path="/"
          element={user ? (<Home />) : (<Register />)}
        />
        {/* If the user is on the login page and user is already logged in then go to the homepage otherwise the login page */}
        <Route
          path="/login"
          element={user ? (<Navigate replace to={"/"} />) : (<Login />)}
        />
        {/* If the user is on the register page and user is already logged in then go to the homepage otherwise the register page */}
        <Route
          path="/register"
          element={user ? (<Navigate replace to={"/"} />) : (<Register />)}
        />
        <Route exact path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
