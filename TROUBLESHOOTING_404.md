# Troubleshooting 404 Error on Vercel Deployment

This document provides steps to diagnose and fix the 404 error you're experiencing after deploying to Vercel.

## Common Causes and Solutions

### 1. Environment Variables Not Set

The most common cause of 404 errors in this application is missing environment variables.

**Solution:**
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add all required environment variables:
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

### 2. Database Not Set Up

The application requires a properly configured Supabase database.

**Solution:**
1. Create a new Supabase project
2. Run the SQL schema from `src/scripts/uel-deployment-schema.sql`
3. Ensure the database connection variables are correctly set in Vercel

### 3. Incorrect Build Settings

Vercel might be using incorrect build settings.

**Solution:**
1. Go to your Vercel project dashboard
2. Navigate to Settings > General
3. Ensure the build settings are:
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### 4. Routing Issues

Next.js routing might not be configured correctly.

**Debugging Steps:**
1. Test the API endpoints:
   - Visit `https://your-deployment-url.vercel.app/api/health`
   - Visit `https://your-deployment-url.vercel.app/api/debug`
   
2. Test the test page we created:
   - Visit `https://your-deployment-url.vercel.app/test`

### 5. Redeploy the Application

Sometimes a fresh deployment resolves issues.

**Steps:**
1. Make a small change to trigger a new deployment
2. Or redeploy from the Vercel dashboard:
   - Go to Deployments
   - Select the latest deployment
   - Click "Redeploy"

## Diagnostic URLs

After redeployment, check these URLs to diagnose the issue:

1. `/api/health` - Should return `{ status: 'ok', timestamp: '...' }`
2. `/api/debug` - Should show environment variable status
3. `/test` - Should show the test page
4. `/` - Should show the main landing page

## Logs and Monitoring

Check Vercel logs for detailed error information:

1. Go to your Vercel project dashboard
2. Navigate to the latest deployment
3. Click on "Functions" tab to see serverless function logs
4. Check the "Build Logs" for any build errors

## Contact Support

If none of the above solutions work:

1. Check that you're using the correct domain URL
2. Verify that all environment variables are correctly set
3. Ensure the Supabase database is properly configured with the schema