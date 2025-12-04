# AMAK Mining Demo - Setup Guide

## Quick Start for Demo

### Option 1: Use Demo Account (Recommended)
1. Go to the login page: `/auth/login`
2. Click the **"Try Demo Account"** button
3. You'll be automatically logged in with demo credentials

### Option 2: Create Your Own Account

#### If Email Confirmation is Disabled (Instant Access)
1. Go to `/auth/signup`
2. Fill in your details:
   - Full Name: Your name
   - Email: Any valid email
   - Password: At least 6 characters
   - Role: Choose from Shift Worker, Engineer, Supervisor, Manager, Executive, or CEO
3. Click "Create Account"
4. You'll be automatically redirected to the dashboard

#### If Email Confirmation is Required
1. Complete the signup form
2. Check your email for a confirmation link
3. Click the confirmation link
4. Return to `/auth/login` and sign in with your credentials

## Troubleshooting Authentication Issues

### "Can't move forward from signin page"

If you're stuck after signing up, try these solutions:

1. **Check Email Confirmation**
   - Look in your inbox for a confirmation email from Supabase
   - Check spam/junk folders
   - Click the confirmation link before trying to log in

2. **Use the Demo Account**
   - On the login page, click "Try Demo Account"
   - This bypasses email confirmation requirements

3. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for `[v0]` prefixed messages
   - These will show authentication flow details

4. **Clear Browser Data**
   - Clear cookies and local storage
   - Try signing up again with a different email

### Common Error Messages

- **"Email not confirmed"**: You need to verify your email before logging in
- **"Invalid login credentials"**: Check your email and password are correct
- **"User already registered"**: Try logging in instead of signing up

## Database Setup

### Running SQL Scripts

The demo data is automatically seeded when you run the SQL scripts in order:

1. `scripts/001_create_schema.sql` - Creates all tables and RLS policies
2. `scripts/002_seed_demo_data.sql` - Populates demo data
3. `scripts/003_create_profile_trigger.sql` - Sets up automatic profile creation

To run these scripts:
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste each script
4. Run them in order

## Demo Features

### Available Modules
- **Dashboard**: Executive overview with key metrics
- **Copper-Zinc Processing**: Mining, Crushing, Flotation, Filtration
- **Gold-Silver Processing**: Mining, Leaching, Absorption, Smelting
- **Financial Metrics**: Revenue, costs, EBITDA, income statements
- **Operations**: Shift management and workforce tracking
- **Projects**: Project tracking with budgets and milestones
- **Sales**: Order management and customer analytics
- **Reports**: Comprehensive reporting across all modules

### Role-Based Access
Different roles see different features:
- **Shift Workers**: Basic operations and shift data
- **Engineers**: Technical processing details
- **Supervisors**: Team management and shift oversight
- **Managers**: Departmental metrics and budgets
- **Executives**: High-level KPIs and trends
- **CEO**: Complete system access and executive dashboard

## Support

If you continue to experience issues:
1. Check the browser console for `[v0]` debug messages
2. Verify all environment variables are set correctly
3. Ensure Supabase integration is properly configured
4. Try the "Try Demo Account" button for immediate access

## Environment Variables Required

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
\`\`\`

## Demo Credentials

For testing purposes, you can create accounts with any email/password combination. The system includes:
- Pre-populated mining operations data (30 days)
- Financial metrics (2 months)
- Active projects and sales orders
- Integration logs from SAGE, SCADA, and LIMS systems
