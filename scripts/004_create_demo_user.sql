-- This script creates a demo user account for testing
-- Note: This should be run AFTER the schema and seed data scripts

-- The demo user will be created through Supabase Auth
-- Email: demo@amak.com
-- Password: demo123456
-- Role: CEO (full access)

-- After creating the user through Supabase Auth UI or signup, 
-- update their profile with the following:

-- UPDATE user_profiles 
-- SET role = 'ceo', 
--     full_name = 'Demo User',
--     department = 'Executive',
--     updated_at = NOW()
-- WHERE email = 'demo@amak.com';

-- For automatic demo user creation, you would need to use Supabase's 
-- Admin API or create the user through the signup flow.

-- Alternatively, you can manually create a user in Supabase Dashboard:
-- 1. Go to Authentication > Users
-- 2. Click "Add User"
-- 3. Email: demo@amak.com
-- 4. Password: demo123456
-- 5. Confirm email automatically
-- 6. The trigger will create the profile automatically

-- Then run this to set the role:
-- UPDATE user_profiles 
-- SET role = 'ceo', 
--     department = 'Executive'
-- WHERE email = 'demo@amak.com';
