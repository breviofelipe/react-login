import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import LoginPage from './components/Login/LoginPage'
import Tarefa from './components/Tarefa/Tarefa'
import App from './components/App/App'

export default function AppRouter () {
  return <Router>
        <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<Dashboard />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="tarefa" element={<Tarefa />} />
            </Route>
        </Routes>
    </Router>
}
