'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
}

export default function ChatPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [receiverId, setReceiverId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  // 1. Obtenir l’utilisateur courant et identifier l’autre
  useEffect(() => {
    async function fetchUsers() {
      const { data: sessionData } = await supabase.auth.getUser()
      const currentUserId = sessionData.user?.id
      setUserId(currentUserId ?? null)

      if (!currentUserId) return

      // 2. Trouver l’autre utilisateur dans la table 'users'
      const { data: allUsers } = await supabase.from('users').select('*')
      const other = allUsers?.find((u) => u.id !== currentUserId)
      setReceiverId(other?.id ?? null)
    }

    fetchUsers()
  }, [])

  // 3. Charger les messages entre user et receiver
  useEffect(() => {
    if (!userId || !receiverId) return

    async function fetchMessages() {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${userId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${userId})`
        )
        .order('created_at', { ascending: true })

      if (!error && data) setMessages(data as Message[])
    }

    fetchMessages()
  }, [userId, receiverId])

  // 4. Envoyer message
  const sendMessage = async () => {
    if (!newMessage || !userId || !receiverId) return

    await supabase.from('messages').insert([
      {
        sender_id: userId,
        receiver_id: receiverId,
        content: newMessage,
      },
    ])

    setNewMessage('')

    // recharger manuellement (ou tu peux faire real-time après)
    const { data } = await supabase
      .from('messages')
      .select('*')
      .or(
        `and(sender_id.eq.${userId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${userId})`
      )
      .order('created_at', { ascending: true })

    setMessages(data as Message[])
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Discussion entre vous deux</h1>

      <div className="h-80 overflow-y-auto mb-4 border p-4 rounded bg-gray-100">
        {messages.map((msg) => (
          <p
            key={msg.id}
            className={`mb-2 ${
              msg.sender_id === userId ? 'text-right text-blue-700' : 'text-left text-gray-800'
            }`}
          >
            <span className="block bg-white px-4 py-2 rounded shadow inline-block">
              {msg.content}
            </span>
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
    </div>
  )
}
