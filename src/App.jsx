import './index.css'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layouts/MainLayout'
import { AuthLayout } from './components/layouts/AuthLayout'
import  { DashLayout } from './components/layouts/DashLayout.jsx'
import { Hero } from './pages/Hero.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Analytics } from './pages/Analytics.jsx'
import { Subscriptions } from './pages/Subscriptions.jsx'
import { Expenses } from './pages/Expenses.jsx'
import { Reports } from './pages/Reports.jsx'
import { Settings } from './pages/Settings.jsx'
import { SmartInsights } from './pages/SmartInsights.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { UserProvider } from './context/UserContext.jsx'

function App() {
  
  return (
    <UserProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Hero />} />
        </Route>

        <Route element={<DashLayout />}>
          <Route path='/main/dashboard' element={<Dashboard />} />
          <Route path='/main/subscriptions' element={<Subscriptions />} />
          <Route path='/main/expenses' element={<Expenses />} />
          <Route path='insights/smart-insights' element={<SmartInsights />} />
          <Route path='insights/analytics' element={<Analytics />} />
          <Route path='/main/reports' element={<Reports />} />
          <Route path='/account/settings' element={<Settings />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </UserProvider>
  )
}

export default App;
