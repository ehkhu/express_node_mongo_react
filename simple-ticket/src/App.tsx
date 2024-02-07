// import './App.css'
// import Login from './pages/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Tickets from './pages/Tickets'
import AppLayout from './ui/AppLayout'
import Login from './pages/Login'
import ProtectedRoute from './ui/ProtectedRoute'
import PageNotFound from './pages/PageNotFound'
import TicketDetail from './features/tickets/Ticket'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Tickets />} />
        <Route path="tickets/:ticketId" element={<TicketDetail />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
