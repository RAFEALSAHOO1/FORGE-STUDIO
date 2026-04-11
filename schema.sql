-- DesignForge Studio Database Schema
-- Run this in your Neon database to set up the initial tables

-- Designs table
CREATE TABLE IF NOT EXISTS designs (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  text_content TEXT,
  primary_color VARCHAR(7) DEFAULT '#89AACC',
  font_family VARCHAR(100) DEFAULT 'Inter',
  font_size INTEGER DEFAULT 48,
  size VARCHAR(50) DEFAULT 'A4',
  addons JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'ordered', 'delivered')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_designs_user_id ON designs(user_id);
CREATE INDEX IF NOT EXISTS idx_designs_status ON designs(status);
CREATE INDEX IF NOT EXISTS idx_designs_created_at ON designs(created_at DESC);

-- Optional: Users table (if you want to expand authentication later)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);