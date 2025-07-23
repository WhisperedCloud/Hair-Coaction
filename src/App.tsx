import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Eventpages from "./components/EventPage";
import Education from "./components/Education";
import Consultant from "./components/Consultation";
import CommunityPage from "./components/Community";
import Profile from "./components/Profile";
import UserFormPage from "./components/UserFormPage"; // ✅ Corrected
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<Eventpages />} />
        <Route path="/education" element={<Education />} />
        <Route path="/consultation" element={<Consultant />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userform" element={<UserFormPage />} /> {/* ✅ Matches import */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
