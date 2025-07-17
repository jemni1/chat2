'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/login/actions'

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
      console.log(user,"user");
      
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
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Se déconnecter
        </button>
      </form>
      <h1>Interface admin : messages</h1>
      <ul>
        {(messages ?? []).map((msg) => (
          <li key={msg.id} className="my-4">
            <p><strong>{msg.content}</strong></p>

            <form action={deleteMessage}>
              <input type="hidden" name="id" value={msg.id} />
              <button type="submit" className="text-red-500">Supprimer</button>
            </form>
                <form action={updateMessage}>
              <input type="hidden" name="id" value={msg.id} />
              <input
                name="content"
                defaultValue={msg.content}
                className="border px-2 py-1"
              />
              <button type="submit" className="text-blue-500">Modifier</button>
            </form>
            
          </li>
        ))}
      </ul>
    </div>
  )
}