import { FormEvent, useEffect, useState } from "react";
import IBEL_MultipleAnswers from "../interfaces/IBEL_MultipleAnswers";
import IBEL_MultipleAnswersOptions from "../interfaces/IBEL_MultipleAnswersOptions";
import IMultipleAnswers from "../interfaces/IMultipleAnswers";

function Options(props:IBEL_MultipleAnswersOptions)
{
    function HandleChange(e: string)
    {
        props.UpdateScore(e);
    }
   
    return(
        <div>
            {props.options.map((op:string) => (
                <div>
                    <input type="checkbox" id={`${op}-${props.quid}`} name={`Q${props.quid}`} value={op} onChange={e => HandleChange(e.target.value)}></input> 
                    <label htmlFor={op}>{op}</label>
                </div>
            ))}
        </div>
    )
}

function BEL_MultipleAnswers(props:IBEL_MultipleAnswers)
{
    const [ans, setAns] = useState<IMultipleAnswers[]>([]);

    let options = [...props.wrong, ...props.correct].sort();

    useEffect(() => {
        let dict = options.map(op => {return {name:op,selected:false}})
        setAns(dict);
    }, [])

    function HandleGetValFromOption(el:any)
    {
        let tmp = [...ans];
        let index = tmp.findIndex(op => op.name === el);
        tmp[index].selected = !tmp[index].selected;

        if(props.correct.includes(tmp[index].name))
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
            <p>{props.question}</p>
            <Options UpdateScore={(e: string) => HandleGetValFromOption(e)} options={options} quid={props.id}></Options>
            <p>Given: {JSON.stringify(ans?.filter(an => an.selected === true))}</p>
        </div>
    )
}

export default BEL_MultipleAnswers;