
import { createClient } from '@/utils/supabase/server'  

import ListOfUsers from '@/components/listofusers'
export default async function ListOfClient() {
    const supabase = await createClient()

    const { data: {user} } = await supabase.auth.getUser()
    const currentUserId = user?.id
    const { data: allUsers } = await supabase.from('users').select('id, email')
    const otherUsers = allUsers?.filter((u) => u.id !== currentUserId) ?? []
      
      return(
        <>
<div className="px-40 flex flex-1 justify-center py-5">
          <ListOfUsers users={otherUsers}></ListOfUsers>
        </div>
  
</>
)
}

















// import { createClient } from '@/utils/supabase/server'  
// import { chater, signOut } from '../login/actions'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'

// export default async function ListOfClient() {
//     const supabase = await createClient()

//     const { data: {user} } = await supabase.auth.getUser()
//     const currentUserId = user?.id
//     const { data: allUsers } = await supabase.from('users').select('id, email')
//     const otherUsers = allUsers?.filter((u) => u.id !== currentUserId) ?? []
//     console.log(otherUsers);
      
//       return(
//         <>
// <div className="px-40 flex flex-1 justify-center py-5">
//           <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
//             <div className="flex flex-row justify-between items-center gap-3 p-4">
//               <div className='flex flex-ros justify-between'>
//               <p className="text-[#101518] tracking-light text-[32px] font-bold leading-tight min-w-72">
//                 Users
//               </p>
//               <p className="text-[#101518] tracking-light text-[32px] font-bold leading-tight min-w-72">
//                 Groups
//               </p>
//               </div>
//               <form>
//               <Button formAction={signOut} className={cn("bg-gray-400 w-[200px] h-[40px] mt-6")}>SignOut</Button>
//               </form>
//               </div>
//             {otherUsers.map((user) => (

//             <div key={user.id} className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2 justify-between">
//               <div className="flex items-center gap-4">
//                 <div
//                   className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                  
//               style={{
//               backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpONtx9PEmGm4vK7UJBQz4PKSn9q60SaSBWVlsfOPJsHRZWuMbUgKVMdnnXMlhXJEN8ztHTnbHHNVkbb-H6d4oiuNxNbwNCVezvBszKoKBy7pg4YEZ9wGiV_3tVn2pqJamxYGoYmPIbyYvs-7SIoQszJB1uBlYuTqNbCDy6b4jrJMY77w3s1nNC-x-W7D2sLp4-OKAIvExv62tJOtt0_hYvPIjh4jrMc2xhEhfyLYiTpnHzUO0cCbhT13r_LCezQp8D77NhQQobRU")`,
//             }}></div>
//                 <div className="flex flex-col justify-center">
//                   <p className="text-[#5c748a] text-sm font-normal leading-normal line-clamp-2">{user.email}</p>
//                 </div>
//               </div>
//               <div className="shrink-0">
//                 <form action={chater}>
//                 <input type="hidden" name="receiver_id" value={user.id} />
//                 <input type="hidden" name="email" value={user.email} />

//                 <button
//                   type="submit"
//                   className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#eaedf1] text-[#101518] text-sm font-medium leading-normal w-fit"
//                 >
//                   <span className="truncate">Chat</span>
//                 </button>
//                 </form>
//               </div>

//             </div>
//             ))}
//           </div>
//         </div>
  
// </>
// )
// }