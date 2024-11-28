'use client';

import { LucideShieldCheck } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary p-3 rounded-full mb-4">
            <LucideShieldCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">ApprovalFlow</h1>
          <p className="text-slate-600 text-center mt-2">
            Secure and efficient approval workflows
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}