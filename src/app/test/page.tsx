"use client";

import Link from "next/link";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Deployment Test Page</h1>
        <p className="text-gray-600 mb-6">
          If you can see this page, the Next.js application is working correctly.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-700">
            This is a test page to verify that the application routing is working properly.
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Link 
            href="/" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out text-center"
          >
            Go to Home Page
          </Link>
          
          <Link 
            href="/api/health" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out text-center"
          >
            Check API Health
          </Link>
          
          <Link 
            href="/api/debug" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out text-center"
          >
            Debug Environment Variables
          </Link>
        </div>
      </div>
    </div>
  );
}