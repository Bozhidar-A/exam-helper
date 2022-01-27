import { useState } from "react";

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

    return(<div>
        <p>{props.data.question}</p>
        <textarea disabled={props.checking} onChange={e => {HandleChange(e.target.value)}} value={props.data.wrong}></textarea>
        {props.checking && 
            <div>
                <textarea className="bg-lime-500" disabled={true} value={props.data.correct}></textarea>
                {props.checking && <p>Взети точки {inputText === props.data.correct ? 5 : 0}</p>}
                {/* TODO write better points get for this */}
            </div>}
    </div>)
}

export default BEL_FindMissingPunctuation;