'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { signOut,returnToList } from '@/app/login/actions'

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
}

interface Props {
  userId: string
  receiverId: string |string[] | null
  initialMessages: Message[]
}

export default function ChatClient({ userId, receiverId, initialMessages }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [receiverEmail, setReceiverEmail] = useState<string | null>(null)

     
useEffect(() => {
  if (!userId || !receiverId) return

  const fetchReceiverEmail = async () => {
      const { data, error } = await supabase
        .from('users') // Remplace 'users' par le nom exact de ta table utilisateurs
        .select('email')
        .eq('id', receiverId)
        .single()

      if (error) {
        console.error('Erreur lors de la récupération de l’email', error)
      } else {
        setReceiverEmail(data.email)
      }
    }

    fetchReceiverEmail()

  const channel = supabase
    .channel('messages-realtime')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      },
      (payload) => {
        const message: Message = payload.new as Message

        // Filtrer seulement les messages entre user et receiver
        const isBetweenUsers =
          (message.sender_id === userId && message.receiver_id === receiverId) ||
          (message.sender_id === receiverId && message.receiver_id === userId)

        if (isBetweenUsers) {
          setMessages((prev) => [...prev, message])
        }
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [userId, receiverId])
  const sendMessage = async () => {
    if (!newMessage.trim() || !userId || !receiverId) return
const session = await supabase.auth.getSession();
console.log('Token JWT:', session?.data.session?.access_token);
    const { data, error } = await supabase
      .from('messages')
      .insert([{ sender_id: userId, receiver_id: receiverId, content: newMessage }])
      .select('*')

    if (error) {
      console.error('Erreur lors de l’envoi du message', error)
      return
    }

    if (data && data.length > 0) {
      setNewMessage('')
    }
  }
  
  


  return (
    <>
    <div className="flex justify-between px-4 py-3 gap-3">
  <form action={returnToList}>
    <button
      type="submit"
      className="h-10 px-4 rounded-full bg-[#eaedf1] text-[#101518] text-sm font-bold"
    >
      Back to User List
    </button>
  </form>

  <form action={signOut}>
    <button
      type="submit"
      className="h-10 px-4 rounded-full bg-[#dce8f3] text-[#101518] text-sm font-bold"
    >
      Sign Out
    </button>
  </form>
</div>

<div className="flex justify-center px-6 py-5">
  <div className="flex flex-col w-full max-w-[960px]">
    <div className="flex items-center gap-2 px-4 pb-2">
      <a className="text-[#5c748a] text-base font-medium" href="#">Messages</a>
      <span className="text-[#5c748a]">/</span>
      <span className="text-[#101518] text-base font-medium">{receiverEmail}</span>
    </div>

    <div className="flex flex-col gap-2 px-2 py-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 px-2 ${
            msg.sender_id === userId ? 'justify-end' : 'justify-start'
          }`}
        >
          {msg.sender_id !== userId && (
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpONtx9PEmGm4vK7UJBQz4PKSn9q60SaSBWVlsfOPJsHRZWuMbUgKVMdnnXMlhXJEN8ztHTnbHHNVkbb-H6d4oiuNxNbwNCVezvBszKoKBy7pg4YEZ9wGiV_3tVn2pqJamxYGoYmPIbyYvs-7SIoQszJB1uBlYuTqNbCDy6b4jrJMY77w3s1nNC-x-W7D2sLp4-OKAIvExv62tJOtt0_hYvPIjh4jrMc2xhEhfyLYiTpnHzUO0cCbhT13r_LCezQp8D77NhQQobRU")`,
              }}
            />
          )}

          <div className="max-w-[70%] flex flex-col">
            <p
              className={`px-4 py-3 rounded-xl text-base font-normal ${
                msg.sender_id === userId
                  ? 'bg-blue-100 text-blue-800 self-end'
                  : 'bg-[#eaedf1] text-[#101518] self-start'
              }`}
            >
              {msg.content}
            </p>
          </div>

          {/* Avatar on right if sender */}
          {msg.sender_id === userId && (
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url("https://example.com/your-user-avatar.png")`,
              }}
            />
          )}
        </div>
      ))}
    </div>

    {/* Message Input */}
    <div className="flex items-center px-4 py-3 gap-3">
      <label className="flex flex-1">
        <div className="flex w-full rounded-xl overflow-hidden bg-[#eaedf1]">
          <input
            type="text"
            placeholder="Write a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 h-12 px-4 text-base bg-transparent border-none placeholder:text-[#5c748a] text-[#101518] focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="h-12 px-4 bg-[#dce8f3] text-sm text-[#101518] font-medium rounded-l-none"
          >
            Send
          </button>
        </div>
      </label>
    </div>
  </div>
</div>

{/* 
    <form action={returnToList}  className="mb-4">
  <button
    type="submit"
    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
  >
    ← Retour à la liste
  </button>
</form>
    <form action={signOut} className="flex justify-end mb-4">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Se déconnecter
        </button>
      </form>
      <div className="h-80 overflow-y-auto mb-4 border p-4 rounded bg-gray-100">
        {messages.map((msg) => (
          <p
            key={msg.id}
            className={`mb-2 ${
              msg.sender_id === userId ? 'text-right text-blue-700' : 'text-left text-gray-800'
            }`}
          >
            <span className="block bg-white px-4 py-2 rounded shadow inline-block">{msg.content}</span>
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-grow px-4 py-2 border rounded"
          type="text"
          placeholder="Votre message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage()
          }}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Envoyer
        </button>
      </div> */}
    </>
  )
}
