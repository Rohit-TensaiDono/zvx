"use client";
export function Textarea(props){return <textarea {...props} className={`w-full p-3 bg-black/30 border border-white/6 rounded text-white ${props.className||''}`} />}