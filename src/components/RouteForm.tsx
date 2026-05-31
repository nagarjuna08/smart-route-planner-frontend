import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RouteForm.css";

import { findRoute } from "../api/routeApi";

function RouteForm() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const navigate = useNavigate();

  const handleFindRoute = async () => {
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
    }
  };

  return (
    <div className="route-form-container">
      <div className="route-form">
        <div className="input-row">
          <label>START :</label>

          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div className="input-row">
          <label>END :</label>

          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        <button className="find-btn" onClick={handleFindRoute}>
          FIND ROUTE
        </button>
      </div>
    </div>
  );
}

export default RouteForm;
