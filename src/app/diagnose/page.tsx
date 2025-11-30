"use client";

import { useEffect, useState } from "react";

interface EnvCheck {
  hasWindow: boolean;
  envVars?: {
    NEXT_PUBLIC_SUPABASE_URL: boolean;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: boolean;
    SITE_BASE: boolean;
  } | string;
}

interface ApiCheck {
  status?: number;
  ok?: boolean;
  url?: string;
  error?: string;
}

interface Diagnosis {
  envCheck?: EnvCheck;
  healthCheck?: ApiCheck;
  debugCheck?: ApiCheck;
  timestamp?: string;
  error?: string;
}

export default function DiagnosePage() {
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runDiagnosis = async () => {
      try {
        // Check if we're in a browser environment
        const isBrowser = typeof window !== "undefined";
        
        // Check environment variables
        const envCheck = {
          hasWindow: isBrowser,
          envVars: isBrowser ? {
            NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            SITE_BASE: !!process.env.SITE_BASE,
          } : "Not available in server-side rendering"
        };

        // Try to call the health API
        let healthCheck = null;
        try {
          const healthResponse = await fetch("/api/health");
          healthCheck = {
            status: healthResponse.status,
            ok: healthResponse.ok,
            url: healthResponse.url
          };
        } catch (error) {
          healthCheck = {
            error: error instanceof Error ? error.message : "Unknown error"
          };
        }

        // Try to call the debug API
        let debugCheck = null;
        try {
          const debugResponse = await fetch("/api/debug");
          debugCheck = {
            status: debugResponse.status,
            ok: debugResponse.ok,
            url: debugResponse.url
          };
        } catch (error) {
          debugCheck = {
            error: error instanceof Error ? error.message : "Unknown error"
          };
        }

        setDiagnosis({
          envCheck,
          healthCheck,
          debugCheck,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        setDiagnosis({
          error: error instanceof Error ? error.message : "Unknown error"
        });
      } finally {
        setLoading(false);
      }
    };

    runDiagnosis();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Deployment Diagnosis</h1>
        <p className="text-gray-600 mb-6">
          This page helps diagnose issues that might cause 404 errors on deployment.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {diagnosis?.error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700 font-semibold">Error during diagnosis:</p>
                <p className="text-red-700">{diagnosis.error}</p>
              </div>
            ) : null}

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Environment Check</h2>
              <pre className="bg-white p-4 rounded overflow-x-auto text-sm">
                {JSON.stringify(diagnosis?.envCheck, null, 2)}
              </pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">Health API Check</h2>
              <pre className="bg-white p-4 rounded overflow-x-auto text-sm">
                {JSON.stringify(diagnosis?.healthCheck, null, 2)}
              </pre>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <h2 className="text-lg font-semibold text-purple-800 mb-2">Debug API Check</h2>
              <pre className="bg-white p-4 rounded overflow-x-auto text-sm">
                {JSON.stringify(diagnosis?.debugCheck, null, 2)}
              </pre>
            </div>

            <div className="bg-gray-50 border-l-4 border-gray-500 p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Timestamp</h2>
              <p className="text-gray-700">{diagnosis?.timestamp}</p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Troubleshooting Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Check that all environment variables are set in your Vercel project settings</li>
            <li>Verify that your Supabase database is properly configured with the schema</li>
            <li>Ensure your Vercel build settings are correct:
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>Build Command: <code className="bg-gray-100 px-1 rounded">next build</code></li>
                <li>Output Directory: <code className="bg-gray-100 px-1 rounded">.next</code></li>
                <li>Install Command: <code className="bg-gray-100 px-1 rounded">npm install</code></li>
              </ul>
            </li>
            <li>Try redeploying your application from the Vercel dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
}