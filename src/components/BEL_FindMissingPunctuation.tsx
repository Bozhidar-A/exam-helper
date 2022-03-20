import React from "react";
import { useState } from "react";
import styles from "../css/main.module.css"
import PointsFromQuestion from "./PointsFromQuestion";

function BEL_FindMissingPunctuation(props:any){

    const [inputText, setInputText] = useState("");
    const [givenPts, setGivenPts] = useState(0);

    function HandleChange(text:string)
    {
        setInputText(text);

        if(props.data.correct === text)
        {
            props.UpdateScore(5);
            setGivenPts(5);
        }
        else{
            if(givenPts > 0)
            {
                props.UpdateScore(-5); // -Math.abs(num);
                setGivenPts(0);
            }
        }
    }

    function FormatCorrectText() {
        var tmp:string = props.data.wrong;

        props.data.punctuation.map((pu:any) => {
            tmp = tmp.substring(0, pu.index) + `<b>${pu.symbol}</b>` + tmp.substring(pu.index)
        })

        return tmp
    }

    function CheckingDisplayScore(){
        var score:number = 0;

        props.data.punctuation.map((pu:any) => {
            if(inputText[pu.index] === pu.symbol){
                score++;
            }
        })

        return score;
    }

    return(<div className={styles.EveryExamComponent}>
        <p>{props.data.question}</p>
        <br />
        <pre dangerouslySetInnerHTML={{ __html: props.data.wrong.replace("\n", "<br/>") }}></pre>
        <br />
        <textarea className={styles.TextareaMaxWidth} disabled={props.checking} onChange={e => {HandleChange(e.target.value)}}></textarea>
        {props.checking && 
            <div>
                <pre className={`bg-lime-500`} dangerouslySetInnerHTML={{ __html: FormatCorrectText() }}></pre>
                <PointsFromQuestion points={CheckingDisplayScore()}></PointsFromQuestion>
                {/* <textarea className={`bg-lime-500 ${styles.TextareaMaxWidth}`} disabled={true} value={props.data.correct}></textarea>
                {props.checking && <p>От този въпрос вие взехте {inputText === props.data.correct ? 5 : 0} точки</p>} */}
                {/* TODO write better points get for this */}
            </div>}
    </div>)
}

export default React.memo(BEL_FindMissingPunctuation);
