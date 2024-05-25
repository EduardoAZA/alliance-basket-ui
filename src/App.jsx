
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login';
import CreateGroup from './pages/CreateGroup';
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<CreateGroup/>} path="/criar-grupo" exact/>
            </Route>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Home/>} path="/"/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;