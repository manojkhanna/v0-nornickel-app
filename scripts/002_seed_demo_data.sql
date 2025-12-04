-- Insert demo shifts
INSERT INTO shifts (id, shift_name, shift_type, start_time, end_time) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Day Shift', 'day', '07:00:00', '15:00:00'),
  ('22222222-2222-2222-2222-222222222222', 'Night Shift', 'night', '23:00:00', '07:00:00'),
  ('33333333-3333-3333-3333-333333333333', 'Swing Shift', 'swing', '15:00:00', '23:00:00');

-- Note: User profiles will be created via the signup trigger
-- We'll create demo users through the auth system

-- Insert demo mining operations (last 30 days)
INSERT INTO mining_operations (date, shift_id, drilled_volume_mt, mined_ore_mt, ore_grade_cu_percent, ore_grade_zn_percent, ore_grade_au_gpt, ore_grade_ag_gpt, rom_stockpile_mt) VALUES
  (CURRENT_DATE - INTERVAL '1 day', '11111111-1111-1111-1111-111111111111', 1250.50, 1180.25, 1.85, 3.42, 0.45, 12.30, 15420.75),
  (CURRENT_DATE - INTERVAL '1 day', '22222222-2222-2222-2222-222222222222', 1180.30, 1120.60, 1.92, 3.38, 0.48, 11.95, 16541.35),
  (CURRENT_DATE - INTERVAL '2 days', '11111111-1111-1111-1111-111111111111', 1320.75, 1245.80, 1.78, 3.55, 0.42, 13.10, 17787.15),
  (CURRENT_DATE - INTERVAL '2 days', '33333333-3333-3333-3333-333333333333', 1290.40, 1215.90, 1.88, 3.45, 0.46, 12.75, 19003.05),
  (CURRENT_DATE - INTERVAL '3 days', '11111111-1111-1111-1111-111111111111', 1275.60, 1198.35, 1.82, 3.48, 0.44, 12.50, 20201.40),
  (CURRENT_DATE - INTERVAL '3 days', '22222222-2222-2222-2222-222222222222', 1305.20, 1230.45, 1.90, 3.52, 0.47, 12.85, 21431.85),
  (CURRENT_DATE - INTERVAL '4 days', '11111111-1111-1111-1111-111111111111', 1260.90, 1185.70, 1.86, 3.40, 0.43, 12.20, 22617.55),
  (CURRENT_DATE - INTERVAL '4 days', '33333333-3333-3333-3333-333333333333', 1295.50, 1220.30, 1.84, 3.50, 0.45, 12.95, 23837.85);

-- Insert demo Copper-Zinc processing data
INSERT INTO cu_zn_processing (date, shift_id, stage, ore_crushed_mt, ore_ground_mt, mill_feed_rate_mtph, concentrate_feed_mt, cu_concentrate_mt, cu_concentrate_percent, zn_concentrate_mt, zn_concentrate_percent, tailings_mt, wmt, dmt, moisture_percent) VALUES
  (CURRENT_DATE - INTERVAL '1 day', '11111111-1111-1111-1111-111111111111', 'flotation', 1180.25, 1165.40, 145.68, 1165.40, 21.56, 28.5, 39.89, 52.3, 925.95, 61.45, 55.31, 10.0),
  (CURRENT_DATE - INTERVAL '1 day', '22222222-2222-2222-2222-222222222222', 'flotation', 1120.60, 1106.19, 138.27, 1106.19, 21.24, 27.8, 37.41, 51.8, 1047.54, 58.65, 52.79, 10.0),
  (CURRENT_DATE - INTERVAL '2 days', '11111111-1111-1111-1111-111111111111', 'flotation', 1245.80, 1230.13, 153.77, 1230.13, 21.90, 29.2, 43.67, 53.1, 1164.56, 65.57, 59.01, 10.0),
  (CURRENT_DATE - INTERVAL '2 days', '33333333-3333-3333-3333-333333333333', 'flotation', 1215.90, 1200.72, 150.09, 1200.72, 22.57, 28.9, 41.42, 52.7, 1136.73, 63.99, 57.59, 10.0),
  (CURRENT_DATE - INTERVAL '3 days', '11111111-1111-1111-1111-111111111111', 'flotation', 1198.35, 1183.54, 147.94, 1183.54, 21.54, 28.3, 41.19, 52.5, 1120.81, 62.73, 56.46, 10.0),
  (CURRENT_DATE - INTERVAL '3 days', '22222222-2222-2222-2222-222222222222', 'flotation', 1230.45, 1215.54, 151.94, 1215.54, 23.10, 29.5, 42.79, 53.2, 1149.65, 65.89, 59.30, 10.0);

-- Insert demo Gold-Silver processing data
INSERT INTO au_ag_processing (date, shift_id, stage, ore_crushed_mt, ore_ground_mt, ore_leached_mt, cyanide_consumed_kg, solution_grade_au_mgl, solution_grade_ag_mgl, recovery_rate_percent, au_recovered_oz, ag_recovered_oz, au_dore_bars_qty, au_dore_purity_percent, ag_bullion_qty, ag_bullion_purity_percent) VALUES
  (CURRENT_DATE - INTERVAL '1 day', '11111111-1111-1111-1111-111111111111', 'leaching', 925.95, 915.08, 915.08, 1830.16, 0.42, 11.25, 92.5, 11.25, 312.50, 1, 89.5, 2, 95.2),
  (CURRENT_DATE - INTERVAL '2 days', '11111111-1111-1111-1111-111111111111', 'leaching', 1164.56, 1150.51, 1150.51, 2301.02, 0.38, 12.10, 91.8, 13.25, 421.30, 1, 90.1, 3, 95.8),
  (CURRENT_DATE - INTERVAL '3 days', '22222222-2222-2222-2222-222222222222', 'leaching', 1120.81, 1107.60, 1107.60, 2215.20, 0.40, 11.85, 92.2, 12.80, 397.20, 1, 89.8, 2, 95.5),
  (CURRENT_DATE - INTERVAL '4 days', '11111111-1111-1111-1111-111111111111', 'leaching', 1185.70, 1171.83, 1171.83, 2343.66, 0.41, 11.50, 92.0, 14.10, 408.50, 2, 90.3, 3, 96.0);

-- Insert demo financial metrics (monthly)
INSERT INTO financial_metrics (period_start, period_end, revenue_cu, revenue_zn, revenue_au, revenue_ag, total_revenue, cost_raw_materials, cost_electricity, cost_reagents, cost_labor, total_variable_costs, cost_maintenance, cost_transport, cost_utilities, cost_depreciation, total_fixed_costs, selling_expense_cu, selling_expense_zn, selling_expense_au, selling_expense_ag, interest_expense, fx_gains_losses, gross_profit, ebitda, net_income) VALUES
  (DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month'), DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month') + INTERVAL '1 month' - INTERVAL '1 day', 
   8450000, 12350000, 2850000, 1250000, 24900000,
   3200000, 1850000, 980000, 2450000, 8480000,
   1250000, 850000, 420000, 1580000, 4100000,
   168000, 247000, 57000, 25000, 580000, -125000,
   16420000, 11740000, 10535000),
  (DATE_TRUNC('month', CURRENT_DATE - INTERVAL '2 months'), DATE_TRUNC('month', CURRENT_DATE - INTERVAL '2 months') + INTERVAL '1 month' - INTERVAL '1 day',
   8120000, 11980000, 2720000, 1180000, 24000000,
   3100000, 1780000, 950000, 2380000, 8210000,
   1220000, 820000, 410000, 1580000, 4030000,
   162000, 240000, 54000, 24000, 560000, 95000,
   15790000, 11220000, 10405000);

-- Insert demo projects
INSERT INTO projects (project_name, description, status, start_date, end_date, budget, actual_cost) VALUES
  ('Mill Expansion Phase 2', 'Expand grinding capacity by 25% to increase throughput', 'in_progress', CURRENT_DATE - INTERVAL '45 days', CURRENT_DATE + INTERVAL '90 days', 5500000, 2850000),
  ('Tailings Dam Upgrade', 'Enhance tailings storage facility to meet new environmental standards', 'in_progress', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE + INTERVAL '120 days', 3200000, 1450000),
  ('SCADA System Integration', 'Implement real-time monitoring across all processing stages', 'planning', CURRENT_DATE + INTERVAL '15 days', CURRENT_DATE + INTERVAL '180 days', 1800000, 0),
  ('Flotation Circuit Optimization', 'Improve copper and zinc recovery rates through circuit redesign', 'completed', CURRENT_DATE - INTERVAL '180 days', CURRENT_DATE - INTERVAL '30 days', 2400000, 2350000);

-- Insert demo sales orders
INSERT INTO sales_orders (order_number, customer_name, customer_contact, product_type, quantity_mt, unit_price, total_amount, status, order_date, delivery_date) VALUES
  ('SO-2025-001', 'China Copper Refinery Ltd', 'zhang.wei@ccr.cn', 'copper', 450.50, 9500, 4279750, 'confirmed', CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '15 days'),
  ('SO-2025-002', 'Korea Zinc Industries', 'kim.park@kzi.kr', 'zinc', 820.75, 3200, 2626400, 'in_transit', CURRENT_DATE - INTERVAL '12 days', CURRENT_DATE + INTERVAL '3 days'),
  ('SO-2025-003', 'Tokyo Precious Metals', 'tanaka@tpm.jp', 'gold', 125.30, 65000, 8144500, 'pending', CURRENT_DATE - INTERVAL '2 days', CURRENT_DATE + INTERVAL '20 days'),
  ('SO-2025-004', 'Shanghai Metal Exchange', 'li.chen@sme.cn', 'copper', 520.80, 9600, 4999680, 'confirmed', CURRENT_DATE - INTERVAL '8 days', CURRENT_DATE + INTERVAL '12 days'),
  ('SO-2025-005', 'Silver Traders International', 'contact@sti.com', 'silver', 2850.40, 850, 2422840, 'delivered', CURRENT_DATE - INTERVAL '25 days', CURRENT_DATE - INTERVAL '5 days');

-- Insert demo integration logs
INSERT INTO integration_logs (source_system, data_type, status, records_processed) VALUES
  ('SCADA', 'Real-time sensor data', 'success', 15420),
  ('LIMS', 'Lab assay results', 'success', 342),
  ('SAGE', 'Financial transactions', 'success', 1250),
  ('SCADA', 'Equipment status', 'success', 8750),
  ('LIMS', 'Quality control data', 'success', 189);
