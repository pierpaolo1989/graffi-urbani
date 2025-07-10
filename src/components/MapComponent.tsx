import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import Overlay from "ol/Overlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Murale, Sponsor } from "../models/Model";


interface MapComponentProps {
  murals: Murale[];
  sponsors: Sponsor[];
  selectedMurale: Murale | null;
  nearestMurale: Murale | null;
  onFindNearest: ([any, number]) => void;
  onCenterMap: () => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ murals, sponsors, selectedMurale, nearestMurale, onFindNearest, onCenterMap }) => {

  // Coordinate approssimative per la provincia di Napoli (in EPSG:3857)
  const napoliExtent = [
    1547340.9220265027, // minX
    4975536.361069247,  // minY
    1625264.5655817944, // maxX
    5019719.452103295   // maxY
  ];

  const mapRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef(new VectorSource());
  const [element, setElement] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    setElement(document.getElementById("popup-content"));
  }, [document.getElementById("popup-content")])

  useEffect(() => {
    if (element) {
      const map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([14.2681, 40.8518]), // Coordinate di Napoli
          zoom: 13,
          extent: napoliExtent,
        }),
      });

      const vectorLayer = new VectorLayer({
        source: vectorSourceRef.current,
      });

      map.addLayer(vectorLayer);

      // Overlay per popup
      const overlay = new Overlay({
        element: document.getElementById("popup") || undefined,
        positioning: "bottom-center",
        stopEvent: false,
      });
      map.addOverlay(overlay);

      map.on("click", (event) => {
        map.forEachFeatureAtPixel(event.pixel, (feature) => {
          const details = feature.get("details");
          if (details) {
            const geometry = feature.getGeometry();
            if (geometry && geometry.getType() === "Point") {
              const coords = (geometry as Point).getCoordinates(); // Cast esplicito a Point
              overlay.setPosition(coords);
              const popupContent = document.getElementById("popup-content");
              if (popupContent) {
                popupContent.innerHTML = details;
              } else {
                console.error("Element with ID 'popup-content' not found.");
              }
            } else {
              overlay.setPosition(undefined);
            }
          }
        });
      });

      mapRef.current = map;

      return () => map.setTarget(undefined);
    }
  }, [element]);

  useEffect(() => {
    vectorSourceRef.current.clear();

    const addMarkers = (items, color) => {
      items.forEach((item) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(item.coords)),
          details: `<strong>${item.name}</strong><br>${item.details}`,
        });
        feature.setStyle(
          new Style({
            image: new Icon({
              src: `https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg`,
              scale: 1.5,
            }),
          })
        );
        vectorSourceRef.current.addFeature(feature);
      });
    };

    addMarkers(murals, "e/ec");
    addMarkers(sponsors, "c/cd");
  }, [murals, sponsors]);

  useEffect(() => {
    if (selectedMurale && mapRef.current) {
      const view = mapRef.current.getView();
      view.animate({
        center: fromLonLat(selectedMurale.coords),
        zoom: 15,
        duration: 1000,
      });
    }
  }, [selectedMurale]);

  useEffect(() => {
    if (nearestMurale && mapRef.current) {
      const view = mapRef.current.getView();
      view.animate({
        center: fromLonLat(nearestMurale.coords),
        zoom: 15,
        duration: 1000,
      });

      const nearestFeature = new Feature({
        geometry: new Point(fromLonLat(nearestMurale.coords)),
      });
      nearestFeature.setStyle(
        new Style({
          image: new Icon({
            src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
            scale: 25,
          }),
        })
      );
      vectorSourceRef.current.addFeature(nearestFeature);
    }
  }, [nearestMurale]);

  const handleFindNearestClick = () => {
    const currentCoords: [number, number] = [14.2681, 40.8518];
    onFindNearest(currentCoords);
  };

  const handleCenterNaples = () => {
    if (mapRef.current) {
      const view = mapRef.current.getView();
      view.animate({
        center: fromLonLat([14.2681, 40.8518]),
        zoom: 13,
        duration: 1000,
      });
      if (onCenterMap) onCenterMap();
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        id="popup"
        className="absolute bg-white border rounded-lg shadow-md p-2 w-48"
      >
        <div id="popup-content" />
      </div>
      <div id="map" style={{ width: "100%", height: "100vh" }} />
      <button
        onClick={handleFindNearestClick}
        style={{
          position: "absolute",
          top: "80px",
          left: "7px",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}

      >
        <FontAwesomeIcon icon={faLocationDot} style={{ "color": "#666666" }} />
      </button>
      <button
        onClick={handleCenterNaples}
        className="absolute px-3 py-2 shadow hover:bg-gray-800"
        style={{
          position: "absolute",
          top: "130px",
          left: "7px",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faAlignCenter} style={{ "color": "#666666" }} />
      </button>
    </div>
  );
};

export default MapComponent;
