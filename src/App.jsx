import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import HootList from "./components/HootList/HootList";
import HootDetail from "./components/HootDetails/HootDetails";
import HootForm from "./components/HootForm/HootForm";
import * as authService from "./services/authService";
import * as hootService from "./services/hootService";
import CommentForm from "./components/CommentForm/CommentForm";


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
    setHoots([]);
  };

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    navigate("/hoots");
  };

  const handleDeleteHoot = async (hootId) => {
    const deletedHoot = await hootService.deleteHoot(hootId); // Call delete service
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id)); // Remove from state
    navigate("/hoots"); // Navigate back to the HootList page
  };

  const handleUpdateHoot = async (hootId, hootFormData) => {
    const updatedHoot = await hootService.update(hootId, hootFormData);
    setHoots(
      hoots.map((hoot) => (hoot._id === updatedHoot._id ? updatedHoot : hoot))
    );

    // Navigate back to the updated hoot's details page
    navigate(`/hoots/${hootId}`);
  };

  useEffect(() => {
    const fetchHoots = async () => {
      if (user) {
        const hootsData = await hootService.index();
        setHoots(hootsData);
      }
    };
    fetchHoots();
  }, [user]);

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
            <Route path="/hoots/:hootId" element={<HootDetail handleDeleteHoot={handleDeleteHoot} />} />
            <Route path="/hoots/new" element={<HootForm handleAddHoot={handleAddHoot} />} />
          </>
        ) : (
            <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        <Route path="/hoots/:hootId/edit" element={<HootForm handleUpdateHoot={handleUpdateHoot} />} />
        <Route path="/hoots/:hootId/comments/:commentId/edit" element={<CommentForm isEdit={true} />} />
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;
