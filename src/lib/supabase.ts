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