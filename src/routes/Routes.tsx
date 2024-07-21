import { BrowserRouter, Routes, Route } from "react-router-dom"
import SplashPage from "@/modules/Splash";
import Authen from "@/modules/Authen";
import Dashboard from '../modules/Dashboard';
import MiddleRoute from "@/components/composables/MiddleRoute";

const ApplicationNavigator = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MiddleRoute component={<SplashPage/>}/>} />
          <Route path="/auth/*" element={<Authen/>} />
          <Route path="/home/*" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default ApplicationNavigator;
