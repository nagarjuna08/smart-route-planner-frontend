import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RoutePage from "./pages/RoutePage";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/route" element={<RoutePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
