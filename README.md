# AMAK Mining Operations Management System

A comprehensive enterprise application for **Al Masane Al Kobra Mining Co.** that provides detailed process tracking, financial metrics, workforce management, and executive dashboards for mining operations.

## 🎯 Overview

This system manages the complete mining and processing operations for:
- **Copper-Zinc Mineral Processing** (Crushing → Grinding → Flotation → Filtration → Shipment)
- **Gold-Silver Mining Processing** (Crushing → Grinding → Leaching → Carbon Absorption → Smelting)
- **Financial Metrics** (Revenue, Costs, EBITDA, Income Statements)
- **Workforce Management** (Shift scheduling, attendance, productivity tracking)
- **Project Management** (Capital projects, infrastructure, operational excellence)
- **Sales Operations** (Order management, customer analytics, shipment tracking)
- **Executive Reporting** (Comprehensive dashboards and automated reports)

## 🚀 Features

### 1. **Copper-Zinc Processing Module**
- Mining operations tracking (drilled volume, mined ore, ROM stockpile)
- Crushing & grinding metrics (throughput, WIP stock, unaccounted tonnes)
- Flotation performance (Cu/Zn concentrate production, recovery rates, tailings)
- Filtration & dewatering (WMT/DMT, moisture content, concentrate quality)
- Real-time KPIs and process visualization

### 2. **Gold-Silver Processing Module**
- Mining & ROM stockpile management
- Leaching operations (cyanide consumption, dissolution recovery)
- Carbon absorption (CIP tanks, carbon activity, Au/Ag absorbed)
- Smelting & refining (gold doré bars, silver bullion production)
- Comprehensive process flow tracking

### 3. **Financial Metrics Dashboard**
- Revenue analysis by metal type (Copper, Zinc, Gold, Silver)
- Cost breakdown (Variable costs, Fixed costs, Selling expenses, G&A)
- EBITDA tracking and margin analysis
- Income statement with budget comparison
- Cost optimization opportunities

### 4. **Time & Shift Management**
- Real-time shift monitoring (Day, Afternoon, Night shifts)
- Attendance tracking and analytics
- Productivity metrics by shift and department
- Workforce allocation and scheduling
- Activity logs and incident reporting

### 5. **Project Management System**
- Active project tracking with milestones
- Budget utilization and variance analysis
- Team management and resource allocation
- Progress monitoring and status updates
- Capital projects and infrastructure initiatives

### 6. **Sales Operations**
- Order management and tracking
- Customer analytics and distribution
- Sales trends and revenue forecasting
- Shipment status and logistics
- Customer relationship management

### 7. **Executive Dashboard**
- High-level KPIs for senior management
- Operational overview across all departments
- Financial performance summary
- Active projects and pending orders
- Real-time alerts and notifications

### 8. **Reporting System**
- Automated report generation (Daily, Weekly, Monthly)
- Operations reports (Production, Processing, KPIs)
- Financial reports (Income statements, Cost analysis)
- Executive summaries and briefings
- Scheduled report distribution

## 🔐 Role-Based Access Control

The system supports multiple user roles with appropriate permissions:

- **Shift Workers**: Access to shift schedules, attendance, and basic operations data
- **Engineers**: Full access to processing modules and technical KPIs
- **Supervisors**: Team management, shift oversight, and operational metrics
- **Managers**: Department-wide analytics, project management, and financial data
- **Executives**: Executive dashboard, comprehensive reports, and strategic insights
- **CEO**: Complete system access with high-level overview and decision-making tools

## 🔌 System Integrations

The platform is designed to integrate with existing systems:

- **SAGE**: Financial data and accounting integration
- **SCADA**: Real-time operational data from processing equipment
- **LIMS**: Laboratory data for ore grades, assays, and quality control

## 📊 Key Performance Indicators (KPIs)

The system tracks over 100+ KPIs across all operations:

### Mining & Ore Handling
- Drilled Volume (MT)
- Mined Ore (Quantity & Grade)
- ROM Stockpile Balance
- Pre-Treatment Stock

### Processing Operations
- Ore Crushed/Ground (MT)
- Mill Feed Rate (MT/hr)
- Flotation Recovery Rate (%)
- Concentrate Production (Cu%, Zn%)
- Gold/Silver Recovery (oz)

### Financial Metrics
- Total Revenue by Product
- EBITDA and Operating Margin
- Cost of Production by Metal
- Budget vs. Actual Variance

### Workforce Metrics
- Attendance Rate (%)
- Shift Productivity
- Worker Allocation
- Incident Tracking

## 🎨 Design & User Experience

- **Modern, Clean Interface**: White background with professional mining company theme
- **Corporate Bold Headers**: Clear hierarchy and legible fonts
- **Icons & Illustrations**: Professional iconography (no emojis)
- **AMAK Branding**: Company logo integrated throughout the application
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Data Visualization**: Interactive charts and graphs for better insights

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS v4
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth with role-based access
- **Charts**: Recharts for data visualization
- **Deployment**: Vercel

## 📦 Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (already configured)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd amak-mining-demo
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up the database**
   - The database schema is already created in Supabase
   - Run the SQL scripts in the `scripts` folder to seed demo data:
     - `001_create_schema.sql`
     - `002_seed_demo_data.sql`
     - `003_create_profile_trigger.sql`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open the application**
   - Navigate to `http://localhost:3000`
   - Sign up with any email/password for demo purposes
   - Explore the comprehensive mining operations system

## 🎭 Demo Accounts

For the CEO demonstration, you can create accounts with different roles:

- **CEO Account**: Full system access
- **Manager Account**: Department-level access
- **Engineer Account**: Technical operations access
- **Supervisor Account**: Team management access

All accounts can be created through the signup page with any email/password combination.

## 📱 Key Pages & Navigation

### Main Navigation
- **Dashboard** (`/dashboard`): Executive overview with key metrics
- **Copper-Zinc Processing** (`/processing/copper-zinc/*`): Complete Cu-Zn workflow
- **Gold-Silver Processing** (`/processing/gold-silver/*`): Complete Au-Ag workflow
- **Financial Metrics** (`/financials/*`): Revenue, costs, and EBITDA analysis
- **Shift Management** (`/operations/shifts`): Workforce and attendance tracking
- **Projects** (`/projects`): Project management and tracking
- **Sales Operations** (`/sales/orders`): Order and customer management
- **Reports** (`/reports`): Comprehensive reporting system

## 🔄 Data Flow

1. **Operational Data**: Real-time data from SCADA systems flows into processing modules
2. **Laboratory Data**: LIMS integration provides ore grades and quality metrics
3. **Financial Data**: SAGE integration ensures accurate cost and revenue tracking
4. **Workforce Data**: Shift management system tracks attendance and productivity
5. **Executive Reporting**: Aggregated data flows to executive dashboard and reports

## 📈 Tangible Outputs

The system produces real, actionable outputs:

- **Daily Production Reports**: Detailed metrics on ore processed, concentrate produced
- **Financial Statements**: Income statements, cost analysis, EBITDA calculations
- **Shift Performance Reports**: Attendance, productivity, and efficiency metrics
- **Project Status Updates**: Progress tracking, budget utilization, milestone completion
- **Sales Analytics**: Order status, customer insights, revenue forecasts
- **Executive Summaries**: High-level overviews for strategic decision-making

## 🎯 CEO Demonstration Highlights

When showcasing to the CEO, focus on:

1. **Executive Dashboard**: Real-time overview of all operations
2. **Financial Performance**: EBITDA trends, revenue by product, cost optimization
3. **Operational Efficiency**: Processing KPIs, recovery rates, throughput metrics
4. **Project Portfolio**: Active projects, budget utilization, completion status
5. **Sales Pipeline**: Order management, customer analytics, revenue forecasts
6. **Workforce Management**: Shift productivity, attendance rates, team performance
7. **Reporting Capabilities**: Automated reports, scheduled distribution, custom analytics

## 🔒 Security & Compliance

- **Row Level Security (RLS)**: Database-level security for all tables
- **Role-Based Access Control**: Granular permissions based on user roles
- **Audit Logging**: Track all system changes and user activities
- **Data Encryption**: Secure data transmission and storage
- **HSE Compliance**: Health, safety, and environmental tracking

## 📞 Support & Maintenance

For technical support or questions about the system:
- **IT Labs**: contact@it-labs.com
- **Phone**: +1 800 920 4829
- **Address**: 4521 PGA Blvd #224, Palm Beach Gardens, FL 33410

## 📄 License

© 2025 AMAK Mining - Al Masane Al Kobra Mining Co. All rights reserved.

---

**Built with precision for mining excellence** 🏔️⛏️
