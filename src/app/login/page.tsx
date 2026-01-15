"use client";

import { useActionState } from "react"; // DİKKAT: Next.js sürümüne göre bu hook değişebilir, useFormState de olabilir.
import { login } from "@/actions/auth-actions"; // Birazdan yazacağız
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, { error: "" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-500">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">Yönetici Girişi</h1>
          <p className="text-slate-400 text-sm mt-2">Devam etmek için kimliğini doğrula.</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <Input 
              name="email" 
              type="email" 
              placeholder="admin@mail.com" 
              required 
              className="bg-slate-950 border-slate-800 text-white h-12"
            />
          </div>
          <div>
            <Input 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              className="bg-slate-950 border-slate-800 text-white h-12"
            />
          </div>

          {state?.error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg">
              {state.error}
            </div>
          )}

          <Button 
            disabled={isPending} 
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Giriş Yap"}
          </Button>
        </form>
      </div>
    </div>
  );
}