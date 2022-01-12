import { FormEvent, useEffect, useState } from "react";
import IMultipleSubAnswersSelect from "../interfaces/IBEL_IMultipleSubAnswersSelect";

interface IOptions{
    data:any,
    setValue: any,
    index:number,
    id:number
}

function Options({data,setValue,index,id}:IOptions)
{
    function HandleChange(e: FormEvent<HTMLDivElement>, index:number, label:string)
    {
        let el = e?.currentTarget as HTMLInputElement;
        setValue(el.value, index, label);
    }
   
    return(
        <div>
            <p>{data.label}</p>
            <p>{data.question}</p>
            {[...Array(data.correct.length)].map((x, i) =>
                <div>
                    <p>{i}.</p>
                    <input type="text" onChange={e => HandleChange(e, i, data.label)}></input>
                </div>
            )}
            {/* {options.map(op => (
                <div>
                    <input type="radio" id={op} name={`Q${id}-${data.label}`} value={op} onChange={e => HandleChange(e,index)}></input> 
                    <label htmlFor={op}>{op}</label> 
                </div>
            ))} */}
        </div>
    )
}

function BEL_MultipleSubAnswersWrite(props:any)
{
    let base:any = {};
    props.data.answers.map((op:any)=> {
        base[`${op.label}`] = [];
    })//there has to be a better way to do this
    
    const [ans, setAns] = useState(base);
    const [answeredCorrect, setAnsweredCorrect] = useState(false);

    function HandleSetValue(e: string, index:number, label:string) {
        let clone = ans
        clone[label][index] = e;

        if(props.data.answers.filter((obj:any) => obj.label === label)[0].correct[index] === e)
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
            <p>{props.data.question}</p>
            {props.data.answers.map((op:any, k:number) => {
                return <Options setValue={(e: string, index:number, label:string) => HandleSetValue(e, index, label)} data={op} index={k} id={props.id}></Options>
            })}
            <p>Given: {JSON.stringify(ans)}</p>
        </div>
    )
}

export default BEL_MultipleSubAnswersWrite;

