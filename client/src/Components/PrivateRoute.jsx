/* eslint-disable default-case */
import { Navigate, Outlet } from 'react-router-dom';

export { PrivateRoute };

function PrivateRoute() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn === undefined) {
    return (
      <div className="w-screen h-screen flex justify-center items-center content-center">
        loading...
      </div>
    ); // or loading indicator, etc...
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
