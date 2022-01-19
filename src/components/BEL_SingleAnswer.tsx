import { useState } from "react";
import IBEL_SingleAnswer from "../interfaces/IBEL_SingleAnswer";
import IBEL_SingleAnswerOptions from "../interfaces/IBEL_SingleAnswerOptions";

function Options(props:IBEL_SingleAnswerOptions)
{
    let options = [...props.wrong, props.correct].sort();

    function HandleChange(e:string)
    {
        //return the value to BEL_SingleAnswer
        props.UpdateScore(e)
    }
   
    //map over the possible answers by making them radios
    //name is just Q followed by the uid
    return(
        <div>
            {options.map(op => (
                <div>
                    <input type="radio" id={`${op}-${props.quid}`} name={`Q${props.quid}`} value={op} onChange={e => HandleChange(e.target.value)}></input> 
                    <label htmlFor={op}>{op}</label>
                </div>
            ))}
        </div>
    )
}

function BEL_SingleAnswer(props:IBEL_SingleAnswer)
{
    const [debugAns, setDebugAns] = useState("none");
    const [answeredCorrect, setAnsweredCorrect] = useState(false);

    function UpdateScore(givenAns:string)
    {
        setDebugAns(givenAns)

        //to avoid giving or taking points when unnecessary
        //on a correct answer give points and set answered to true
        //on a wrong answer check if it has been answered correctly before and then take points
        if(givenAns === props.correct)
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
            <p>{props.question}</p>
            <Options UpdateScore={UpdateScore} correct={props.correct} wrong={props.wrong} quid={props.id}></Options>
            <p>Given: {debugAns}</p>
        </div>
    )
}

export default BEL_SingleAnswer;