import { useState } from "react";

function BEL_FindMissingPunctuation(props:any){

    const [inputText, setInputText] = useState("");
    const [givenPts, setGivenPts] = useState(0);

    function HandleChange(text:string)
    {
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
        <textarea onChange={e => {HandleChange(e.target.value)}}>{props.data.wrong}</textarea>
    </div>)
}

export default BEL_FindMissingPunctuation;