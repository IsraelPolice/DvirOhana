/*
  # Create Services Database Schema

  ## Overview
  Creates tables for managing service categories and services for the lead generation system.

  ## New Tables
  
  ### `categories`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Category name (e.g., "קופות חולים", "תקשורת")
  - `icon` (text) - Icon identifier for UI
  - `display_order` (integer) - Order for display
  - `created_at` (timestamptz) - Creation timestamp
  
  ### `services`
  - `id` (uuid, primary key) - Unique identifier
  - `category_id` (uuid, foreign key) - Reference to category
  - `name` (text) - Service name (e.g., "מכבי", "כללית")
  - `description` (text) - Service description
  - `created_at` (timestamptz) - Creation timestamp
  
  ### `leads`
  - `id` (uuid, primary key) - Unique identifier
  - `first_name` (text) - User's first name
  - `phone` (text) - User's phone number
  - `selected_services` (jsonb) - Array of selected service IDs
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for categories and services (needed for display)
  - Public insert access for leads (form submissions)
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text DEFAULT '📋',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  phone text NOT NULL,
  selected_services jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public read policies for categories and services
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public insert policy for leads
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_category_id ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);