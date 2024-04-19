import { Route, Routes, HashRouter } from "react-router-dom";
import { CasesProvider } from "./contexts/CasesContext";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { UserCasesProvider } from "./contexts/UserCasesContext";
import { Suspense, lazy } from "react";
import FullPageSpinner from "./components/Alerts/FullPageSpinner";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const CasesPage = lazy(() => import("./pages/CasesPage/CasesPage"));
const CasePage = lazy(() => import("./pages/CasePage/CasePage"));
const SignupPage = lazy(() => import("./pages/SignupPage/SignupPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const AddCasePage = lazy(() => import("./pages/AddCasePage/AddCasePage"));

function App() {
  return (
    <HashRouter>
      <AuthenticationProvider>
        <CasesProvider>
          <UserCasesProvider>
            <Suspense fallback={<FullPageSpinner />}>
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
            </Suspense>
          </UserCasesProvider>
        </CasesProvider>
      </AuthenticationProvider>
    </HashRouter>
  );
}

export default App;
