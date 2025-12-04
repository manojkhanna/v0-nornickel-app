-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for roles and statuses
CREATE TYPE user_role AS ENUM ('shift_worker', 'engineer', 'supervisor', 'manager', 'executive', 'ceo');
CREATE TYPE shift_type AS ENUM ('day', 'night', 'swing');
CREATE TYPE processing_stage AS ENUM ('mining', 'crushing', 'grinding', 'conditioning', 'flotation', 'filtration', 'leaching', 'smelting', 'shipping');
CREATE TYPE project_status AS ENUM ('planning', 'in_progress', 'on_hold', 'completed', 'cancelled');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'in_transit', 'delivered', 'cancelled');

-- Users and Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'shift_worker',
  department TEXT,
  employee_id TEXT UNIQUE,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "System can insert profiles" ON profiles FOR INSERT WITH CHECK (true);

-- Shifts table
CREATE TABLE IF NOT EXISTS shifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shift_name TEXT NOT NULL,
  shift_type shift_type NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shift assignments
CREATE TABLE IF NOT EXISTS shift_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  shift_id UUID REFERENCES shifts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  clock_in TIMESTAMPTZ,
  clock_out TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE shift_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own shift assignments" ON shift_assignments FOR SELECT USING (auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('supervisor', 'manager', 'executive', 'ceo')));
CREATE POLICY "Supervisors can manage shift assignments" ON shift_assignments FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('supervisor', 'manager', 'executive', 'ceo')));

-- Mining operations table
CREATE TABLE IF NOT EXISTS mining_operations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  shift_id UUID REFERENCES shifts(id),
  drilled_volume_mt DECIMAL(12, 2),
  mined_ore_mt DECIMAL(12, 2),
  ore_grade_cu_percent DECIMAL(5, 2),
  ore_grade_zn_percent DECIMAL(5, 2),
  ore_grade_au_gpt DECIMAL(8, 3),
  ore_grade_ag_gpt DECIMAL(8, 3),
  rom_stockpile_mt DECIMAL(12, 2),
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE mining_operations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "All authenticated users can view mining operations" ON mining_operations FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Engineers and above can manage mining operations" ON mining_operations FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('engineer', 'supervisor', 'manager', 'executive', 'ceo')));

-- Copper-Zinc Processing table
CREATE TABLE IF NOT EXISTS cu_zn_processing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  shift_id UUID REFERENCES shifts(id),
  stage processing_stage NOT NULL,
  
  -- Crushing & Grinding
  ore_crushed_mt DECIMAL(12, 2),
  ore_ground_mt DECIMAL(12, 2),
  mill_feed_rate_mtph DECIMAL(8, 2),
  
  -- Chemical Conditioning
  reagents_consumed_kg DECIMAL(10, 2),
  ph_level DECIMAL(4, 2),
  
  -- Flotation
  concentrate_feed_mt DECIMAL(12, 2),
  cu_concentrate_mt DECIMAL(12, 2),
  cu_concentrate_percent DECIMAL(5, 2),
  zn_concentrate_mt DECIMAL(12, 2),
  zn_concentrate_percent DECIMAL(5, 2),
  tailings_mt DECIMAL(12, 2),
  
  -- Filtration
  wmt DECIMAL(12, 2),
  dmt DECIMAL(12, 2),
  moisture_percent DECIMAL(5, 2),
  
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE cu_zn_processing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "All authenticated users can view cu_zn processing" ON cu_zn_processing FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Engineers and above can manage cu_zn processing" ON cu_zn_processing FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('engineer', 'supervisor', 'manager', 'executive', 'ceo')));

-- Gold-Silver Processing table
CREATE TABLE IF NOT EXISTS au_ag_processing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  shift_id UUID REFERENCES shifts(id),
  stage processing_stage NOT NULL,
  
  -- Crushing & Grinding
  ore_crushed_mt DECIMAL(12, 2),
  ore_ground_mt DECIMAL(12, 2),
  
  -- Leaching
  ore_leached_mt DECIMAL(12, 2),
  cyanide_consumed_kg DECIMAL(10, 2),
  solution_grade_au_mgl DECIMAL(8, 3),
  solution_grade_ag_mgl DECIMAL(8, 3),
  recovery_rate_percent DECIMAL(5, 2),
  
  -- Carbon Absorption
  carbon_activity_percent DECIMAL(5, 2),
  au_absorbed_percent DECIMAL(5, 2),
  ag_absorbed_percent DECIMAL(5, 2),
  
  -- Elution & Electro-winning
  loaded_carbon_kg DECIMAL(10, 2),
  elution_efficiency_percent DECIMAL(5, 2),
  au_recovered_oz DECIMAL(10, 3),
  ag_recovered_oz DECIMAL(10, 3),
  
  -- Smelting
  au_dore_bars_qty INTEGER,
  au_dore_purity_percent DECIMAL(5, 2),
  ag_bullion_qty INTEGER,
  ag_bullion_purity_percent DECIMAL(5, 2),
  
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE au_ag_processing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "All authenticated users can view au_ag processing" ON au_ag_processing FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Engineers and above can manage au_ag processing" ON au_ag_processing FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('engineer', 'supervisor', 'manager', 'executive', 'ceo')));

-- Financial metrics table
CREATE TABLE IF NOT EXISTS financial_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Revenue
  revenue_cu DECIMAL(15, 2),
  revenue_zn DECIMAL(15, 2),
  revenue_au DECIMAL(15, 2),
  revenue_ag DECIMAL(15, 2),
  total_revenue DECIMAL(15, 2),
  
  -- Variable Costs
  cost_raw_materials DECIMAL(15, 2),
  cost_electricity DECIMAL(15, 2),
  cost_reagents DECIMAL(15, 2),
  cost_labor DECIMAL(15, 2),
  total_variable_costs DECIMAL(15, 2),
  
  -- Fixed Costs
  cost_maintenance DECIMAL(15, 2),
  cost_transport DECIMAL(15, 2),
  cost_utilities DECIMAL(15, 2),
  cost_depreciation DECIMAL(15, 2),
  total_fixed_costs DECIMAL(15, 2),
  
  -- Selling Expenses
  selling_expense_cu DECIMAL(15, 2),
  selling_expense_zn DECIMAL(15, 2),
  selling_expense_au DECIMAL(15, 2),
  selling_expense_ag DECIMAL(15, 2),
  
  -- Finance Costs
  interest_expense DECIMAL(15, 2),
  fx_gains_losses DECIMAL(15, 2),
  
  -- Calculated fields
  gross_profit DECIMAL(15, 2),
  ebitda DECIMAL(15, 2),
  net_income DECIMAL(15, 2),
  
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE financial_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Managers and above can view financial metrics" ON financial_metrics FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('manager', 'executive', 'ceo')));
CREATE POLICY "Managers and above can manage financial metrics" ON financial_metrics FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('manager', 'executive', 'ceo')));

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_name TEXT NOT NULL,
  description TEXT,
  status project_status DEFAULT 'planning',
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15, 2),
  actual_cost DECIMAL(15, 2),
  manager_id UUID REFERENCES profiles(id),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "All authenticated users can view projects" ON projects FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Managers and above can manage projects" ON projects FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('manager', 'executive', 'ceo')));

-- Sales orders table
CREATE TABLE IF NOT EXISTS sales_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_contact TEXT,
  
  -- Product details
  product_type TEXT NOT NULL, -- 'copper', 'zinc', 'gold', 'silver'
  quantity_mt DECIMAL(12, 2),
  unit_price DECIMAL(12, 2),
  total_amount DECIMAL(15, 2),
  
  status order_status DEFAULT 'pending',
  order_date DATE NOT NULL,
  delivery_date DATE,
  
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sales_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "All authenticated users can view sales orders" ON sales_orders FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Managers and above can manage sales orders" ON sales_orders FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('manager', 'executive', 'ceo')));

-- Integration logs table (for SAGE, SCADA, LIMS)
CREATE TABLE IF NOT EXISTS integration_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_system TEXT NOT NULL, -- 'SAGE', 'SCADA', 'LIMS'
  data_type TEXT NOT NULL,
  status TEXT NOT NULL, -- 'success', 'failed', 'pending'
  records_processed INTEGER,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE integration_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Managers and above can view integration logs" ON integration_logs FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('manager', 'executive', 'ceo')));

-- Create indexes for better performance
CREATE INDEX idx_mining_operations_date ON mining_operations(date);
CREATE INDEX idx_cu_zn_processing_date ON cu_zn_processing(date);
CREATE INDEX idx_au_ag_processing_date ON au_ag_processing(date);
CREATE INDEX idx_shift_assignments_user ON shift_assignments(user_id);
CREATE INDEX idx_shift_assignments_date ON shift_assignments(date);
CREATE INDEX idx_sales_orders_status ON sales_orders(status);
CREATE INDEX idx_projects_status ON projects(status);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mining_operations_updated_at BEFORE UPDATE ON mining_operations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cu_zn_processing_updated_at BEFORE UPDATE ON cu_zn_processing FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_au_ag_processing_updated_at BEFORE UPDATE ON au_ag_processing FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_metrics_updated_at BEFORE UPDATE ON financial_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sales_orders_updated_at BEFORE UPDATE ON sales_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
