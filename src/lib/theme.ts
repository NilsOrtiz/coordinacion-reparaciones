'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',      // Azul corporativo
      light: '#42a5f5',     // Azul claro
      dark: '#1565c0',      // Azul oscuro
    },
    secondary: {
      main: '#424242',      // Gris oscuro
      light: '#6d6d6d',
      dark: '#1b1b1b',
    },
    success: {
      main: '#4caf50',      // Verde - Disponible/OK
    },
    warning: {
      main: '#ff9800',      // Naranja - Mantenimiento necesario
    },
    error: {
      main: '#f44336',      // Rojo - Problema crítico
    },
    info: {
      main: '#2196f3',      // Azul información
    },
    background: {
      default: '#fafafa',   // Fondo muy claro
      paper: '#ffffff',     // Fondo de cards
    },
    text: {
      primary: '#212121',   // Texto principal
      secondary: '#757575', // Texto secundario
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.125rem',
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },
});