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
import Zoom from "ol/control/Zoom";
import { defaults as defaultControls } from "ol/control/defaults";
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
  const overlayRef = useRef<Overlay | null>(null);
  const activePopupFeatureRef = useRef<Feature | null>(null);
  const popupContentRef = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<HTMLElement | null | undefined>(null);

  const closePopup = () => {
    overlayRef.current?.setPosition(undefined);
    activePopupFeatureRef.current = null;
    if (popupContentRef.current) {
      popupContentRef.current.innerHTML = "";
    }
  };

  useEffect(() => {
    setElement(document.getElementById("popup-content"));
  }, [document.getElementById("popup-content")])

  useEffect(() => {
    if (element) {
      const zoomInLabel = document.createElement("span");
      zoomInLabel.className = "map-zoom-label map-zoom-in-label";
      zoomInLabel.textContent = "+";

      const zoomOutLabel = document.createElement("span");
      zoomOutLabel.className = "map-zoom-label map-zoom-out-label";
      zoomOutLabel.textContent = "−";

      const map = new Map({
        target: "map",
        controls: defaultControls({ zoom: false }).extend([
          new Zoom({
            zoomInLabel,
            zoomOutLabel,
            zoomInTipLabel: "Ingrandisci",
            zoomOutTipLabel: "Riduci zoom",
          }),
        ]),
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

      map.on("pointermove", (evt) => {
        const hit = map.hasFeatureAtPixel(evt.pixel);
        const target = map.getTargetElement();
        target.style.cursor = hit ? "pointer" : "";
      });

      const vectorLayer = new VectorLayer({
        source: vectorSourceRef.current,
      });

      map.addLayer(vectorLayer);

      // Overlay per popup
      const overlay = new Overlay({
        element: document.getElementById("popup") || undefined,
        positioning: "bottom-center",
        stopEvent: true,
      });
      map.addOverlay(overlay);
      overlayRef.current = overlay;

      map.on("click", (event) => {
        const clickedFeature = map.forEachFeatureAtPixel(event.pixel, (feature) =>
          feature instanceof Feature && feature.get("details") ? feature : undefined
        );

        if (!(clickedFeature instanceof Feature)) {
          closePopup();
          return;
        }

        if (activePopupFeatureRef.current === clickedFeature) {
          closePopup();
          return;
        }

        const geometry = clickedFeature.getGeometry();
        if (geometry instanceof Point) {
          activePopupFeatureRef.current = clickedFeature;
          overlay.setPosition(geometry.getCoordinates());
          if (popupContentRef.current) {
            popupContentRef.current.innerHTML = clickedFeature.get("details");
          }
        } else {
          closePopup();
        }
      });

      mapRef.current = map;

      return () => {
        map.setTarget(undefined);
        overlayRef.current = null;
        activePopupFeatureRef.current = null;
      };
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
            scale: 2.5, // <--- prima era 25, ora è più proporzionato
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
    <div className="map-container">
      <div
        id="popup"
        className="absolute bg-white border rounded-lg shadow-md p-2 pr-8 w-48"
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Chiudi popup"
          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          ×
        </button>
        <div id="popup-content" ref={popupContentRef} />
      </div>
      <div id="map" style={{ width: "100%", height: "100vh" }} />
      <button
        onClick={handleFindNearestClick}
        className="map-action-button map-location-button"
        aria-label="Trova il murale più vicino"
      >
        <FontAwesomeIcon icon={faLocationDot} />
      </button>
      <button
        onClick={handleCenterNaples}
        className="map-action-button map-center-button"
        aria-label="Centra la mappa su Napoli"
      >
        <FontAwesomeIcon icon={faAlignCenter} />
      </button>
    </div>
  );
};

export default MapComponent;
