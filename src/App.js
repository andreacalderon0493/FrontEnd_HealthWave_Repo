// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddPostPage from "./pages/AddPostPage/AddPostPage";
import DirectMessagePage from "./pages/DirectMessagePage/DirectMessagePage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import MyProfilePage from "./pages/MyProfilePage/MyProfilePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AddCommentPage from "./pages/AddCommentPage/AddCommentPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/AddPostPage"
          element={
            <PrivateRoute>
              <AddPostPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/Message"
          element={
            <PrivateRoute>
              <DirectMessagePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/myFavorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/myProfile"
          element={
            <PrivateRoute>
              <MyProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/Search"
          element={
            <PrivateRoute>
              <SearchPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/addcomment/:postId"
          element={
            <PrivateRoute>
              <AddCommentPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
