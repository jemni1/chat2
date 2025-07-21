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
      const { data: { user } } = await supabase.auth.getUser()
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user?.id)
        .single()
      if (profile?.role == 'admin') {
            redirect('/admin/messages')

      }
  revalidatePath('/', 'layout')
  redirect('/listofusers')
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

export async function returnToList() {
    
    redirect('/listofusers')


}


export async function chater(formData: FormData) {
  const receiverId = formData.get('receiver_id') as string
console.log(receiverId, "idreeeee");

  if (!receiverId) {
    throw new Error('Receiver ID is required')
  }

  redirect(`/chat?receiver=${receiverId}`)
}



