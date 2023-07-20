import { Route, Routes, Navigate } from "react-router-dom";
import RouteGuard from "./auth0/RouteGuard";

// Components
import Welcome from "./pages/Welcome";
import Layout from "./layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/welcome" />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/home" element={<RouteGuard component={Layout} />} />
    </Routes>
  );
}

export default App;
