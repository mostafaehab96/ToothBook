import { Route, Routes, HashRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import CasesPage from "./pages/CasesPage/CasesPage";
import CasePage from "./pages/CasePage/CasePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import { CasesProvider } from "../contexts/CasesContext";
import { AuthenticationProvider } from "../contexts/AuthenticationContext";
import AddCasePage from "./pages/AddCasePage/AddCasePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <HashRouter>
      <AuthenticationProvider>
        <CasesProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignupPage />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="case/:id" element={<CasePage />} />
            <Route path="profile/" element={<ProfilePage />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="addCase"
              element={
                <ProtectedRoute>
                  <AddCasePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CasesProvider>
      </AuthenticationProvider>
    </HashRouter>
  );
}

export default App;
