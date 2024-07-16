import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom"
import Loader from './components/Loader';

const Home = lazy(() => import("./pages/home"));
const GameRoom= lazy(()=> import('./pages/gameRoom'))

const App = () => {

  return (
   <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/game-room' element={<GameRoom />} />
    </Routes>
   </Suspense>
  )
}

export default App