import { Layout } from 'antd';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './Components/PrivateRoute';
import React, { Suspense } from 'react';
import ErrorFallback from './Components/ErrorBoundary';
import {ErrorBoundary} from './Components/ErrorBoundaryV2';

const Home = React.lazy(() => import('./Components/Home'));
const Login = React.lazy(() => import('./Components/Login'));
const Register = React.lazy(() => import('./Components/Register'));

function App() {
  return (
    <Layout
      className="font-sans w-full h-full"
      style={{
        width: '100%',
        height: '100vh',
      }}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <div className="w-screen h-screen flex justify-center items-center content-center">
              Loading...
            </div>
          }>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/*" element={<Home />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
