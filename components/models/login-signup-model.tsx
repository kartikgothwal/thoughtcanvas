import React, { useState } from 'react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import GettingStarted from '@/app/_getting-started/page'
import { Button } from '../lib/button'


const LoginSignupModel = () => {
    const [getStarted, setGetStarted] = useState<boolean>(false)

    return (
        <Dialog open={getStarted} onOpenChange={setGetStarted}>
            <DialogTrigger asChild>
                <Button classname={"bg-black text-white w-[10rem] p-[1rem] rounded-[1rem]"}
                    variant="outline" onclick={() => {
                        setGetStarted(!getStarted)
                    }}>Get Started</Button>
            </DialogTrigger>
            <GettingStarted />
        </Dialog>
    )
}

export default LoginSignupModel
