import { FormEvent, useEffect, useState } from "react";
import IMultipleAnswers from "../interfaces/IBEL_MultipleAnswers";

function Options(props:any)
{
    function HandleChange(e: FormEvent<HTMLDivElement>)
    {
        //typescript complains here and it led to this thing
        let el = e?.currentTarget as HTMLInputElement;
        props.setValue(el.value);
    }
   
    return(
        <div>
            {props.opts.map((op:string) => (
                <div>
                    <input type="checkbox" id={`${props.id}-${op}`} name={`Q${props.id}`} value={op} onChange={e => HandleChange(e)}></input> 
                    <label htmlFor={op}>{op}</label>
                </div>
            ))}
        </div>
    )
}

function BEL_MultipleAnswers(props:any)
{
    const [ans, setAns] = useState<IMultipleAnswers[]>([]);

    let options = [...props.data.wrong, ...props.data.correct].sort();

    useEffect(() => {
        let dict = options.map(op => {return {name:op,selected:false}})
        setAns(dict);
    }, [])

    function HandleGetValFromOption(el:any)
    {
        let tmp = [...ans];
        let index = tmp.findIndex(op => op.name === el);
        tmp[index].selected = !tmp[index].selected;

        if(props.data.correct.includes(tmp[index].name))
        {
            if(tmp[index].selected)
            {
                props.UpdateScore(1);
            }
            else
            {
                props.UpdateScore(-1);
            }
        }

        setAns(tmp);
    }

    return(
        <div>
            <p>{props.data.question}</p>
            <Options setValue={(e: string) => HandleGetValFromOption(e)} opts={options} id={props.data.id}></Options>
            <p>Given: {JSON.stringify(ans?.filter(an => an.selected === true))}</p>
        </div>
    )
}

export default BEL_MultipleAnswers;