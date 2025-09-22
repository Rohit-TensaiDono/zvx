"use client";
export function Input(props){return <input {...props} className={`w-full p-3 bg-black/30 border border-white/6 rounded text-white ${props.className||''}`} />}