import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "../styles/RouteMap.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type Props = {
  routeData: any;
  setSelectedStop: any;
  places: any[];
};

function FitBounds({ polyline }: any) {
  const map = useMap();

  useEffect(() => {
    if (polyline.length > 0) {
      // Add small delay to ensure map is fully rendered
      const timer = setTimeout(() => {
        try {
          map.fitBounds(polyline, { padding: [50, 50] });
          map.invalidateSize(true);
        } catch (e) {
          console.error("Error fitting bounds:", e);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [map, polyline]);

  return null;
}

function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    // Small initial delay to ensure container is mounted
    const initialTimer = setTimeout(() => {
      map.invalidateSize(true);
    }, 100);

    // Handle window resize events
    const handleResize = () => {
      map.invalidateSize(true);
    };

    // Handle orientation change on mobile
    const handleOrientationChange = () => {
      setTimeout(() => {
        map.invalidateSize(true);
      }, 300);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    // Use ResizeObserver to detect container size changes
    const mapContainer = map.getContainer();
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize(true);
    });

    if (mapContainer) {
      resizeObserver.observe(mapContainer);
    }

    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
}
function RouteMap({ routeData, places, setSelectedStop }: Props) {
  const routeCoordinates = routeData?.coordinates || [];

  const start = routeCoordinates[0];

  const destination = routeCoordinates[routeCoordinates.length - 1];

  const polyline = routeCoordinates.map((point: any) => [
    point.latitude,
    point.longitude,
  ]);
  console.log("Route Coordinates:", routeCoordinates);

  console.log("Polyline:", polyline);
  return (
    <div className="map-wrapper">
      <MapContainer
        center={[
          routeCoordinates[0]?.latitude || 17.385,
          routeCoordinates[0]?.longitude || 78.486,
        ]}
        zoom={7}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <ResizeMap />
        <FitBounds polyline={polyline} />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {start && (
          <Marker position={[start.latitude, start.longitude]}>
            <Popup>Start Location</Popup>
          </Marker>
        )}

        {destination && (
          <Marker position={[destination.latitude, destination.longitude]}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {polyline.length > 0 && <Polyline positions={polyline} />}
        {places.map((place: any) => (
          <Marker
            key={place.placeId}
            position={[place.latitude, place.longitude]}
          >
            <Popup>
              <div>
                <h4>{place.name}</h4>

                <p>📍{place.category}</p>

                <button onClick={() => setSelectedStop(place)}>Add Stop</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default RouteMap;
