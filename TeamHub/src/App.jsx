import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AuthProvider } from './context/AuthContext'
import { Footer, Header } from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { theme } from './theme/theme'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AuthPage from './pages/AuthPage'
import { DashboardPage, TasksPage } from './pages/DashboardPage'

export default function App() { return <ThemeProvider theme={theme}><CssBaseline/><BrowserRouter><AuthProvider><div className="app-shell"><Header/><main className="main-content"><Routes><Route path="/" element={<HomePage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/login" element={<AuthPage/>}/><Route path="/register" element={<AuthPage register/>}/><Route path="/tasks" element={<ProtectedRoute><TasksPage/></ProtectedRoute>}/><Route path="/employer" element={<ProtectedRoute role="employer"><DashboardPage role="employer"/></ProtectedRoute>}/><Route path="/employee" element={<ProtectedRoute role="employee"><DashboardPage role="employee"/></ProtectedRoute>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></main><Footer/></div></AuthProvider></BrowserRouter></ThemeProvider> }
