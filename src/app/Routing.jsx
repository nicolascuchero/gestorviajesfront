import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Profile from "../features/user/pages/Profile";
import Signup from "../components/SignUp";
import Home from '../components/Home';
import Confirmado from "../components/Confirmado";
import VuelosContainer from "../features/vuelos/components/VuelosContainer";
import ClientesList from "../features/clientes/pages/ClientesList";
import HotelesContainer from "../features/hoteles/components/HotelesContainer";
import DashboardContainer from "../features/dashboard/components/DashboardContainer";
import ProtectedRoute from "../routes/ProtectedRoute";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirmado" element={<Confirmado />} />
        
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardContainer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/vuelos" element={<VuelosContainer />} />
          <Route path="/hoteles" element={<HotelesContainer />} />
          <Route path="/clientes" element={<ClientesList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routing;
