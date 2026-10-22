import React from "react";
import { StreetArtist } from "../models/artists";

interface Props {
  artist: StreetArtist;
}

const ArtistCard: React.FC<Props> = ({ artist }) => (
  <div
    className="card-hover-effect"
    style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      width: "300px",
      margin: "10px"
    }}
  >
    <img src={artist.image} alt={artist.name} style={{ width: "100%", borderRadius: "8px" }} />
    <h3 className="mt-2">{artist.name}</h3>
    <p>{artist.bio}</p>
  </div>
);

export default ArtistCard;
