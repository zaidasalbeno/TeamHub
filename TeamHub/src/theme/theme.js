import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: { primary: { main: '#226c5c', dark: '#174b41', light: '#e8f1ee' }, secondary: { main: '#d68c49' }, background: { default: '#f7f8f6', paper: '#ffffff' }, text: { primary: '#202b28', secondary: '#697571' }, divider: '#e5e9e6', success: { main: '#36765d' }, warning: { main: '#a66b27' } },
  typography: { fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', h1: { fontWeight: 650, letterSpacing: '-.045em' }, h2: { fontWeight: 650, letterSpacing: '-.035em' }, h3: { fontWeight: 650, letterSpacing: '-.025em' }, button: { textTransform: 'none', fontWeight: 600 } },
  shape: { borderRadius: 12 }, components: { MuiButton: { styleOverrides: { root: { borderRadius: 9, padding: '9px 16px' } } }, MuiCard: { styleOverrides: { root: { border: '1px solid #e5e9e6', boxShadow: '0 2px 10px rgba(27,49,41,.035)' } } } },
})
