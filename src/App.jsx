import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';
import Header from './Header';
import AddAPL from './AddAPL';
import { AuthProvider, useAuth } from './AuthContext';
import { UserProvider } from './UserContext';
import './App.css';
import Program from './Program';
import Showcase from './Showcase';
import NewPage from './NewPage';

function PrivateRoute({ element }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Login />;
}

function AppContent() {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/dashboard" element={isLoggedIn ? <><Header /><Dashboard /></> : <Login />} />
      <Route path="/add-apl" element={isLoggedIn ? <><Header /><AddAPL /></> : <Login />} />
      <Route path="/program" element={isLoggedIn ? <><Header /><Program /></> : <Login />} />
      <Route path="/showcase" element={<Showcase />} />
      <Route path="/newpage" element={isLoggedIn ? <NewPage /> : <Login />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
