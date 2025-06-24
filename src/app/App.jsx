import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./Routing";
import NavBar from "../components/NavBar";
import { AuthProvider } from "../hooks/useAuth.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="Container">
        <BrowserRouter>
          <NavBar />
          <Routing />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
