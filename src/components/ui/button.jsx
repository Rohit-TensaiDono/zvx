"use client";
export function Button({children,className='',...props}){return <button className={`px-4 py-2 rounded-md bg-white/6 ${className}`} {...props}>{children}</button>}