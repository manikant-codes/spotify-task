import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/public/Layout";
import Home from "./pages/Home";
import PlaylistForm from "./pages/PlaylistForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthGuard from "./guards/AuthGuard";
import Dashboard from "./pages/Dashboard";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="playlist/:id"
            element={
              <AuthGuard>
                <PlaylistForm />
              </AuthGuard>
            }
          />
        </Route>
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <LayoutAdmin />
            </AuthGuard>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="playlist/:id" element={<PlaylistForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
