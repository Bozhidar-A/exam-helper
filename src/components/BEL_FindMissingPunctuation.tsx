import React from "react";
import { useState } from "react";
import styles from "../css/main.module.css"

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

    return(<div className={styles.EveryExamComponent}>
        <p>{props.data.question}</p>
        <br />
        <pre dangerouslySetInnerHTML={{ __html: props.data.wrong.replace("\n", "<br/>") }}></pre>
        <br />
        <textarea className={styles.TextareaMaxWidth} disabled={props.checking} onChange={e => {HandleChange(e.target.value)}}></textarea>
        {props.checking && 
            <div>
                <textarea className={`bg-lime-500 ${styles.TextareaMaxWidth}`} disabled={true} value={props.data.correct}></textarea>
                {props.checking && <p>От този въпрос вие взехте {inputText === props.data.correct ? 5 : 0} точки</p>}
                {/* TODO write better points get for this */}
            </div>}
    </div>)
}

export default BEL_FindMissingPunctuation;