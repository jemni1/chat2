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
  receiverId: string | null
  initialMessages: Message[]
}

export default function ChatClient({ userId, receiverId, initialMessages }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')

     
useEffect(() => {
  if (!userId || !receiverId) return

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
      </div>
    </>
  )
}
