import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import LoginPage from './components/Login/LoginPage'
import Tarefa from './components/Tarefa/Tarefa'
import CardTarefa from './components/CardTarefa/CardTarefa'
import App from './components/App/App'
import ProtectedRoute from './guard/ProtectedRoute'
import Auth from './auth/Auth'

export default function AppRouter () {
  return <Router>
        <Routes>

            <Route path="/" element={<Auth />} >
                <Route path='login' element={<LoginPage />} />
            </Route>
            <Route path="/" element={<App />} >
                <Route index element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
                } />
                <Route path="tarefa" element={
                 <ProtectedRoute>
                    <Tarefa />
                </ProtectedRoute>
                } />
                <Route path="card-tarefa" element={<ProtectedRoute>
                    <CardTarefa />
                </ProtectedRoute>} />
            </Route>
        </Routes>
    </Router>
}
