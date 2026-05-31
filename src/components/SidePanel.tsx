import { getPlaces } from "../api/placeApi";
import { addStop } from "../api/routeApi";
import { useNavigate } from "react-router-dom";
import "../styles/SidePanel.css";

type Props = {
  routeData: any;
  setPlaces: any;
  selectedStop: any;
};

function SidePanel({ routeData, setPlaces, selectedStop }: Props) {
  const loadPlaces = async (category: string) => {
    try {
      const data = await getPlaces(routeData.coordinates, category);

      setPlaces(data);
    } catch (error) {
      console.error(error);
    }
  };
  const navigate = useNavigate();
  const optimizeRoute = async () => {
    if (!selectedStop) {
      alert("Please select a stop first");
      return;
    }

    try {
      const response = await addStop({
        startLocation: routeData.startLocation,

        destinationLocation: routeData.destinationLocation,

        placeId: selectedStop.placeId,
        placeName: selectedStop.name,

        latitude: selectedStop.latitude,

        longitude: selectedStop.longitude,
      });

      navigate("/route", {
        state: {
          ...response,
          startLocation: routeData.startLocation,
          destinationLocation: routeData.destinationLocation,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="side-panel">
      {/* Route Summary */}
      <div className="summary-card">
        <h2>📊 Route Summary</h2>

        <div className="summary-item">
          <span>📏 Distance</span>
          <strong>{routeData?.totalDistance?.toFixed(2)} km</strong>
        </div>

        <div className="summary-item">
          <span>⏱ Duration</span>
          <strong>{routeData?.totalDuration?.toFixed(0)} min</strong>
        </div>
      </div>

      {/* Route Itinerary */}
      <div className="itinerary-card">
        <h3>🗺 Route Itinerary</h3>

        {routeData?.itinerary?.map((place: string, index: number) => (
          <div key={index}>
            <div
              className={
                place.toLowerCase().includes("stop")
                  ? "route-step stop"
                  : "route-step"
              }
            >
              {place}
            </div>

            {index < routeData.itinerary.length - 1 && (
              <div className="arrow">↓</div>
            )}
          </div>
        ))}
      </div>

      {/* Places */}
      <div className="places-card">
        <h3>📍 Places Along Route</h3>
        {selectedStop && (
          <div className="selected-card">
            <h3>⭐ Selected Stop</h3>

            <div className="selected-place">{selectedStop.name}</div>

            <button className="optimize-btn" onClick={optimizeRoute}>
              Optimize Route
            </button>
          </div>
        )}
        <button
          className="restaurant-btn"
          onClick={() => loadPlaces("RESTAURANT")}
        >
          🍴 Restaurants
        </button>

        <button className="hotel-btn" onClick={() => loadPlaces("HOTEL")}>
          🏨 Hotels
        </button>

        <button className="fuel-btn" onClick={() => loadPlaces("FUEL_STATION")}>
          ⛽ Fuel Stations
        </button>

        <button className="tourist-btn" onClick={() => loadPlaces("TOURIST")}>
          🏛 Tourist Places
        </button>
      </div>
    </div>
  );
}

export default SidePanel;
