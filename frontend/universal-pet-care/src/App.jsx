import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import VeterinarianListing from "./components/veterinarian/VeterinarianListing";
import BookAppointment from "./components/appointment/BookAppointment";
import Veterinarian from "./components/veterinarian/Veterinarian";
import UserRegistration from "./components/user/UserRegistration";
import Login from "./components/auth/Login";
import UserProfile from "./components/user/UserProfile";
import UserDashboard from "./components/user/UserDashboard";
import UserUpdate from "./components/user/UserUpdate";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/doctors" element={<VeterinarianListing />} />
        <Route
          path="/book-appointment/:recipientId/new-appointment"
          element={<BookAppointment />}
        />
        <Route
          path="/veterinarian/:veterinarianId/veterinarian"
          element={<Veterinarian />}
        />

        <Route path="/register-user" element={<UserRegistration />} />
        <Route path="/update-user/:userId/update" element={<UserUpdate />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-dashboard/:userId/my-dashboard"
          element={<UserDashboard />}
        />
      </Route>
    )
  );
  return (
    <main className="">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
