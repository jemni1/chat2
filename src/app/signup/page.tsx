import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signup } from "../login/actions"
import { cn } from "@/lib/utils"
export default function CardDemo() {
  return (
    <>
    <div className="px-10 h-11 bg-[#E5E8EB] flex flex-row justify-between items-center">
    <h1 className="px-2 text-[28px]">doghriyoun</h1>
    <div className="flex flex-row space-x-6">
      <p>home</p>
      <p>contact</p>
      <p>about</p>
    </div>
    </div>
    <div className="flex justify-center items-center">
    <Card>
      <CardHeader>
        <CardTitle className="text-[28px] text-center">Create your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <form>
      <CardContent>
        
          <div className="flex flex-col gap-6">
            <div>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                className="bg-[#E8EDF2] text-[16px]  w-[480px] h-[56px] p-4"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                
              </div>
              <Input name="password" id="password" className="bg-[#E8EDF2] text-[16px]  w-[480px] h-[56px] p-4" type="password" required />
            </div>
          </div>
        
      </CardContent>
      <CardFooter className="flex flex-col p-5">
        
        <Button formAction={signup} type="submit" className={cn("bg-[#429CF0] w-[480px] h-[40px] mt-6")}>
          
          SignUp
        </Button>
        
        <Link href="/login" className="text-center text-[#4D7399] mt-15">
          Already have an Account? Login
        </Link>
      </CardFooter>
      </form>
    </Card>
    </div>
    </>
  )
}
