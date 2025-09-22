'use client';
import { motion } from 'framer-motion';
export default function AnimatedLogo({size=320}){ return (<motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}} style={{width:size,height:size}}><img src='/zvx-logo.png' alt='logo' style={{width:'100%',height:'100%',objectFit:'contain'}}/></motion.div>)}