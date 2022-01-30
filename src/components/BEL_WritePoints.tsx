import { useState } from "react";
import IBEL_WritePoints from "../interfaces/IBEL_WritePoints";

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

        if(pts !== 0)//this is needed or setState refused to work properly and will ignore the calls in TestManager
        {
            props.UpdateScore(pts);
        }

        setGivenPts(pts);
    }

    function CheckingDisplayScore()
    {
        let finScore = 0;

        inputText.forEach((an:string) => {
            if(props.correct.includes(an))
            {
                finScore++;
            }
        })

        return finScore;
    }

    return(<div>
        <p>{props.question}</p>
        <p>Разделете отговорите си със символа |</p>
        <input type="text" disabled={props.checking} onChange={e => HandleChange(e.target.value)}></input>
        {props.checking && <div>
            <textarea className="bg-lime-500" disabled={true} value={props.correct.join(" | ")}></textarea>
            <p>Взети точки {CheckingDisplayScore()}</p>
        </div>}
    </div>)
}

export default BEL_WritePoints;
