'use client';
import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | false>('identificacion');

  useEffect(() => {
    loadData();
  }, [vehiculoId, perfilUsuario]);

  async function loadData() {
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

      setCategorias(categoriasData || []);
      setValores(valoresData || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading vehicle data:', err);
    } finally {
      setLoading(false);
    }
  }

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
          const cantidadItems = valoresCategoria.length;

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
                  {cantidadItems > 0 && (
                    <Chip 
                      label={cantidadItems} 
                      color="primary" 
                      size="small"
                      sx={{ mr: 1 }}
                    />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {cantidadItems === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No hay información disponible
                    </Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {valoresCategoria.map((valor) => (
                        <Grid item xs={12} sm={6} md={4} key={valor.id}>
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