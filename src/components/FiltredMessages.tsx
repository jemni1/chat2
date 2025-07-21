'use client'

import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { updateMessage,deleteMessage } from '@/app/admin/messages/page'
interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
}
interface User {
  id: string
  email: string
}

interface FilteredMessagesProps {
  messages: Message[]
  users: User[]
}
export default function FilteredMessages({ messages, users }: FilteredMessagesProps) {
  const [allmessages, setallmessages] = useState<Message[]>(messages)
  const [senderId, setSenderId] = useState('')
  const [receiverId, setReceiverId] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      let query = supabase.from('messages').select('*')

      if (senderId) {
        query = query.eq('sender_id', senderId)
      }

      if (receiverId) {
        query = query.eq('receiver_id', receiverId)
      }

      const { data, error } = await query.order('created_at', { ascending: true })

      if (!error && data) {
        setallmessages(data)
      } else {
        console.error('Erreur de récupération des messages', error)
      }
    }

    fetchMessages()
  }, [senderId, receiverId])

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <div>
          <label>Sender:</label>
          <select
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="">Tous les envoyeurs</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Receiver:</label>
          <select
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="">Tous les receveurs</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages filtrés */}
      <ul>
        {allmessages.map((msg) => (
          <li key={msg.id} className="mb-2 border p-2 rounded">
            <div className="flex gap-2">
              <form action={updateMessage} className="flex items-center gap-x-2">
      <input type="hidden" name="id" value={msg.id} />
      <input
        name="content"
        defaultValue={msg.content}
        className="rounded-xl border px-2 py-1"
      />
      <button
        type="submit"
        className="hover:bg-blue-400 rounded-xl p-2 bg-blue-600 text-white"
      >
        Modifier
      </button>
    </form>

              <form action={deleteMessage}>
      <input type="hidden" name="id" value={msg.id} />
      <button
        type="submit"
        className="hover:bg-red-400 rounded-xl p-2 bg-red-600 text-white"
      >
        Supprimer
      </button>
    </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
