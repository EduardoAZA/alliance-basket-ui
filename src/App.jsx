import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import CreateGroup from './pages/CreateGroup';
import PrivateRoutes from './utils/PrivateRoutes';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/profile';
import Signup from './pages/signup';
import MyGroups from './pages/MyGroups';
import Group from './pages/Group';
import Support from './pages/Support';
import Ticket from './pages/Ticket';

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/:id" element={<Home />} />
              <Route path="/criar-grupo/:id" element={<CreateGroup />} />
              <Route path="/meus-grupos/:id" element={<MyGroups />} />
              <Route path="/perfil/:id" element={<Profile />} />
              <Route path="/grupo/:idGroup/cliente/:id" element={<Group />} />
              <Route path="/suporte/:id" element={<Support />} />
              <Route path="/suporte/:id/ticket/:idTicket" element={<Ticket />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Signup />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
