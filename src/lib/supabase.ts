import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para nuestras tablas
export interface Vehiculo {
  id: number
  numero_interno: number
  marca: string
  modelo: string
  patente: string
  titular: string
  kilometraje_actual: number
  created_at?: string
  updated_at?: string
}

export interface Reparacion {
  id: number
  vehiculo_id: number
  area: string
  descripcion: string
  urgencia: 'EXTREMA_IMPORTANCIA' | 'IMPORTANTE' | 'POCA_IMPORTANCIA'
  tiempo_estimado: string
  disponibilidad: 'DISPONIBLE' | 'NO_DISPONIBLE'
  created_at?: string
  updated_at?: string
}

// Nuevas interfaces para la estructura jerárquica
export interface Categoria {
  id: number
  nombre: string
  codigo: string
  orden: number
  icono: string
  descripcion: string
  activo: boolean
  created_at?: string
}

export interface Item {
  id: number
  categoria_id: number
  nombre: string
  codigo: string
  tipo: string
  orden: number
  requerido: boolean
  descripcion?: string
  configuracion?: Record<string, unknown>
  activo: boolean
  created_at?: string
}

export interface Valor {
  id: number
  vehiculo_id: number
  item_id: number
  valor: string
  valor_numerico?: number
  valor_fecha?: string
  valor_booleano?: boolean
  notas?: string
  created_at?: string
  updated_at?: string
}

export interface PerfilUsuario {
  id: number
  nombre: string
  codigo: string
  descripcion?: string
  configuracion?: Record<string, unknown>
  activo: boolean
  created_at?: string
}