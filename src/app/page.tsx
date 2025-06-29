'use client';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardHeader,
  Box,
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
import { useEffect, useState } from 'react';
import { supabase, Vehiculo, Reparacion } from '@/lib/supabase';
import VehicleAccordion from '@/components/VehicleAccordion';

// Datos de ejemplo basados en el vehículo 78 - Supabase connected
const vehiculoEjemplo: Vehiculo = {
  id: 1,
  numero_interno: 78,
  marca: 'Peugeot',
  modelo: 'Expert',
  patente: 'AD897UQ',
  titular: 'Duran Vaca Patricia',
  kilometraje_actual: 202056,
};

const reparacionesEjemplo: Reparacion[] = [
  {
    id: 1,
    vehiculo_id: 1,
    area: 'Motor',
    descripcion: 'Perdida de potencia',
    urgencia: 'EXTREMA_IMPORTANCIA',
    tiempo_estimado: 'Indeterminado',
    disponibilidad: 'DISPONIBLE'
  },
  {
    id: 2,
    vehiculo_id: 1,
    area: 'Motor', 
    descripcion: 'Embrague inoperativo',
    urgencia: 'EXTREMA_IMPORTANCIA',
    tiempo_estimado: '3 días',
    disponibilidad: 'DISPONIBLE'
  },
  {
    id: 3,
    vehiculo_id: 1,
    area: 'Eléctrica',
    descripcion: 'Farol con rajadura',
    urgencia: 'POCA_IMPORTANCIA',
    tiempo_estimado: '2 horas',
    disponibilidad: 'NO_DISPONIBLE'
  },
  {
    id: 4,
    vehiculo_id: 1,
    area: 'Eléctrica',
    descripcion: 'Foco quemado',
    urgencia: 'IMPORTANTE',
    tiempo_estimado: '15 minutos',
    disponibilidad: 'DISPONIBLE'
  },
];

// Funciones removidas - ahora se manejan en VehicleAccordion

export default function Dashboard() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [reparaciones, setReparaciones] = useState<Reparacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      // Cargar vehículos
      const { data: vehiculosData, error: vehiculosError } = await supabase
        .from('vehiculos')
        .select('*');
      
      if (vehiculosError) throw vehiculosError;

      // Cargar reparaciones
      const { data: reparacionesData, error: reparacionesError } = await supabase
        .from('reparaciones')
        .select('*');
      
      if (reparacionesError) throw reparacionesError;

      setVehiculos(vehiculosData || []);
      setReparaciones(reparacionesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      // Usar datos de ejemplo si falla la conexión
      setVehiculos([vehiculoEjemplo]);
      setReparaciones(reparacionesEjemplo);
    } finally {
      setLoading(false);
    }
  }

  const reparacionesCriticas = reparaciones.filter(r => 
    r.urgencia === 'EXTREMA_IMPORTANCIA'
  ).length;
  
  const tallerDisponible = reparaciones.filter(r => 
    r.disponibilidad === 'DISPONIBLE'
  ).length;

  const vehiculoActual = vehiculos[0] || vehiculoEjemplo;

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
                      {loading ? '...' : vehiculos.length}
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
                      {loading ? '...' : reparacionesCriticas}
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
                      {loading ? '...' : tallerDisponible}
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
                      {loading ? '...' : reparaciones.length}
                    </Typography>
                  </Box>
                  <Build color="primary" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Nueva interfaz de acordeón */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardHeader 
                title={`🚗 Vehículo N°${vehiculoActual.numero_interno} - ${vehiculoActual.marca} ${vehiculoActual.modelo}`}
                subheader={`Patente: ${vehiculoActual.patente}`}
              />
            </Card>
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <Typography>Cargando información del vehículo...</Typography>
              </Box>
            ) : (
              <VehicleAccordion 
                vehiculoId={vehiculoActual.id} 
                perfilUsuario="admin"
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}