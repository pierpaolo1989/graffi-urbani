import React from "react";
import ArtistCard from "../components/ArtistCard.tsx";
import Navbar from "../components/Navbar.tsx";

import { artists } from "../models/artists.ts";


function Artists() {
  return (
    <div className="app flex flex-col h-screen">
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1>Street Artist di Napoli</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {artists.map((artist) => (
            <ArtistCard key={artist.name} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artists;

