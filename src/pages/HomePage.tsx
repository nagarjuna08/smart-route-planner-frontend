import RouteForm from "../components/RouteForm";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <div className="overlay">
        <div className="hero-section">
          <h1>SMART ROUTE PLANNER</h1>

          <p>Plan Smarter. Travel Better.</p>

          <p className="sub-text">
            Discover optimized routes, restaurants, hotels, fuel stations and
            tourist places along your journey.
          </p>

          <RouteForm />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
