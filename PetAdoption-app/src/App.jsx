import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AuthProvider from "./AuthProvider";
import useAuth from "./useAuth";
import NavBar from "./components/NavBar";
import Browse from "./components/Browse";
import Home from "./components/Home";
import About from "./components/About";
// import Contact from "./components/Contact";
import Adopt from "./components/AdoptForm";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Release from "./components/Release";

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <Router basename="/Assignment-3/">
        <AuthProvider>
          <div className="app-shell">
            <NavBar />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route
                  path="/adopt"
                  element={
                    <RequireAuth>
                      <Adopt />
                    </RequireAuth>
                  }
                />
                <Route path="/release" element={<Release />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </Router>

      <footer className="app-footer">
        <p>&copy; 2026 Woofs & Meows. All rights reserved.</p>
        <section aria-label="Contact information">
          <h3>Contact Us</h3>
          <p>
            If you have any questions or inquiries, please feel free to reach out
            to us:
          </p>
          <span>Email: petadoption@mail.com</span>
          <span>Phone: +65 8234 5678</span>
          <span>Address: 123 Pet Adoption Street, Singapore, 123456</span>
        </section>
      </footer>
    </>
  );
}

export default App;
