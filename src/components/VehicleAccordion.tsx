'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  ExpandMore,
  Badge,
  Speed,
  Build,
  CheckCircle,
} from '@mui/icons-material';
import { supabase } from '@/lib/supabase';
import ReparacionesSection from './ReparacionesSection';
import HistorialSection from './HistorialSection';

interface Categoria {
  id: number;
  nombre: string;
  codigo: string;
  orden: number;
  icono: string;
  descripcion: string;
}

interface Item {
  id: number;
  categoria_id: number;
  nombre: string;
  codigo: string;
  tipo: string;
  orden: number;
  requerido: boolean;
}

interface Valor {
  id: number;
  vehiculo_id: number;
  item_id: number;
  valor: string;
  item: Item;
}

interface ReparacionEstructurada {
  id: number;
  vehiculo_id: number;
  area: string;
  descripcion: string;
  gravedad: number;
  taller_disponible: boolean;
  tiempo_estimado: string;
  notas?: string;
  estado?: string;
  gravedad_texto?: string;
  gravedad_color?: string;
  taller_estado?: string;
  estado_taller_texto?: string;
  estado_taller_color?: string;
  motivo_no_disponible?: string;
}

interface VehicleAccordionProps {
  vehiculoId: number;
  perfilUsuario?: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  badge: Badge,
  speedometer: Speed,
  build: Build,
  check_circle: CheckCircle,
};

export default function VehicleAccordion({ vehiculoId, perfilUsuario = 'admin' }: VehicleAccordionProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [valores, setValores] = useState<Valor[]>([]);
  const [reparaciones, setReparaciones] = useState<ReparacionEstructurada[]>([]);
  const [historialMantenimientos, setHistorialMantenimientos] = useState<any[]>([]);
  const [historialReparaciones, setHistorialReparaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | false>('operativo');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Cargar categorías según el perfil del usuario
      let categoriasQuery = supabase
        .from('categorias')
        .select('*')
        .eq('activo', true)
        .order('orden');

      // Si hay un perfil específico, filtrar categorías
      if (perfilUsuario !== 'admin') {
        const { data: perfil } = await supabase
          .from('perfiles_usuario')
          .select('configuracion')
          .eq('codigo', perfilUsuario)
          .single();
        
        if (perfil?.configuracion?.categorias) {
          categoriasQuery = categoriasQuery.in('id', perfil.configuracion.categorias);
        }
      }

      const { data: categoriasData, error: categoriasError } = await categoriasQuery;
      if (categoriasError) throw categoriasError;

      // Cargar valores del vehículo con sus items
      const { data: valoresData, error: valoresError } = await supabase
        .from('valores')
        .select(`
          *,
          item:items(*)
        `)
        .eq('vehiculo_id', vehiculoId);
      
      if (valoresError) throw valoresError;

      // Cargar reparaciones estructuradas
      const { data: reparacionesData, error: reparacionesError } = await supabase
        .from('vista_reparaciones_simple')
        .select('*')
        .eq('vehiculo_id', vehiculoId);
      
      if (reparacionesError) {
        console.warn('No se pudieron cargar reparaciones:', reparacionesError);
        // No lanzar error, continuar sin reparaciones
      }

      // Cargar historial de mantenimientos
      const { data: mantenimientosData, error: mantenimientosError } = await supabase
        .from('vista_historial_mantenimientos')
        .select('*')
        .eq('vehiculo_id', vehiculoId)
        .limit(10); // Últimos 10 registros

      if (mantenimientosError) {
        console.warn('No se pudieron cargar mantenimientos:', mantenimientosError);
      }

      // Cargar historial de reparaciones
      const { data: reparacionesHistorialData, error: reparacionesHistorialError } = await supabase
        .from('vista_historial_reparaciones')
        .select('*')
        .eq('vehiculo_id', vehiculoId)
        .limit(10); // Últimos 10 registros

      if (reparacionesHistorialError) {
        console.warn('No se pudieron cargar historial reparaciones:', reparacionesHistorialError);
      }

      setCategorias(categoriasData || []);
      setValores(valoresData || []);
      setReparaciones(reparacionesData || []);
      setHistorialMantenimientos(mantenimientosData || []);
      setHistorialReparaciones(reparacionesHistorialData || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error loading vehicle data:', err);
    } finally {
      setLoading(false);
    }
  }, [vehiculoId, perfilUsuario]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getValoresPorCategoria = (categoriaId: number) => {
    return valores.filter(valor => valor.item?.categoria_id === categoriaId);
  };

  const renderValor = (valor: Valor) => {
    const item = valor.item;
    if (!item) return null;

    let displayValue = valor.valor;
    let chipColor: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';

    // Formatear según el tipo
    switch (item.tipo) {
      case 'numero':
        if (item.codigo.includes('km')) {
          displayValue = parseInt(valor.valor).toLocaleString('es-AR') + ' km';
        }
        break;
      case 'fecha':
        if (valor.valor) {
          displayValue = new Date(valor.valor).toLocaleDateString('es-AR');
        }
        break;
      case 'lista':
        // Para reparaciones, usar colores según urgencia
        if (valor.valor === 'EXTREMA_IMPORTANCIA') chipColor = 'error';
        else if (valor.valor === 'IMPORTANTE') chipColor = 'warning';
        else if (valor.valor === 'POCA_IMPORTANCIA') chipColor = 'success';
        else if (valor.valor === 'DISPONIBLE') chipColor = 'success';
        else if (valor.valor === 'NO_DISPONIBLE') chipColor = 'error';
        break;
    }

    return (
      <Box key={valor.id} sx={{ mb: 1 }}>
        <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
          {item.nombre}:
        </Typography>{' '}
        {item.tipo === 'lista' ? (
          <Chip 
            label={displayValue} 
            color={chipColor}
            size="small" 
            sx={{ ml: 1 }}
          />
        ) : (
          <Typography variant="body2" component="span">
            {displayValue}
          </Typography>
        )}
      </Box>
    );
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Badge;
    return <IconComponent />;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error cargando datos del vehículo: {error}
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent>
        {categorias.map((categoria) => {
          const valoresCategoria = getValoresPorCategoria(categoria.id);
          let cantidadItems = valoresCategoria.length;
          
          // Para reparaciones, usar el conteo de la nueva estructura
          if (categoria.codigo === 'reparaciones') {
            cantidadItems = reparaciones.length;
          }
          // Para historiales, usar el conteo específico
          else if (categoria.codigo === 'hist_mant') {
            cantidadItems = historialMantenimientos.length;
          }
          else if (categoria.codigo === 'hist_rep') {
            cantidadItems = historialReparaciones.length;
          }

          return (
            <Accordion
              key={categoria.codigo}
              expanded={expanded === categoria.codigo}
              onChange={handleChange(categoria.codigo)}
              sx={{ mb: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`${categoria.codigo}-content`}
                id={`${categoria.codigo}-header`}
              >
                <Box display="flex" alignItems="center" width="100%">
                  <Box display="flex" alignItems="center" mr={2}>
                    {getIcon(categoria.icono)}
                  </Box>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {categoria.orden}. {categoria.nombre}
                  </Typography>
                  {categoria.codigo === 'reparaciones' && cantidadItems > 0 && (
                    <Chip 
                      label={cantidadItems} 
                      color="error"
                      size="small"
                      sx={{ mr: 1 }}
                    />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {categoria.codigo === 'reparaciones' ? (
                    <ReparacionesSection reparaciones={reparaciones} />
                  ) : categoria.codigo === 'hist_mant' ? (
                    <HistorialSection items={historialMantenimientos} tipo="mantenimiento" />
                  ) : categoria.codigo === 'hist_rep' ? (
                    <HistorialSection items={historialReparaciones} tipo="reparacion" />
                  ) : cantidadItems === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No hay información disponible
                    </Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {valoresCategoria.map((valor) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={valor.id}>
                          {renderValor(valor)}
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </CardContent>
    </Card>
  );
}