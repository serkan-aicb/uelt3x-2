# University of East London Deployment Guide

This guide explains how to set up the Talent3X platform for University of East London using the provided SQL schema file.

## Prerequisites

1. A Supabase account
2. A new Supabase project for University of East London
3. Supabase SQL Editor access

## Deployment Steps

### 1. Apply the Database Schema

1. Open your new Supabase project for University of East London
2. Navigate to the SQL Editor in your Supabase dashboard
3. Copy the contents of `src/scripts/uel-deployment-schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" to execute the script

This will create all necessary tables, types, policies, and indexes for the Talent3X platform.

### 2. Seed Initial Data

The schema file includes initial seeding for:
- Skills database with 15 common technology skills
- A sample admin code (`UEL-ADMIN-2025`) valid for 1 year

### 3. Configure Environment Variables

Update your `.env` file with the appropriate values for University of East London:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ENVELOPE_MASTER_KEY=your_envelope_master_key
PINATA_JWT=your_pinata_jwt
POLYGON_RPC_URL=https://polygon-amoy.infura.io/v3/your-infura-key
WALLET_PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=your_contract_address
SITE_BASE=https://uel.talent3x.io
```

### 4. Create Additional Admin Codes (Optional)

For security, you may want to create additional admin codes with the `npm run create-admin-code` script or directly in the database:

```sql
INSERT INTO admin_codes (code, purpose, valid_from, valid_to) VALUES
  ('YOUR-SECURE-CODE', 'University of East London Admin', NOW(), NOW() + INTERVAL '1 year');
```

### 5. Test the Deployment

1. Run the development server: `npm run dev`
2. Visit http://localhost:3000
3. Verify that the University of East London branding appears correctly
4. Test admin login with the sample code `UEL-ADMIN-2025`

## Notes

- The schema file is designed to be idempotent - it can be run multiple times without causing errors
- All Row Level Security (RLS) policies are included to ensure proper data access controls
- The initial skills seeding can be customized or expanded based on University of East London's specific program requirements