import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from './components/Loader';
import Header from "./components/Header";

const Home = lazy(() => import("./pages/home"));
const GameRoom = lazy(() => import('./pages/gameRoom'));
const SignUp = lazy(() => import('./pages/signup'));
const SignIn = lazy(() => import('./pages/signin'));

const App = () => {
  const location = useLocation();
  const noHeaderRoutes = ['/signup', '/signin'];

  return (
    <Suspense fallback={<Loader />}>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game-room' element={<GameRoom />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </Suspense>
  );
}

export default App;
