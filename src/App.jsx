
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login';
import CreateGroup from './pages/CreateGroup';
import PrivateRoutes from './utils/PrivateRoutes'
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/profile';
import Signup from './pages/signup';
import MyGroups from './pages/MyGroups';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<CreateGroup/>} path="/criar-grupo/:id" exact/>
                <Route element={<MyGroups/>} path="/meus-grupos/:id" exact/>
                <Route element={<Profile/>} path="/perfil/:id" exact/>
                <Route element={<Home/>} path="/:id"/>
            </Route>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Home/>} path="/"/>
            <Route element={<Signup/>} path="/cadastro"/>
            <Route element={<ErrorPage/>} path="*"/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;