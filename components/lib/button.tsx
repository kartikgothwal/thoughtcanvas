import { Button as CommonButton } from "@/components/ui/button";
import React, { MouseEventHandler } from "react";

type buttonPropsType = {
    classname: string;
    children: React.ReactNode;
    onclick?:()=>MouseEventHandler<HTMLButtonElement> |void
};

export function Button({ children, classname,onclick }: buttonPropsType): JSX.Element {
    return <CommonButton className={classname} onClick={onclick}>{children}</CommonButton>;
}
