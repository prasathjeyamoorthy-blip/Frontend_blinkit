import React, { useRef, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl, useMap } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

// Carto Voyager – detailed, colourful OSM-based style (no API key)
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

function MapFlyTo({ latitude, longitude, zoom = 14 }) {
  const { current: mapRef } = useMap();
  useEffect(() => {
    if (!mapRef?.getMap || latitude == null || longitude == null) return;
    const m = mapRef.getMap();
    if (m && m.flyTo) m.flyTo({ center: [longitude, latitude], zoom, duration: 800 });
  }, [mapRef, latitude, longitude, zoom]);
  return null;
}

export default function LocationMap({
  lat,
  lng,
  address,
  showStore = false,
  storeLat,
  storeLng,
}) {
  const mapRef = useRef(null);
  const [popupOpen, setPopupOpen] = React.useState(true);

  return (
    <div className="location-map-wrap">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 14,
        }}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%", borderRadius: "0 0 10px 10px" }}
        scrollZoom={false}
        dragPan={true}
        dragRotate={false}
        touchZoomRotate={true}
      >
        <MapFlyTo latitude={lat} longitude={lng} zoom={14} />

        {/* Your location – pin marker */}
        <Marker
          longitude={lng}
          latitude={lat}
          anchor="bottom"
          onClick={() => setPopupOpen((o) => !o)}
        >
          <div className="location-pin user-pin" title="Your location" />
        </Marker>
        {popupOpen && (
          <Popup
            longitude={lng}
            latitude={lat}
            anchor="bottom"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setPopupOpen(false)}
            offset={24}
          >
            <div className="location-popup">
              <strong>Your location</strong>
              {address && <p className="location-address">{address}</p>}
            </div>
          </Popup>
        )}

        {/* Nearest store – green circle */}
        {showStore && storeLat != null && storeLng != null && (
          <Marker longitude={storeLng} latitude={storeLat} anchor="center">
            <div className="location-pin store-pin" title="Nearest store" />
          </Marker>
        )}

        <NavigationControl position="top-left" showCompass={false} />
      </Map>
    </div>
  );
}
