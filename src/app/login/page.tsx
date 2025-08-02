

// import { login ,signup} from './actions'
// import { Button } from '@/components/ui/button'
// export default function LoginPage() {
  


//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
//       <h1 className="text-2xl font-bold mb-6 text-center">Se connecter</h1>
//       <form>
//             <input id="email" name="email" type="email" required />


//             <input id="password" name="password" type="password" required />


//       <button
//       formAction={login}    
//         className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
//       >login
//       </button>
//             <button formAction={signup}>Sign up</button>

//     </form>
//     <Button text={"lg"} variant={"red"}> test </Button>
//     </div>
//   )
// }
import { login,resetPassword} from './actions'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <>
    <div className="flex justify-between items-center px-10 py-4 bg-gray-100">
  <h1 className="font-bold text-xl">Acme Co</h1>
  <div className="flex items-center space-x-6">
    <p className="cursor-pointer hover:text-blue-600">Home</p>
    <p className="cursor-pointer hover:text-blue-600">About</p>
    <p className="cursor-pointer hover:text-blue-600">Contact</p>
    <Link href="/signup">
  <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
    Sign Up
  </button>
</Link>
  </div>
</div>
<div className='flex justify-center items-center'>
     <Card className="w-[1280px] h-[800px] px-[160px]">
      <CardHeader className='w-[960px] h-[67px] px-4 pb-3'>
        <CardTitle className='text-3xl h-[35px]'>Welcome</CardTitle>
        <CardDescription className=''>Sign in to your acount</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col">
            <div className="gap-[10px] w-[480px] h-[112px] px-4 py-3">
              <Label className='h-[32px] pb-2 text-base' htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className='h-[56px] p-4 rounded-xl bg-[#E8EDF5]'
                required
              />
            </div>
            <div className="gap-[10px] w-[480px] h-[112px] px-4 py-3">
                <Label className='h-[32px] pb-2 text-base' htmlFor="password">Password</Label>
                
              <Input className='h-[56px] p-4 rounded-xl bg-[#E8EDF5]' id="password" name="password" type="password" placeholder="Enter your password" required />
            </div>
          </div>
          
          <div className='w-[960px] h-[64px] px-4'>
         <Button variant={"blue"} formAction={login}>
          Login
        </Button>
        </div>
        </form>
        <div className='m-5 w-[928px] h-[21px] pb-2'>
            <Dialog>
              <DialogTrigger className='text-[#4A739C] text-base'>
                Forgot PAssword
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Write your email
                  </DialogTitle>
                </DialogHeader>
                <form>
                <input
                type="email"        
                name="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                      />                
                      <Button formAction={resetPassword} className='bg-gray-400 ml-4'>Reset password</Button>
                </form>
              </DialogContent>

            </Dialog>
          </div>
      </CardContent>
      
    </Card>
    </div>
    </>
  )
}
 
  