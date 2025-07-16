import { createClient } from '@/utils/supabase/server'  
import { chater } from '../login/actions'

export default async function ListOfClient() {
    const supabase = await createClient()


  

      const { data: {user} } = await supabase.auth.getUser()
      const currentUserId = user?.id

      const { data: allUsers } = await supabase.from('users').select('id, email')
      const otherUsers = allUsers?.filter((u) => u.id !== currentUserId) ?? []
      console.log(otherUsers);
      
      return(

  <ul className="space-y-2">
        {otherUsers.map((user) => (
          <li key={user.id} className="flex justify-between items-center p-2 border rounded">
            <span>{user.email}</span>
             <form action={chater}>
        <input type="hidden" name="receiver_id" value={user.id} />
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Chatter
        </button>
      </form>
          </li>
        ))}
      </ul>

)





}