import { FormEvent, useEffect, useState } from "react";
import IMultipleSubAnswersSelect from "../interfaces/IBEL_MultipleSubAnswersSelect";

interface IOptions{
    data:IMultipleSubAnswersSelect,
    setValue: any,
    index:number,
    id:number,
    checking: boolean
}

function Options(props:IOptions)
{
    function HandleChange(e: FormEvent<HTMLDivElement>, index:number)
    {
        let el = e?.currentTarget as HTMLInputElement;
        console.log(el, index)
        props.setValue(el.value, index);
    }

    function UpdateStyle(op:string)
    {
        if(props.checking)
        {
            if(op === props.data.correct)
            {
                return "bg-lime-500" 
            }
            else
            {
                return "bg-red-600"
            }
        }
    }

    let options = [props.data.correct, ...props.data.wrong].sort();
   
    return(
        <div>
            <p>{props.data.label}</p>
            {options.map(op => (
                <div>
                    <label className={UpdateStyle(op)}>
                        <input type="radio" id={op} name={`Q${props.id}-${props.data.label}`} value={op} onChange={e => HandleChange(e,props.index)}></input> 
                        {op}
                    </label> 
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

        if(props.data.answers[index].correct === e)
        {
            props.UpdateScore(1);
        }
        else
        {
            //very bad
            //this works because when a radio is already selected the onChange event doesnt fire
            //we simply check if the allready given answers is correct
            //if it is and user is chnage to a wrong one tak away point
            //if not do nothing
            if(clone[index] === props.data.answers[index].correct)
            {
                props.UpdateScore(-1);
            }
            
        }

        //update clone and then state
        clone[index] = e;

        setAns(clone);
    }

    function CheckingDisplayScore()
    {
        let finScore = 0;

        //this is stupid
        //TODO improve this
        ans.map(an => {
            props.data.answers.map((op:any) => {
                if(an === op.correct)
                {
                    finScore++;
                }
            })
        })

        return finScore;
    }

    return(
        <div>
            <p>{props.data.question}</p>
            {props.data.answers && props.data.answers.map((op:any, k:number) => {
                return <Options setValue={(e: string, index:number) => HandleSetValue(e, index)} data={op} index={k} id={props.id} checking={props.checking}></Options>
            })}
            {/* <p>Given: {JSON.stringify(ans)}</p> */}
            <p>{props.checking && <p>Взети точки {CheckingDisplayScore()}</p>}</p>
        </div>
    )
}

export default BEL_MultipleSubAnswersSelect;

