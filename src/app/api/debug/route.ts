import { NextResponse } from 'next/server'

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
    SITE_BASE: process.env.SITE_BASE ? process.env.SITE_BASE : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
  }

  return NextResponse.json({
    status: 'debug',
    envVars,
    timestamp: new Date().toISOString()
  })
}