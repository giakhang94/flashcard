import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import CreateUser from "./pages/admin/createUser";
import { Bounce, ToastContainer } from "react-toastify";
import AddCard from "./pages/admin/addCard";
import AllCards from "./pages/AllCards";
import Home from "./pages/Home";
import EditCard from "./pages/admin/editCard";
import Navbar from "./components/Navbar";
import ProtectedLayout from "./components/ProtectedLayout";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Routes>
          <Route path="auth/login" element={<Login />} />
          <Route element={<ProtectedLayout />}>
            <Route path="admin/register" element={<CreateUser />} />
            <Route path="admin/cards/add" element={<AddCard />} />
            <Route path="admin/cards/edit/:id" element={<EditCard />} />
            <Route path="admin/cards/all" element={<AllCards />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
