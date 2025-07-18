import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Education from "./components/Education";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Education />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;