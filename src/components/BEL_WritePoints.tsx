import React from "react";
import { useState } from "react";
import IBEL_WritePoints from "../interfaces/IBEL_WritePoints";
import PointsFromQuestion from "./PointsFromQuestion";
import styles from "../css/main.module.css"

function BEL_WritePoints(props:IBEL_WritePoints){

    const [inputText, setInputText] = useState<string[]>([]);
    const [givenPts, setGivenPts] = useState(0);

    function HandleChange(text:string)
    {
        let ans = text.split("|");

        setInputText(ans);

        let pts = 0;

        ans.forEach(an => {
            if(props.correct.includes(an))
            {
                if(pts < props.maxPoints)
                {
                    pts++;
                }
            }
        })

        props.UpdateScore(-Math.abs(givenPts)); //supposedly this is better then *-1

        if(pts !== 0)//this is needed or setState refused to work properly and will ignore the calls in ExamManager
        {
            props.UpdateScore(pts);
        }

        setGivenPts(pts);
    }

    function CheckingDisplayScore()
    {
        let finScore = 0;

        for(let an in inputText){
            if(props.correct.includes(an) && finScore <= props.maxPoints){
                finScore++;
            }
            else{
                break;
            }
        }

        return finScore;
    }

    return(<div className={styles.EveryExamComponent}>
        <p>{props.question}</p>
        <p>Разделете отговорите си със символа |</p>
        <input type="text" disabled={props.checking} onChange={e => HandleChange(e.target.value)}></input>
        {props.checking && <div>
            <textarea className={`"${styles.TextareaMaxWidth}`} disabled={true} value={props.correct.join(" | ")}></textarea>
            <PointsFromQuestion points={CheckingDisplayScore()}></PointsFromQuestion>
        </div>}
    </div>)
}

const BEL_WritePointsMemorized = React.memo(BEL_WritePoints, (prevProps, nextProps) => {
    if (prevProps.checking === nextProps.checking) {
      return true; // props are equal
    }
    return false; // props are not equal -> update the component
})

export default BEL_WritePointsMemorized;
