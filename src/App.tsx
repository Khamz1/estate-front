import { Routes, Route } from "react-router-dom";
import Estate from "./components/Estates/Estate";
import Auth from "./pages/Authorization/Auth";
import Login from "./pages/Authorization/Login";

import Header from "./components/Header/Header";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <Header />
      </div>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Estate />} />
      </Routes>
    </>
  );
}

export default App;
