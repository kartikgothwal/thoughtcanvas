"use client";
import Image from "next/image";
import {homepage, Logo2} from "@/public";
import {NavigationMenuDemo} from "@/components/lib";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/lib/button";
import GettingStarted from "@/app/_getting-started/page";
import {useState} from "react";

const Home =():JSX.Element=>{
     const [getStarted,setGetStarted]= useState<boolean>(false)
    return <>
        <section className="h-screen ">
            <div className="flex justify-between mx-12 my-4">
                <div>
                    <Image
                        src={Logo2}
                        alt="logo"
                        width={100}
                        height={100}
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                    />
                </div>
                <div className="mr-[10rem]">
                    <NavigationMenuDemo/>
                </div>
            </div>
            <div className="flex justify-between ml-[6rem]">
                <div className="flex flex-col gap-[70px] mt-[3rem]">
                    <h1 className="font-bold leading-[100px] tracking-normal
 text-[120px]">
                        <h1>
                            Human
                        </h1>
                        <h1>
                            stories & ideas
                        </h1>
                    </h1>
                    <p className="leading-[22px] text-[22px]">A place to read, write, and deepen your understanding</p>
                    <Dialog open={getStarted} onOpenChange={setGetStarted}>
                        <DialogTrigger asChild>
                            <Button classname={"bg-black text-white w-[10rem] p-[1rem] rounded-[1rem]"}
                                    variant="outline" onclick={() => {
                                setGetStarted(!getStarted)
                            }}>Edit Profile</Button>
                        </DialogTrigger>
                        <GettingStarted/>
                    </Dialog>

                </div>
                <div>
                    <Image
                        src={homepage}
                        alt="logo"
                        width={460}
                        height={350}
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                    />
                </div>
            </div>
            <div>
            </div>
        </section>
    </>
}
export default  Home;