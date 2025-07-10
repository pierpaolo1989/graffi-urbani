import MapComponent from "../components/MapComponent.tsx";
import Navbar from "../components/Navbar.tsx";
import Sidebar from "../components/Sidebar.tsx";
import React, { useState } from "react";
import sponsors from '../data/sponsors.json';
import myData from '../data/murales.json';
import { Murale, Sponsor } from "../models/Model";

const MainPage: React.FC = () => {
  const [nearestMurale, setNearestMurale] = useState(null);
  const [filteredMurals, setFilteredMurals] = useState<Murale[]>(myData as Murale[]);
  const [selectedMurale, setSelectedMurale] = useState<Murale | null>(null);
  const [showSponsors, setShowSponsors] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleFilter = (searchTerm: string) => {
    const filtered = myData.filter((murale) =>
      murale.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMurals(filtered as Murale[]);
  };


  const handleSelectMurale = (murale: Murale) => {
    setSelectedMurale(murale);
    setIsSidebarOpen(false); // chiude la sidebar su mobile
  };


  const handleFindNearestMurale = (currentCoords: [number, number]) => {
    const calculateDistance = (coords1, coords2) => {
      const [lon1, lat1] = coords1;
      const [lon2, lat2] = coords2;
      const R = 6371; // raggio della Terra in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // distanza in km
    };

    const nearest = myData.reduce(
      (closest: any, murale: any) => {
        const distance = calculateDistance(currentCoords, murale.coords);
        return distance < closest.distance ? { murale, distance } : closest;
      },
      { murale: null, distance: Infinity }
    ).murale;

    setNearestMurale(nearest);
  };

  const toggleSponsors = () => {
    setShowSponsors(!showSponsors);
  };

  return (
    <div className="app flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1">
        <MapComponent
          murals={filteredMurals}
          sponsors={showSponsors ? sponsors as Sponsor[] : []}
          selectedMurale={selectedMurale}
          nearestMurale={nearestMurale}
          onFindNearest={handleFindNearestMurale}
          onCenterMap={() => setSelectedMurale(null)}
        />

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 bg-blue-500 text-white px-3 py-2 rounded md:hidden"
        >
          {isSidebarOpen ? "Chiudi" : "Menu"}
        </button>

        <Sidebar
          murals={filteredMurals}
          onFilter={handleFilter}
          onSelect={handleSelectMurale}
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0 md:block`}

        />
        <button
          onClick={toggleSponsors}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 pt-2 shadow-lg hover:bg-blue-600 rounded"
        >
          {showSponsors ? "Nascondi Sponsor" : "Mostra Sponsor"}
        </button>
      </div>
    </div>
  );
}

export default MainPage;
