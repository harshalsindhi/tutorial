import { useEffect, useState } from "react";


export default function Timer({timeOut,setTimeOut,questionNumber}) {
    const[timer,setTimer]=useState(30);
    useEffect(() => {
      if(timer===0) return setTimeOut(true);
     const interval=setInterval(()=>{
     setTimer(timer-1);
     }, 1000); 
     return ()=> clearInterval(interval);  
    },[setTimeOut,timer]);
    useEffect(()=>{

      setTimer(30)
    },[questionNumber])
  return timer;
}


