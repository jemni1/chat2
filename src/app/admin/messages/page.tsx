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
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#eaedf1] px-10 py-3">
          <div className="flex items-center gap-4 text-[#101518]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#101518] text-lg font-bold leading-tight tracking-[-0.015em]">Admin Panel</h2>
          </div>
          <form action={signOut} className="flex justify-end mb-4">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#eaedf1] text-[#101518] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Sign Out</span>
          </button>
          </form>
        </header>
      <FilteredMessages messages={messages} users={otherUsers}></FilteredMessages>
    </div>
  )
}