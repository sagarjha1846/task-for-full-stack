import { Layout } from 'antd';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import { PrivateRoute } from './Components/PrivateRoute';
import Home from './Components/Home';

function App() {
  return (
    <Layout
      className="font-sans w-full h-full"
      style={{
        width: '100%',
        height: '100vh',
      }}>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
