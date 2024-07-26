import React from "react";

import Home from "./pages/Home";
import Infrared from "./pages/Infrared";
import Viriability from "./pages/Viriability";
import Heart from "./pages/Heart";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Prueba from "./components/Prueba";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from './context/AuthContext';
import Login from "./pages/Login";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login/>} />
            {/* <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} /> */}
            <Route path="/prueba" element={<Prueba/>} />
            <Route path="/Infrared" element={<Infrared />} />
            <Route path="/Heart" element={<Heart />} />
            <Route path="/Viriability" element={<Viriability />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
