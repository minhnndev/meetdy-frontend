import { BrowserRouter, Routes, Route } from "react-router-dom"
import SplashPage from "@/modules/Splash";
import Authen from "@/modules/Authen";
// import ProtectedRoute from '../components/composables/ProtectedRoute/index';
import Dashboard from '../modules/Dashboard';

const ApplicationNavigator = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<ProtectedRoute component={<SplashPage/>}/>} /> */}
          <Route path="/" element={<SplashPage/>} />
          <Route path="/auth/*" element={<Authen/>} />
          <Route path="/home" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default ApplicationNavigator;
