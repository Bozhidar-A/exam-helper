import { FormEvent, useEffect, useState } from "react";

// let sampleData = {
//     "id": 1,
//     "qNum": 1,
//     "question": "В кой ред НЕ е допусната правописна грешка?",
//     "wrong": [
//       "А) разгорели, отлетели, затрептяли",
//       "Б) сърдечен, порядачен, списъчен",
//       "Г) свързвам, завързвам, подвръзвам"
//     ],
//     "correct": "В) семейна, бездействие, портфейл"
// }

function Options(props:any)
{
    let options = [...props.data.wrong, props.data.correct].sort();

    function HandleChange(e: FormEvent<HTMLDivElement>)
    {
        let el = e?.currentTarget as HTMLInputElement;
        // console.log(el)
        props.UpdateScore(el.value);
    }
   
    return(
        <div>
            {options.map(op => (
                <div>
                    <input type="radio" id={op} name={`Q${props.data.id}`} value={op} onChange={e => HandleChange(e)}></input> 
                    <label htmlFor={op}>{op}</label>
                </div>
            ))}
        </div>
    )
}

function BEL_SingleAnswer(props:any)
{
    const [debugAns, setDebugAns] = useState("none");
    const [givenPts, setGivenPts] = useState(0);

    function UpdateScore(givenAns:string)
    {
        setDebugAns(givenAns)
        if(givenAns === props.data.correct)
        {
            props.UpdateScore(1);
            setGivenPts(1);
        }
        else
        {
            if(givenPts > 0)
            {
                props.UpdateScore(-1); // -Math.abs(num);
                setGivenPts(0);
            }
        }
    }

    return(
        <div>
            <p>{props.data.question}</p>
            <Options UpdateScore={UpdateScore} data={props.data}></Options>
            <p>Given: {debugAns}</p>
        </div>
    )
}

export default BEL_SingleAnswer;