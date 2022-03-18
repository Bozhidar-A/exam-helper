import React from "react";
import { useMemo, useState } from "react";
import Countdown from "react-countdown";

// function (props:any){
//     const memoizedMs = useMemo(() => {return props.ms}, [props.ms])

//     //@ts-ignore
//     return(<>
//         <Countdown date={Date.now() + memoizedMs}></Countdown>
//     </>)
// }

// const CountdownMemorize = (ms: any) => React.memo((props:any) => {

//     return(<><Countdown date={Date.now() + props.ms}></Countdown></>)
  
// });

// export default CountdownMemorize;

function CountdownExam(props:any){
    if(props.module === 3){
        return(<Countdown date={Date.now() + props.min120}></Countdown>)
    }else{
        return(<Countdown date={Date.now() + props.min60}></Countdown>)
    }
}

export default CountdownExam;