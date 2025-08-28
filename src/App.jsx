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
import TestingGuide from './TestingGuide';
import Showcase from './Showcase';
import NewPage from './NewPage';

function PrivateRoute({ element }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Login />;
}

function AppContent() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-apl" element={<PrivateRoute element={<AddAPL />} />} />
        <Route path="/program" element={<PrivateRoute element={<Program />} />} />
        <Route path="/testing-guide" element={<PrivateRoute element={<TestingGuide />} />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/newpage" element={<PrivateRoute element={<NewPage />} />} />
      </Routes>
    </>
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
