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

    function UpdateStyle(op:string)
    {
        if(props.checking)
        {
            if(op === props.correct)
            {
                return "bg-lime-500" 
            }
            else
            {
                return "bg-red-600"
            }
        }
    }
   
    //map over the possible answers by making them radios
    //name is just Q followed by the uid
    return(
        <div>
            {options.map(op => (
                <div>
                    <label className={UpdateStyle(op)}>
                        <input disabled={props.checking} type="radio" id={`${op}-${props.quid}`} name={`Q${props.quid}`} value={op} onChange={e => HandleChange(e.target.value)}></input> 
                        {op}
                    </label>
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

    function CheckingDisplayScore()
    {
        if(debugAns === props.correct)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }

    return(
        <div>
            <p>{props.question}</p>
            <Options UpdateScore={UpdateScore} correct={props.correct} wrong={props.wrong} quid={props.id} checking={props.checking}></Options>
            <p>{props.checking && <p>Взети точки {CheckingDisplayScore()}</p>}</p>
        </div>
    )
}

export default BEL_SingleAnswer;