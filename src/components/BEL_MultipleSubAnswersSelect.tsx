import React from "react";
import { FormEvent, useState } from "react";
import IMultipleSubAnswersSelect, { IMultipleSubAnswersSelectAnswers } from "../interfaces/IBEL_MultipleSubAnswersSelect";
import PointsFromQuestion from "./PointsFromQuestion";
import styles from "../css/main.module.css"

interface IOptions{
    data:IMultipleSubAnswersSelectAnswers,
    setValue: any,
    index:number,
    quid:number,
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
            if(op === props.data.correct[0])
            {
                return "bg-lime-500" 
            }
            else
            {
                return "bg-red-600"
            }
        }
    }

    let options = [...props.data.correct, ...props.data.wrong].sort();
   
    return(
        <div>
            <p>{props.data.label}</p>
            {options.map(op => (
                <div key={`${op}-${props.quid}`}>
                    <label className={UpdateStyle(op)}>
                        <input type="radio" disabled={props.checking} id={op} name={`Q${props.quid}-${props.data.label}`} value={op} onChange={e => HandleChange(e,props.index)}></input> 
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
            //we simply check if the already given answers is correct
            //if it is and user is change to a wrong one take away point
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
        <div className={styles.EveryExamComponent}>
            <p>{props.data.question}</p>
            {props.data.answers && props.data.answers.map((op:any, k:number) => {
                return <Options key={`${props.id}-${k}`} setValue={(e: string, index:number) => HandleSetValue(e, index)} data={op} index={k} quid={props.id} checking={props.checking}></Options>
            })}
            {props.checking && <PointsFromQuestion points={CheckingDisplayScore()}></PointsFromQuestion>}
        </div>
    )
}

const BEL_MultipleSubAnswersSelectMemorized = React.memo(BEL_MultipleSubAnswersSelect, (prevProps, nextProps) => {
    if (prevProps.checking === nextProps.checking) {
      return true; // props are equal
    }
    return false; // props are not equal -> update the component
})

export default BEL_MultipleSubAnswersSelectMemorized;

