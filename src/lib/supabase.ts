import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Category {
  id: string
  name: string
  icon: string
  display_order: number
  created_at: string
}

export interface Service {
  id: string
  category_id: string
  name: string
  description: string
  created_at: string
}

export interface Lead {
  id: string
  first_name: string
  phone: string
  selected_services: string[]
  created_at: string
}
