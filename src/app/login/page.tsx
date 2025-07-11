'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3002/chat', // remplace en prod
    },
  })

  if (error) {
    setError(error.message)
  }
}


  const handleLogin = async () => {
    setError(null)
    setLoading(true)

    const { data,error } = await supabase.auth.signInWithPassword({ email, password })
  console.log('LOGIN RESULT:', data)  // 🔍 Vérification

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
    router.push('/chat')
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Se connecter</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        className="w-full mb-4 px-4 py-2 border rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    <button
  onClick={loginWithGoogle}
  className="w-full mt-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
>
  Se connecter avec Google
</button>
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  )
}
