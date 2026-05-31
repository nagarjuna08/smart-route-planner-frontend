import { useLocation } from "react-router-dom";

import RouteMap from "../components/RouteMap";
import SidePanel from "../components/SidePanel";
import { useState } from "react";

function RoutePage() {
  const location = useLocation();
  const [places, setPlaces] = useState([]);
  const routeData = location.state;
  const [selectedStop, setSelectedStop] = useState(null);
  console.log(routeData);
  return (
    <div className="route-page">
      <div className="header">SMART ROUTE PLANNER</div>

      <div className="route-content">
        <RouteMap
          routeData={routeData}
          places={places}
          setSelectedStop={setSelectedStop}
        />
  
        <SidePanel
          routeData={routeData}
          setPlaces={setPlaces}
          selectedStop={selectedStop}
        />
      </div>
    </div>
  );
}

export default RoutePage;
