import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Formfill from "../components/SuppoertForm.jsx";
import VolentierForm from "../components/VolentierForm.jsx";
import { Navbar } from "../components/Navbar.jsx";
import AiChat from "../components/AiChat.jsx";
function App() {
  return (
    <div>
      <Navbar />
      <Formfill id="Support" />
      <VolentierForm />
      <AiChat />
    </div>
  );
}

export default App;
