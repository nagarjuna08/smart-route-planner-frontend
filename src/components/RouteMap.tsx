import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Props = {
  routeData: any;
  setSelectedStop: any;
  places: any[];
};

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
        key={JSON.stringify(routeCoordinates)}
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
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
