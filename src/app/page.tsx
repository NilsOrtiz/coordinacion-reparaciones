'use client';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardHeader, 
  CardContent,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import {
  DirectionsCar,
  Build,
  Warning,
  CheckCircle,
  Settings,
  Notifications,
} from '@mui/icons-material';

// Datos de ejemplo basados en el vehículo 78
const vehiculoEjemplo = {
  numeroInterno: 78,
  marca: 'Peugeot',
  modelo: 'Expert',
  patente: 'AD897UQ',
  titular: 'Duran Vaca Patricia',
  kilometrajeActual: 202056,
};

const reparacionesEjemplo = [
  {
    area: 'Motor',
    descripcion: 'Perdida de potencia',
    urgencia: 'EXTREMA_IMPORTANCIA',
    tiempoEstimado: 'Indeterminado',
    disponibilidad: 'DISPONIBLE'
  },
  {
    area: 'Motor', 
    descripcion: 'Embrague inoperativo',
    urgencia: 'EXTREMA_IMPORTANCIA',
    tiempoEstimado: '3 días',
    disponibilidad: 'DISPONIBLE'
  },
  {
    area: 'Eléctrica',
    descripcion: 'Farol con rajadura',
    urgencia: 'POCA_IMPORTANCIA',
    tiempoEstimado: '2 horas',
    disponibilidad: 'NO_DISPONIBLE'
  },
  {
    area: 'Eléctrica',
    descripcion: 'Foco quemado',
    urgencia: 'IMPORTANTE',
    tiempoEstimado: '15 minutos',
    disponibilidad: 'DISPONIBLE'
  },
];

const mantenimientosEjemplo = [
  { descripcion: 'Última revisión', kilometraje: 202056, fecha: '28/6/2025' },
  { descripcion: 'Cambio de aceite', kilometraje: 202056, fecha: '28/6/2025' },
  { descripcion: 'Cambio de pastillas', kilometraje: 202056, fecha: '28/6/2025' },
  { descripcion: 'Cambio de disco de embrague', kilometraje: 182650, fecha: '3/1/2025' },
];

function getUrgenciaColor(urgencia: string) {
  switch (urgencia) {
    case 'EXTREMA_IMPORTANCIA': return 'error';
    case 'IMPORTANTE': return 'warning';
    case 'POCA_IMPORTANCIA': return 'success';
    default: return 'default';
  }
}

function getUrgenciaText(urgencia: string) {
  switch (urgencia) {
    case 'EXTREMA_IMPORTANCIA': return 'Extrema Importancia';
    case 'IMPORTANTE': return 'Importante';
    case 'POCA_IMPORTANCIA': return 'Poca Importancia';
    default: return urgencia;
  }
}

export default function Dashboard() {
  const reparacionesCriticas = reparacionesEjemplo.filter(r => 
    r.urgencia === 'EXTREMA_IMPORTANCIA'
  ).length;
  
  const tallerDisponible = reparacionesEjemplo.filter(r => 
    r.disponibilidad === 'DISPONIBLE'
  ).length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <DirectionsCar sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Coordinación de Reparaciones - Cuenca del Plata
          </Typography>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Métricas principales */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Vehículos en Flota
                    </Typography>
                    <Typography variant="h4" component="div">
                      1
                    </Typography>
                  </Box>
                  <DirectionsCar color="primary" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Reparaciones Críticas
                    </Typography>
                    <Typography variant="h4" component="div" color="error">
                      {reparacionesCriticas}
                    </Typography>
                  </Box>
                  <Warning color="error" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Taller Disponible
                    </Typography>
                    <Typography variant="h4" component="div" color="success.main">
                      {tallerDisponible}
                    </Typography>
                  </Box>
                  <CheckCircle color="success" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Mantenimientos
                    </Typography>
                    <Typography variant="h4" component="div">
                      {mantenimientosEjemplo.length}
                    </Typography>
                  </Box>
                  <Build color="primary" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Información del vehículo */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardHeader 
                title={`Vehículo N°${vehiculoEjemplo.numeroInterno}`}
                subheader={`${vehiculoEjemplo.marca} ${vehiculoEjemplo.modelo} - ${vehiculoEjemplo.patente}`}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Titular:</strong> {vehiculoEjemplo.titular}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Kilometraje actual:</strong> {vehiculoEjemplo.kilometrajeActual.toLocaleString('es-AR')} km
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Últimos Mantenimientos
                  </Typography>
                  {mantenimientosEjemplo.slice(0, 3).map((mant, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        <strong>{mant.descripcion}:</strong> {mant.kilometraje.toLocaleString('es-AR')} km ({mant.fecha})
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Reparaciones pendientes */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardHeader 
                title="Reparaciones Pendientes"
                subheader="Estado actual por área"
              />
              <CardContent sx={{ maxHeight: 400, overflow: 'auto' }}>
                {reparacionesEjemplo.map((rep, index) => (
                  <Box key={index} sx={{ mb: 2, p: 2, border: 1, borderColor: 'grey.200', borderRadius: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="subtitle2" color="primary">
                        {rep.area}
                      </Typography>
                      <Chip 
                        label={rep.disponibilidad === 'DISPONIBLE' ? 'Disponible' : 'No Disponible'}
                        color={rep.disponibilidad === 'DISPONIBLE' ? 'success' : 'error'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" gutterBottom>
                      {rep.descripcion}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Chip 
                        label={getUrgenciaText(rep.urgencia)}
                        color={getUrgenciaColor(rep.urgencia) as any}
                        size="small"
                      />
                      <Typography variant="body2" color="textSecondary">
                        {rep.tiempoEstimado}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}