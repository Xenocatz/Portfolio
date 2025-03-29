import { Route, Routes } from "react-router";
import App from "../App";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
}
