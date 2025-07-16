'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login')
  }

  revalidatePath('/', 'layout')
  redirect('/chat')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const dt = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
const email=dt.email
  const { data,error } = await supabase.auth.signUp(dt)

  if (error) {
    redirect('/login')
  }
  if (data.user?.id) {
        await supabase.from('users').insert([{ id: data.user.id, email }])
      }
  revalidatePath('/', 'layout')
  redirect('/login')
}
export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login')


}