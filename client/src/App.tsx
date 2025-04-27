import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login.tsx";
import Signup from "./components/auth/Signup.tsx";
import Home from "./components/home/Home.tsx";
import ProtectedRoute from "./components/helper/ProtectedRoute.tsx";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState } from "react";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <>
      <Routes>
        {/* unauthorised routes (If user not logged in, they will be redirected to the login page) */}
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </>
        )}

        {/* ProtectedRoutes (If user is logged in, they will be redirected to the home page) */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/login" element={<Navigate to="/home" />} />
          <Route path="/register" element={<Navigate to="/home" />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
