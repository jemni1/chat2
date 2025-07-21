'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/login/actions'
import FilteredMessages from '@/components/FiltredMessages'
interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
}
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
  await (await supabase).from('messages').update({content:newContent}).eq('id', messageId)

  redirect('/admin/messages')
}
export default async function AdminMessagesPage() {

      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const { data: allUsers } = await supabase.from('users').select('id, email')
      const otherUsers = allUsers?.filter((u) => u.id !== user?.id) ?? []

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user?.id)
        .single()
    console.log(profile);
    
      if (profile?.role !== 'admin') {
  redirect('/listofusers')

      }
   
    

  let messages: Message[] = []
  const { data } = await supabase
  .from('messages')
  .select('*')
  .order('created_at', { ascending: true })
    messages = data ?? []



  return (
    
    <div>
        <form action={signOut} className="flex justify-end mb-4">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 text-sm"
        >
          Se déconnecter
        </button>
      </form>
      <h1>Interface admin : messages</h1>
      <FilteredMessages messages={messages} users={otherUsers}></FilteredMessages>
    </div>
  )
}