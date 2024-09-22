import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Rootlayout from "./layout/Rootlayout";
import Dashboard from "./pages/Dashboard";
import ManagerDashboard from "./components/ManagerDashbaord"; // Corrected the import path

const App = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          setUserDetails(null);
          console.log("User data Not Found, Please sign-up");
        }
      } else {
        setUserDetails(null);
        console.log("User is not logged in");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div>Loading...</div>
      </div>
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Rootlayout />}>
        <Route index element={<Home />} />
        <Route
          path="/dashboard"
          element={
            userDetails ? (
              <Dashboard id={userDetails.id} />
            ) : (
              <Navigate to="/log-in" />
            )
          }
        />
        <Route
          path="/manager-dashboard"
          element={
            userDetails && userDetails.role === "manager" ? (
              <ManagerDashboard />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/sign-up"
          element={userDetails ? <Navigate to="/dashboard" /> : <SignUp />}
        />
        <Route
          path="/log-in"
          element={userDetails ? <Navigate to="/dashboard" /> : <LogIn />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

const styles = {
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

export default App;
