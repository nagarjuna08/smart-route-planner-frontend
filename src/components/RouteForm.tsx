import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RouteForm.css";

import { findRoute } from "../api/routeApi";

function RouteForm() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleFindRoute = async () => {
    if (!start.trim() || !end.trim()) {
      alert("Please enter both origin and destination locations.");
      return;
    }

    setIsSearching(true);

    try {
      const routeData = await findRoute(start, end);

      navigate("/route", {
        state: {
          ...routeData,
          startLocation: start,
          destinationLocation: end,
        },
      });
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to find route");
      setIsSearching(false);
    }
  };

  return (
    <div className="route-form-container">
      <div className="route-form">
        <div className="input-row">
          <label>ORIGIN :</label>

          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div className="input-row">
          <label>DESTINATION :</label>

          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <button
          className="find-btn"
          onClick={handleFindRoute}
          disabled={isSearching}
          aria-busy={isSearching}
        >
          {isSearching ? "SEARCHING ROUTE..." : "FIND ROUTE"}
        </button>

        {isSearching && (
          <div className="search-status">
            Your route search has started. Please wait while we find the best
            route.
          </div>
        )}
      </div>
    </div>
  );
}

export default RouteForm;
