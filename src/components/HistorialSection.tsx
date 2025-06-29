'use client';
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import {
  History,
  Build,
  CalendarToday,
  AttachMoney,
} from '@mui/icons-material';

interface HistorialItem {
  id: number;
  descripcion: string;
  fecha: string;
  fecha_formato?: string;
  kilometraje?: number;
  costo?: number;
  area?: string;
  area_icono?: string;
  tipo_icono?: string;
  gravedad_texto?: string;
  tiempo_real?: string;
  tecnico?: string;
  proveedor?: string;
  notas?: string;
}

interface HistorialSectionProps {
  items: HistorialItem[];
  tipo: 'mantenimiento' | 'reparacion';
}

export default function HistorialSection({ items, tipo }: HistorialSectionProps) {
  if (!items || items.length === 0) {
    return (
      <Box p={2} textAlign="center">
        <History color="action" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Sin historial registrado
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tipo === 'mantenimiento' 
            ? 'No hay mantenimientos preventivos registrados'
            : 'No hay reparaciones completadas registradas'
          }
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {items.map((item, index) => (
        <Paper key={item.id} elevation={1} sx={{ p: 2 }}>
          <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1}>
            {/* Título con ícono */}
            <Box display="flex" alignItems="center" gap={1} flex={1}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                {tipo === 'mantenimiento' ? item.tipo_icono : item.area_icono}
              </Typography>
              <Typography variant="body1" fontWeight="medium" flex={1}>
                {item.descripcion}
              </Typography>
            </Box>

            {/* Fecha */}
            <Box display="flex" alignItems="center" gap={0.5}>
              <CalendarToday fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {item.fecha_formato || new Date(item.fecha).toLocaleDateString('es-AR')}
              </Typography>
            </Box>
          </Box>

          {/* Detalles adicionales */}
          <Box display="flex" flexWrap="wrap" gap={1} alignItems="center">
            {/* Kilometraje */}
            {item.kilometraje && (
              <Chip 
                label={`${item.kilometraje.toLocaleString('es-AR')} km`}
                size="small"
                variant="outlined"
                color="primary"
              />
            )}

            {/* Costo */}
            {item.costo && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <AttachMoney fontSize="small" color="success" />
                <Typography variant="body2" color="success.main" fontWeight="medium">
                  ${item.costo.toLocaleString('es-AR')}
                </Typography>
              </Box>
            )}

            {/* Gravedad original (solo reparaciones) */}
            {tipo === 'reparacion' && item.gravedad_texto && (
              <Chip 
                label={item.gravedad_texto}
                size="small"
                color="info"
                variant="outlined"
              />
            )}

            {/* Tiempo real (solo reparaciones) */}
            {tipo === 'reparacion' && item.tiempo_real && (
              <Typography variant="body2" color="text.secondary">
                ⏱️ {item.tiempo_real}
              </Typography>
            )}
          </Box>

          {/* Técnico/Proveedor y notas */}
          {(item.tecnico || item.proveedor || item.notas) && (
            <>
              <Divider sx={{ my: 1 }} />
              <Box>
                {(item.tecnico || item.proveedor) && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    <Build fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                    {item.tecnico || item.proveedor}
                  </Typography>
                )}
                {item.notas && (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {item.notas}
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Paper>
      ))}
    </Stack>
  );
}