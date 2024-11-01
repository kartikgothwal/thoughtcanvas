import { Button as CommonButton } from "@/components/ui/button";
import React, { MouseEventHandler } from "react";

type buttonPropsType = {
    classname: string;
    children: React.ReactNode;
    variant?:"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    onclick?:()=>MouseEventHandler<HTMLButtonElement> |void
};

export function Button({ children,variant, classname,onclick }: buttonPropsType): JSX.Element {
    return <CommonButton variant={variant} className={classname} onClick={onclick}>{children}</CommonButton>;
}
