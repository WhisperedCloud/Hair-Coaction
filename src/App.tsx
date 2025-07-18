import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Education from "./components/Education";
import Consultant from "./components/Consultation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Education />} />
        <Route path="/consultation" element={<Consultant />} />
      </Routes>
    </BrowserRouter>

    
  );
}

export default App;