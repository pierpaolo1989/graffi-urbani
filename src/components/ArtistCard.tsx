import React from "react";
import { StreetArtist } from "../models/artists";

interface Props {
  artist: StreetArtist;
}

const ArtistCard: React.FC<Props> = ({ artist }) => (
  <div style={{
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    width: "300px",
    margin: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  }}>
    <img src={artist.image} alt={artist.name} style={{ width: "100%", borderRadius: "8px" }} />
    <h3>{artist.name}</h3>
    <p>{artist.bio}</p>
  </div>
);

export default ArtistCard;
