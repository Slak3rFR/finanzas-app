import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

import Login from '../pages/Login'

import Dashboard from '../pages/Dashboard'

import Finanzas from '../pages/Finanzas'

import Tarjetas from '../pages/Tarjetas'

import Cuotas from '../pages/Cuotas'

import GastosFijos from '../pages/GastosFijos'

import Prestamos from '../pages/Prestamos'

import Configuracion from '../pages/Configuracion'

const PrivateRoute = ({
  children,
}) => {

  const { user } =
    useAuth()

  return user
    ? children
    : <Navigate to='/' />

}

const AppRouter = () => {

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path='/'
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* FINANZAS */}

        <Route
          path='/finanzas'
          element={
            <PrivateRoute>
              <Finanzas />
            </PrivateRoute>
          }
        />

        {/* TARJETAS */}

        <Route
          path='/tarjetas'
          element={
            <PrivateRoute>
              <Tarjetas />
            </PrivateRoute>
          }
        />

        {/* CUOTAS */}

        <Route
          path='/cuotas'
          element={
            <PrivateRoute>
              <Cuotas />
            </PrivateRoute>
          }
        />

        {/* GASTOS FIJOS */}

        <Route
          path='/gastos-fijos'
          element={
            <PrivateRoute>
              <GastosFijos />
            </PrivateRoute>
          }
        />

        {/* PRESTAMOS */}

        <Route
          path='/prestamos'
          element={
            <PrivateRoute>
              <Prestamos />
            </PrivateRoute>
          }
        />

        <Route
          path='/configuracion'
          element={
            <PrivateRoute>
              <Configuracion />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter