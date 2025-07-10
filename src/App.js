import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Artists from "./pages/ArtistsPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import NoPage from "./pages/NoPage.tsx";
import CuriosityPage from "./pages/CuriosityPage.tsx";

const App = () => {
  return (

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route index element={<MainPage />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="*" element={<NoPage />} />
      <Route path="/curiosity" element={<CuriosityPage/>} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
