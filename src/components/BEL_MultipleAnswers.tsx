import React from "react";
import { FormEvent, useEffect, useState } from "react";
import IBEL_MultipleAnswers from "../interfaces/IBEL_MultipleAnswers";
import IBEL_MultipleAnswersOptions from "../interfaces/IBEL_MultipleAnswersOptions";
import IMultipleAnswers from "../interfaces/IMultipleAnswers";
import PointsFromQuestion from "./PointsFromQuestion";
import styles from "../css/main.module.css"

function Options(props:IBEL_MultipleAnswersOptions)
{
    function HandleChange(e: string)
    {
        props.UpdateScore(e);
    }

    function UpdateStyle(op:string)
    {
        if(props.checking)
        {
            if(props.correct.includes(op))
            {
                return "bg-lime-500" 
            }
            else
            {
                return "bg-red-600"
            }
        }
    }
   
    return(
        <div>
            {props.options.map((op:string) => (
                <div key={`${op}-${props.quid}`}>
                    <label htmlFor={op} className={UpdateStyle(op)}> 
                        <input type="checkbox" disabled={props.checking} id={`${op}-${props.quid}`} name={`Q${props.quid}`} value={op} onChange={e => HandleChange(e.target.value)}></input> 
                        {op}
                    </label>
                </div>
            ))}
        </div>
    )
}

function BEL_MultipleAnswers(props:IBEL_MultipleAnswers)
{
    const [ans, setAns] = useState<IMultipleAnswers[]>([]);
    const [givenPts, setGivenPts] = useState(0);

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

        if(tmp.filter(an => an.selected === true).length > props.correct.length) //dont give points if given answers are more the correct
        {
            props.UpdateScore(-Math.abs(givenPts));
            setGivenPts(0);
            return;
        }

        let ptsToGive = 0;
        tmp.filter(an => an.selected === true).map(an => {
            if(props.correct.includes(an.name))
            {
                ptsToGive++;
            }
        })

        props.UpdateScore(ptsToGive-givenPts);

        setGivenPts(ptsToGive);
        
        setAns(tmp);
    }

    function CheckingDisplayScore()
    {
        let finScore = 0;
        ans?.filter(an => an.selected === true).map(an =>{
            if(props.correct.includes(an.name))
            {
                finScore++;
            }
        })
        
        return finScore;
    }

    return(
        <div className={styles.EveryExamComponent}>
            <p>{props.question}</p>
            <Options UpdateScore={(e: string) => HandleGetValFromOption(e)} options={options} quid={props.id} correct={props.correct} checking={props.checking}></Options>
            {props.checking && <PointsFromQuestion points={CheckingDisplayScore()}></PointsFromQuestion>}
        </div>
    )
}

const BEL_MultipleAnswersMemorized = React.memo(BEL_MultipleAnswers, (prevProps, nextProps) => {
    if (prevProps.checking === nextProps.checking) {
      return true; // props are equal
    }
    return false; // props are not equal -> update the component
})

export default BEL_MultipleAnswersMemorized;