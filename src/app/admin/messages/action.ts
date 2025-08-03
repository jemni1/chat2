'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function deleteMessage(formData: FormData) {
  const messageId = formData.get('id') as string

  const supabase = createClient()
  await (await supabase).from('messages').delete().eq('id', messageId)

  redirect('/admin/messages')
}

export async function updateMessage(formData: FormData) {
  const messageId = formData.get('id') as string
  const newContent = formData.get('content') as string

  const supabase = createClient()
  await (await supabase).from('messages').update({ content: newContent }).eq('id', messageId)

  redirect('/admin/messages')
}
