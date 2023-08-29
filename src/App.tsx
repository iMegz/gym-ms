import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/LoginPage/Login";

function App() {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="/*" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
