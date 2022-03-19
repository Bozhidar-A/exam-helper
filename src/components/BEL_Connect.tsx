import React from "react";
import { useEffect, useState } from "react";
import IConnect from "../interfaces/IBEL_Connect";
import IBEL_IConnectState from "../interfaces/IBEL_IConnectState";
import PointsFromQuestion from "./PointsFromQuestion";
import styles from "../css/main.module.css"

function Option(props:any){
    let options = [...props.option.wrong, props.option.answers[0].correct, props.option.answers[1].correct].sort()

    function HandleChange(event:string, label:string)
    {
        props.UpdateScore(event, label)
    }

    return(<div key={`${props.label}-${props.id}`}>
        <p>{props.label}</p>
        {props.option.answers.map((op:any, index: number) => {
            return <div key={`${props.label}-${props.id}-${index}`}>
                <label>
                {op.label}
                <select disabled={props.checking} onChange={e => HandleChange(e.target.value, op.label)}>
                    <option value="">Моля изберете опция</option>
                    {options.map((op:string, index2:number) => {
                        return <option key={`${props.label}-${props.id}-${index}-${index2}`} value={op}>{op}</option>
                    })}
                </select>
                </label>
            </div>
        })}
        {props.checking && <p className="bg-lime-500" >{props.option.answers[0].correct}, {props.option.answers[1].correct}</p>}
    </div>)
}

function BEL_Connect(props:IConnect){
    const [ans, setAns] = useState<IBEL_IConnectState[]>([]);

    useEffect(() => {
        let base:IBEL_IConnectState[] = [];

        props.options && props.options.map((op:any)=> {
            op.answers.map((an:any) => {
                base.push({label:an.label, answer:"", correctGiven:false})
            })
        })//there has to be a better way to do this

        setAns(base)
    }, [])

    /**
     * TODO REWRITE. Fins the correct obj from props based on value
     * @param {string} label - The correct label property on the correct object
     */
    function FindCorrectObj(label:string){
        let correct = {label:"",correct:""};

        props.options.map((op:any) => {
            op.answers.forEach((an:any) => {
                if(an.label === label)
                {
                    correct = an
                    return;
                }
            })
        })

        return correct;
    }

    function HandleUpdateScore(selected:string, label:string)
    {
        let clone = [...ans];
        let correctObj:{label:string,correct:string} = FindCorrectObj(label)

        if(correctObj.label === label && correctObj.correct === selected)
        {
            props.UpdateScore(1);
            clone.filter(la => la.label === label)[0].correctGiven = true;
        }
        else if(clone.filter(la => la.label === label)[0].correctGiven === true)
        {
            props.UpdateScore(-1);
            clone.filter(la => la.label === label)[0].correctGiven = false;
        }
    
        clone.filter(la => la.label === label)[0].answer = selected;

        setAns(clone)
    }

    function CheckingDisplayScore()
    {
        let finScore = 0;

        ans.forEach(an => {
            if(an.answer === FindCorrectObj(an.label).correct)
            {
                finScore++;
            }
        })

        return finScore;
    }

    return(<div className={styles.EveryExamComponent}>
        {props.options && props.options.map((op:any, index:number) => {
            return <Option key={`${props.id}-${props.type}-${index}`} option={op} UpdateScore={HandleUpdateScore} label={op.label} checking={props.checking}></Option>
        })}
        {props.checking && <PointsFromQuestion points={CheckingDisplayScore()}></PointsFromQuestion>}
    </div>)
}

export default React.memo(BEL_Connect);