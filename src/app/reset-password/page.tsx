'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
 
function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const code = searchParams.get('code')

  if (!code) {
    alert('No code provided.')
    router.push('/')
    return
  }

  setLoading(false)
}, [searchParams, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      alert('Error updating password: ' + error.message)
    } else {
      alert('Password updated successfully!')
      router.push('/login')
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Set New Password</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="New password"
          className="mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">Update Password</Button>
      </form>
    </div>
  )
}
export default function ResetPassword(){
return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  )
}
