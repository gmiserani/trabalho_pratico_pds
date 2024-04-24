import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const auth = {
        token: localStorage.getItem('token')
    }

    return (
        auth.token ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default PrivateRoute