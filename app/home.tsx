"use client";
import Image from "next/image";
import { homepage, Logo2 } from "@/public";
import { NavigationMenuDemo } from "@/components/lib";
import LoginSignupModel from "@/components/models/login-signup-model";

const Home = (): JSX.Element => {
    return <>
        <section className="h-screen ">
            <div className="flex justify-between mx-12 my-4">
                <div>
                    <Image
                        src={Logo2}
                        alt="logo"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="mr-[10rem]">
                    <NavigationMenuDemo />
                </div>
            </div>
            <div className="flex justify-between ml-[6rem]">
                <div className="flex flex-col gap-[70px] mt-[3rem]">
                    <h1 className="font-bold leading-[100px] tracking-normal text-[120px]">
                        <h1>
                            Human
                        </h1>
                        <h1>
                            stories & ideas
                        </h1>
                    </h1>
                    <p className="leading-[22px] text-[22px]">A place to read, write, and deepen your understanding</p>
                    <LoginSignupModel />
                </div>
                <div>
                    <Image
                        src={homepage}
                        alt="logo"
                        width={460}
                        height={350}
                    />
                </div>
            </div>
            <div>
            </div>
        </section>
    </>
}
export default Home;