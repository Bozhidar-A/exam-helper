import { FormEvent, useEffect, useState } from "react";
import IMultipleSubAnswersSelect from "../interfaces/IBEL_IMultipleSubAnswersSelect";

interface IOptions{
    data:IMultipleSubAnswersSelect,
    setValue: any,
    index:number,
    id:number
}

function Options({data,setValue,index,id}:IOptions)
{
    function HandleChange(e: FormEvent<HTMLDivElement>, index:number)
    {
        let el = e?.currentTarget as HTMLInputElement;
        console.log(el, index)
        setValue(el.value, index);
    }

    let options = [data.correct, ...data.wrong].sort();
   
    return(
        <div>
            <p>{data.label}</p>
            {options.map(op => (
                <div>
                    <input type="radio" id={op} name={`Q${id}-${data.label}`} value={op} onChange={e => HandleChange(e,index)}></input> 
                    <label htmlFor={op}>{op}</label> 
                </div>
            ))}
        </div>
    )
}

function BEL_MultipleSubAnswersSelect(props:any)
{
    const [ans, setAns] = useState<string[]>([]);

    function HandleSetValue(e: string, index:number) {
        let clone:string[] = [...ans];
        clone[index] = e;

        if(props.data.answers[index].correct === e)
        {
            props.UpdateScore(1);
        }
        else
        {
            props.UpdateScore(-1);
        }

        setAns(clone);
    }

    return(
        <div>
            <p>{props.data.question}</p>
            {props.data.answers.map((op:any, k:number) => {
                return <Options setValue={(e: string, index:number) => HandleSetValue(e, index)} data={op} index={k} id={props.id}></Options>
            })}
            <p>Given: {JSON.stringify(ans)}</p>
        </div>
    )
}

export default BEL_MultipleSubAnswersSelect;

