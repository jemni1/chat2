'use client'

import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { updateMessage,deleteMessage } from '@/app/admin/messages/page'
import Loading from '@/components/Loading'

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
  
const [loading, setLoading] = useState(false)
const getUserEmail = (id: string) => users.find((u) => u.id === id)?.email || 'Unknown'

  useEffect(() => {
    const fetchMessages = async () => {
        setLoading(true)
        const timer = setTimeout(() => {
    setLoading(false)
  }, 1500) 
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
         return () => clearTimeout(timer)

    }

    fetchMessages()
  }, [senderId, receiverId])
if (loading) {
  return <Loading />
}

  return (
    
<div className="px-40 flex flex-1 justify-center py-5">
<div className="layout-content-container flex flex-col max-w-[960px] flex-1">

<div className="flex flex-wrap justify-between gap-3 p-4"><p className="text-[#101518] tracking-light text-[32px] font-bold leading-tight min-w-72">All Messages</p></div>

<div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">

  
              <label className="flex flex-col min-w-40 flex-1">
                <select value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141c] focus:outline-0 focus:ring-0 border border-[#cedbe8] bg-slate-50 focus:border-[#cedbe8] h-14 bg-[image:--select-button-svg] placeholder:text-[#49739c] p-[15px] text-base font-normal leading-normal"
                >
                  <option value="">All senders</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
              </label>
            </div>

        
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <select value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141c] focus:outline-0 focus:ring-0 border border-[#cedbe8] bg-slate-50 focus:border-[#cedbe8] h-14 bg-[image:--select-button-svg] placeholder:text-[#49739c] p-[15px] text-base font-normal leading-normal"
                >
                  <option value="">All receivers</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.email}
              </option>
            ))}
          </select>
              </label>
            </div>

        
      


      <div className="flex overflow-hidden rounded-xl border border-[#d4dce2] bg-gray-50">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="table-67aa989e-dcd7-4076-8e5f-60f8b93ca4ef-column-120 px-4 py-3 text-left text-[#101518] w-[500px] text-sm font-medium leading-normal">Content</th>
                      <th className="table-67aa989e-dcd7-4076-8e5f-60f8b93ca4ef-column-240 px-4 py-3 text-left text-[#101518] w-[400px] text-sm font-medium leading-normal">Sender</th>
                      <th className="table-67aa989e-dcd7-4076-8e5f-60f8b93ca4ef-column-360 px-4 py-3 text-left text-[#101518] w-[400px] text-sm font-medium leading-normal">
                        Receiver
                      </th>
                      <th className="table-67aa989e-dcd7-4076-8e5f-60f8b93ca4ef-column-480 px-4 py-3 text-left text-[#101518] w-[400px] text-sm font-medium leading-normal">Date</th>
                      <th className="table-67aa989e-dcd7-4076-8e5f-60f8b93ca4ef-column-600 px-4 py-3 text-left text-[#101518] w-60 text-[#5c748a] text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                         {allmessages.map((msg) => (

                    <tr key={msg.id} className="border-t border-[#d4dce2]">
        <td className="w-[84px] px-4 py-2 text-[#5c748a] text-sm">
          <form action={updateMessage} className="flex items-center gap-2">
            <input type="hidden" name="id" value={msg.id} />
            <input
              type="text"
              name="content"
              defaultValue={msg.content}
              className="w-full border rounded-md px-2 py-1"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md">
              Modifier
            </button>
          </form>
        </td>

        <td className="px-4 py-2 text-[#5c748a] text-sm">
          {getUserEmail(msg.sender_id)}
        </td>

        <td className="px-4 py-2 text-[#5c748a] text-sm">
          {getUserEmail(msg.receiver_id)}
        </td>

        <td className="px-4 py-2 text-[#5c748a] text-sm">
          {msg.created_at?.slice(0, 10)}
        </td>

        <td className="px-4 py-2 text-[#5c748a] text-sm flex gap-2">
          
          <form action={deleteMessage}>
            <input type="hidden" name="id" value={msg.id} />
            <button className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md">
              Supprimer
            </button>
          </form>
        </td>
      </tr>
                            ))}

                    </tbody>
                </table>
              </div>
    </div>
    </div>
    
  )
}
