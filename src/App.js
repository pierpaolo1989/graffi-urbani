import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import Artists from "./pages/ArtistsPage.tsx";
import CuriosityPage from "./pages/CuriosityPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import NoPage from "./pages/NoPage.tsx";

const App = () => {
  return (
<Router>
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route index element={<MainPage />} />
    <Route path="/artists" element={<Artists />} />
    <Route path="/curiosity" element={<CuriosityPage />} />
    <Route path="*" element={<NoPage />} />
  </Routes>
</Router>
  );
};

export default App;
