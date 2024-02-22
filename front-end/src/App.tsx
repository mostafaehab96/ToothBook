import { Route, Routes, BrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import Homepage from "./pages/Homepage/Homepage";
import CasesPage from "./pages/CasesPage/CasesPage";
import CasePage from "./pages/CasePage/CasePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import { CasesProvider } from "../contexts/CasesContext";
import { AuthenticationProvider } from "../contexts/AuthenticationContext";

function App() {
  return (
    <AuthenticationProvider>
      <CasesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="case/:id" element={<CasePage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </CasesProvider>
    </AuthenticationProvider>
  );
}

export default App;
