'use client'

import { useState } from 'react'
import { supabase } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async () => {
    setError(null)
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Optionnel: insérer l’utilisateur dans ta table 'users'
    if (data.user?.id) {
      await supabase.from('users').insert([{ id: data.user.id, email }])
    }

    setLoading(false)
    router.push('/login')
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>

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
        onClick={handleSignup}
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Création...' : 'S’inscrire'}
      </button>

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  )
}
