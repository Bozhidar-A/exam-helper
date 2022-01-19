import { FormEvent, useEffect, useState } from "react";
import IBEL_MultipleSubAnswersWriteOptions from "../interfaces/IBEL_MultipleSubAnswersWriteOptions";
import IBEL_MultipleSubAnswersWrite from "../interfaces/IBEL_MultipleSubAnswersWrite";

function Options(props:IBEL_MultipleSubAnswersWriteOptions)
{
    function HandleChange(e: FormEvent<HTMLDivElement>, index:number, label:string)
    {
        let el = e?.currentTarget as HTMLInputElement;
        props.setValue(el.value, index, label);
    }
   
    return(
        <div>
            <p>{props.data.label}</p>
            <p>{props.data.question}</p>
            {[...Array(props.data.correct.length)].map((x, i) =>
                <div>
                    <p>{i}.</p>
                    <input type="text" onChange={e => HandleChange(e, i, props.data.label)}></input>
                </div>
            )}
        </div>
    )
}

function BEL_MultipleSubAnswersWrite(props:IBEL_MultipleSubAnswersWrite)
{
    let base:any = {};
    props.answers.map((op:any)=> {
        base[`${op.label}`] = [];
    })//there has to be a better way to do this
    
    const [ans, setAns] = useState(base);
    const [answeredCorrect, setAnsweredCorrect] = useState(false);

    function HandleSetValue(e: string, index:number, label:string) {
        let clone = ans
        clone[label][index] = e;

        if(props.answers.filter((obj:any) => obj.label === label)[0].correct[index] === e)
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

        setAns(clone);
    }

    return(
        <div>
            <p>{props.question}</p>
            {props.answers.map((op:any, k:number) => {
                return <Options setValue={(e: string, index:number, label:string) => HandleSetValue(e, index, label)} data={op} index={k} id={props.id}></Options>
            })}
            <p>Given: {JSON.stringify(ans)}</p>
        </div>
    )
}

export default BEL_MultipleSubAnswersWrite;

