import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Claims from '../pages/Claims';
import Policies from '../pages/Policies';
import TrackUser from '../pages/TrackUser';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/claims" element={<Claims />} />
      <Route path="/policies" element={<Policies />} />
      <Route path="/track-user" element={<TrackUser />} />
    </Routes>
  );
};

export default AppRoutes;