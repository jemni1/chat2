import { signOut } from "../login/actions"
import { Button } from "@/components/ui/button"

export default function CardDemo() {

    return(
        <>
        <div className="min-h-screen w-full bg-[#E8EDF2]">
        <div className="border-b border-gray-300 items-center flex flex-row px-[160px] py-[12px] justify-between h-[65px]">
            <h1 className="text-3xl">Doghri El Moghri</h1>
            <Button> signout </Button>
            

        </div>
        <div>
            <div className="w-[960px] h-[72px] gap-y-4 p-16">
                <h1 className="text-[32px] leading-[40px] font-bold">Users</h1>
            </div>
            <div className="flex flex-row justify-evenly h-[72px] gap-y-4 p-16">
                <p className="text-[22px]">Anis Jemni</p>
                            <Button> signout </Button>

            </div>
        </div>
        </div>
        </>
    )
}
