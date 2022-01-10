import { FormEvent, useState } from "react";

function Options(props:any)
{
    let options = [...props.data.wrong, props.data.correct].sort();

    function HandleChange(e: FormEvent<HTMLDivElement>)
    {
        //typescript complains here and it led to this thing
        let el = e?.currentTarget as HTMLInputElement;
        //return the value to BEL_SingleAnswer
        props.UpdateScore(el.value);
    }
   
    //map over the possible answers by making them radios
    //name is just Q followed by the uid
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
    const [answeredCorrect, setAnsweredCorrect] = useState(false);

    function UpdateScore(givenAns:string)
    {
        setDebugAns(givenAns)

        //to avoid giving or taking points when unnecessary
        //on a correct answer give points and set answered to true
        //on a wrong answer check if it has been answered correctly before and then take points
        if(givenAns === props.data.correct)
        {
            props.UpdateScore(1);
            setAnsweredCorrect(true);
        }
        else
        {
            if(answeredCorrect)
            {
                props.UpdateScore(-1); // -Math.abs(num);
                setAnsweredCorrect(false);
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