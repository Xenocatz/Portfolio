import { Route, Routes } from "react-router";
import App from "../App";
import Home from "../page/Home";
import About from "../page/About";
import Project from "../page/Project";
import Contact from "../page/Contact";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
