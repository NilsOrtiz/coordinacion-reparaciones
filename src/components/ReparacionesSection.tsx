'use client';
import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Grid,
  Paper,
  Divider,
  Stack,
} from '@mui/material';
import {
  Build,
  Schedule,
  Warning,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';

interface Reparacion {
  id: number;
  area: string;
  descripcion: string;
  gravedad: number;
  taller_disponible: boolean;
  tiempo_estimado: string;
  notas?: string;
  gravedad_texto?: string;
  gravedad_color?: string;
  taller_estado?: string;
}

interface ReparacionesSectionProps {
  reparaciones: Reparacion[];
}

const getGravedadColor = (gravedad: number): 'default' | 'success' | 'info' | 'warning' | 'error' => {
  switch (gravedad) {
    case 1: return 'success';   // Sin importancia - Verde
    case 2: return 'info';      // Poca importancia - Azul  
    case 3: return 'warning';   // Importante - Amarillo
    case 4: return 'error';     // Mucha importancia - Rojo
    case 5: return 'error';     // Crítico - Rojo
    default: return 'default';
  }
};

const getGravedadTexto = (gravedad: number): string => {
  switch (gravedad) {
    case 1: return 'Sin importancia';
    case 2: return 'Poca importancia';
    case 3: return 'Importante';
    case 4: return 'Mucha importancia';  
    case 5: return 'Crítico';
    default: return 'No definido';
  }
};

const getAreaIcon = (area: string) => {
  switch (area.toUpperCase()) {
    case 'MOTOR': return '🔧';
    case 'ELECTRICA': return '⚡';
    case 'TRANSMISION': return '⚙️';
    case 'FRENOS': return '🛑';
    case 'CARROCERIA': return '🚗';
    default: return '🔧';
  }
};

export default function ReparacionesSection({ reparaciones }: ReparacionesSectionProps) {
  if (!reparaciones || reparaciones.length === 0) {
    return (
      <Box p={2} textAlign="center">
        <CheckCircle color="success" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6" color="success.main">
          ¡Sin problemas reportados!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          El vehículo está en buen estado
        </Typography>
      </Box>
    );
  }

  // Agrupar por área
  const reparacionesPorArea = reparaciones.reduce((acc, rep) => {
    if (!acc[rep.area]) {
      acc[rep.area] = [];
    }
    acc[rep.area].push(rep);
    return acc;
  }, {} as Record<string, Reparacion[]>);

  return (
    <Stack spacing={2}>
      {Object.entries(reparacionesPorArea).map(([area, reparacionesArea]) => (
        <Paper key={area} elevation={1} sx={{ p: 2 }}>
          {/* Header del área */}
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h6" sx={{ mr: 1 }}>
              {getAreaIcon(area)} {area}
            </Typography>
            <Chip 
              label={reparacionesArea.length} 
              color="primary" 
              size="small"
            />
          </Box>

          {/* Lista de reparaciones */}
          <Stack spacing={2}>
            {reparacionesArea.map((reparacion, index) => (
              <Box key={reparacion.id}>
                {index > 0 && <Divider sx={{ my: 1 }} />}
                
                <Grid container spacing={2} alignItems="center">
                  {/* Descripción */}
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Typography variant="body1" fontWeight="medium">
                      {reparacion.descripcion}
                    </Typography>
                    {reparacion.notas && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {reparacion.notas}
                      </Typography>
                    )}
                  </Grid>

                  {/* Gravedad */}
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Warning fontSize="small" />
                      <Chip
                        label={getGravedadTexto(reparacion.gravedad)}
                        color={getGravedadColor(reparacion.gravedad)}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>
                  </Grid>

                  {/* Estado Taller Simplificado */}
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Build fontSize="small" />
                      <Chip
                        icon={reparacion.taller_disponible ? <CheckCircle /> : <Cancel />}
                        label={reparacion.estado_taller_texto || (reparacion.taller_disponible ? 'Taller Listo' : 'No Disponible')}
                        color={reparacion.taller_disponible ? 'success' : 'error'}
                        size="small"
                        variant={reparacion.taller_disponible ? 'filled' : 'outlined'}
                      />
                    </Box>
                  </Grid>

                  {/* Tiempo Estimado */}
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Schedule fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        <strong>Tiempo:</strong> {reparacion.tiempo_estimado}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}