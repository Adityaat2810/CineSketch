import React, { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from './components/Loader';
import Header from "./components/Header";
import ProtectedRoute from "./components/authentication/protect-route"; // Import the ProtectedRoute component

const Home = lazy(() => import("./pages/home"));
const GameRoom = lazy(() => import('./pages/gameRoom'));
const SignUp = lazy(() => import('./pages/signup'));
const SignIn = lazy(() => import('./pages/signin'));

const App = () => {
  const location = useLocation();
  const noHeaderRoutes = ['/signup', '/signin', '/signup/', '/signin/'];

  return (
    <Suspense fallback={<Loader />}>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route element={<ProtectedRoute />}> {/* Wrap protected routes */}
          <Route path='/' element={<Home />} />
          <Route path='/game-room' element={<GameRoom />} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </Suspense>
  );
}

export default App;
