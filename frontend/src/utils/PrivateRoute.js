import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = () => {
    let { user } = useContext(AuthContext)

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Outlet /> : <Navigate to="/welcome" />;
}

export default PrivateRoute;