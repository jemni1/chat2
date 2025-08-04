
export const dynamic = 'force-dynamic'
import { createClient } from '@/utils/supabase/server'  
import ChatClient from '@/components/ChatClient'

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
}


export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  // console.log("getuqser",user)
  if (!user) {
    return <>Tannena</>
  }

  const userId = user.id
    const params = await searchParams

   const  receiverId = params.receiver ?? null



  let messages: Message[] = []
  if (receiverId) {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .or(
        `and(sender_id.eq.${userId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${userId})`
      )
      .order('created_at', { ascending: true })

    messages = data ?? []
  }

  return (
    <main className="w-[999px] mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Discussion </h1>
      <ChatClient userId={userId} receiverId={receiverId} initialMessages={messages} />
    </main>
  )
}
